import mongoose from "mongoose";
import dns from "dns";

dns.setServers([
    "1.1.1.1",
    "8.8.8.8",
]);

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URL;

        if (!uri) {
            throw new Error(
                "MONGO_URL is not defined in environment variables"
            );
        }

        mongoose.set("strictQuery", true);

        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log(
            `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
        );

        return conn;

    } catch (error) {
        console.error("❌ MongoDB connection failed:");
        console.error(error.message);
        process.exit(1);
    }
};