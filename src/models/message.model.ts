import mongoose, { Schema, model } from 'mongoose';

const messageSchema = new Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default model('Message', messageSchema);
