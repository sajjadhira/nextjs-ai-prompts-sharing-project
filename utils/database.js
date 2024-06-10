// utils/database.js
import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export const connectToDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
};
