import express from 'express';
import cors from 'cors';
import router from './Routes/authRoutes';


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', router);

// Test route
app.get('/', (req, res) => {
    const serverStatus = {
        message: 'Server is running smoothly',
        timestamp: new Date()
    };
    res.json(serverStatus);
});

export default app;
