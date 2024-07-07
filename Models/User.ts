import { Schema, model, Document } from 'mongoose';
import { IUser } from '../Interfaces/InUser';

const userSchema = new Schema<IUser>({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
});

export const UserModel = model<IUser>('User', userSchema);
