import { Response } from 'express';
import Message from '../models/message.model';
import Conversation from '../models/conversation.model';
import { CustomRequest } from '../types';

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

    if (newMessage) {
      conversation.messages.push(newMessage._id);

      // Use Promise.all to save both the conversation and the message in parallel
      await Promise.all([conversation.save(), newMessage.save()]);

      res.status(200).json(newMessage);
    }
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
      res.status(200).json([]);
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
