import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("MongoDB connected:" + conn.connection.host);
    } catch (error) {
        console.error("Error IN connecting to MONGO_DB:" + error.message);
        process.exit(1);//1 means there was an error ,or 0 means success
    }

}