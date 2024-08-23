import { Schema, model, Document, ObjectId } from 'mongoose';
import { PASSWORD_MIN_LENGTH } from '../constants';

export interface IUser extends Document {
  _id: ObjectId;
  username: string;
  password: string;
  email: string;
  profilePic: string;
  roles: string[];
  lastActive: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true, minLength: PASSWORD_MIN_LENGTH },
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, default: '' },
    roles: { type: [String], default: ['user'] },
    lastActive: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default model<IUser>('User', userSchema);
