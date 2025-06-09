import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // Fix the typo here: CONNECTION_STRING (not CONNEXTION_STRING)
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(`MongoDB connected: ${connect.connection.host}, ${connect.connection.port}`);
    } catch (error) {
        console.log(error);
        process.exit(1);


    }
}