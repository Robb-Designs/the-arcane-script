// Responsible for Mongo connection

//setting dns for testing
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


import mongoose from 'mongoose';
import { error } from 'node:console';


async function connectDB(){
    try {
        if(!process.env.MONGO_URI){
            throw new Error("DATABASE URI is missing");
        }

        const response = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connection Successful`);

    } catch (error) {
        console.error('MongoDB Connection Failed: ', error);
        process.exit(1); // terminates app from running. 1: error
    }
}

export default connectDB;