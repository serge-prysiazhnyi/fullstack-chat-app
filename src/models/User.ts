import { Schema, model } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
  lastActive: Date;
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  roles: { type: [String], default: ['user'] },
  lastActive: { type: Date, default: Date.now },
});

export default model('User', userSchema);
