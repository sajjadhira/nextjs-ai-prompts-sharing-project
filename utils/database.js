import mongoose from "mongoose";

let isConnected = false;


export const connectToDB = async () => {

    mongoose.set('stringQuery', true);

    if(isConnected){
        console.log("Using existing connection")
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "promptopia",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;

        console.log("Connected to DB")
    }
    catch(e){
        console.error(e)
    }
}