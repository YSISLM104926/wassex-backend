
import bcrypt from 'bcrypt';
import { IUser } from '../Interfaces/InUser';
import { UserModel } from '../Models/User';

export const registerUser = async (user: IUser): Promise<IUser> => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({ ...user, password: hashedPassword });
    return await newUser.save();
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    return await UserModel.findOne({ email }).exec();
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};
