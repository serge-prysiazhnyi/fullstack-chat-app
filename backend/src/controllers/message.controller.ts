import { Response } from 'express';
import Message from '../models/message.model';
import Conversation from '../models/conversation.model';
import { CustomRequest } from '../types';
import { getReceiverSocketId, io } from '../socket/socket';

export const sendMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user?._id;

    if (!senderId || !receiverId || !message) {
      return res.status(400).send('Missing fields');
    }

    let conversation = await Conversation.findOne({
      // find a conversation where the participants array contains both the sender and receiver
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });

      await conversation.save();
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);

    // Use Promise.all to save both the conversation and the message in parallel
    const [savedMessage, updatedConversation] = await Promise.all([
      conversation.save(),
      newMessage.save(),
    ]);

    if (!savedMessage || !updatedConversation) {
      return res
        .status(500)
        .json({ message: 'Failed to create message or update conversation' });
    }

    const receiverSocketId = getReceiverSocketId(receiverId);

    // if user is online
    if (receiverSocketId) {
      // sends event only to the receiver
      io.to(receiverSocketId).emit('newMessage', {
        message: newMessage,
        receiverId,
      });
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error(
      'message.controller sendMessage error:',
      (error as Error).message,
    );
    res.status(500).send('Something went wrong');
  }
};

export const getMessages = async (req: CustomRequest, res: Response) => {
  try {
    const userToChatId = req.params.id;
    const senderId = req.user?._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
      // populate the messages field
    }).populate('messages');

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation?.messages);
  } catch (error) {
    console.error(
      'message.controller getMessages error:',
      (error as Error).message,
    );
    res.status(500).send('Something went wrong');
  }
};
