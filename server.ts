import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
};

startServer();
