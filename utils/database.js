import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    // Correcting the setting to 'strictQuery'
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("Using existing connection");
        return;
    }

    

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "promptopia"
        });

        isConnected = true;

        console.log("Connected to DB");
    } catch (e) {
        console.error("Error connecting to DB", e);
    }
};
