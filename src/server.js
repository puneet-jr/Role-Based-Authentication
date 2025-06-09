import express from 'express';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

import { connectDB } from './config/dbConnect.js';
import dotenv from 'dotenv';
dotenv.config();

const app=express();

// For middleware to parse JSON bodies
app.use(express.json());

// dbconnection
connectDB();

//routes 
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


const port=process.env.port || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

