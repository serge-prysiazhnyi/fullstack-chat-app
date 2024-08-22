import { Schema, model } from 'mongoose';
import { PASSWORD_MIN_LENGTH } from '../constants';

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, minLength: PASSWORD_MIN_LENGTH },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String, default: "" },
  roles: { type: [String], default: ['user'] },
  lastActive: { type: Date, default: Date.now },
}, { timestamps: true });

export default model('User', userSchema);
