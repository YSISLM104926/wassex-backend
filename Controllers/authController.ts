import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { comparePassword, findUserByEmail, registerUser } from '../Services/authService';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { first_name, last_name, email, password } = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ success: false, message: 'User already exists' });
            return;
        }

        const newUser = await registerUser({ first_name, last_name, email, password });
        const token = jwt.sign({ first_name: newUser.first_name, last_name: newUser.last_name, email: newUser.email }, process.env.JWT_SECRET!, { expiresIn: process.env.EXPIRES_IN });

        res.status(201).json({ success: true, message: 'User registered successfully', accessToken: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const token = jwt.sign({ first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: process.env.EXPIRES_IN });

        res.json({ success: true, message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
