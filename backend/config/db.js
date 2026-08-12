import mongoose from "mongoose";
import dns from "dns";

dns.setServers([
    "1.1.1.1",
    "8.8.8.8",
]);
mongoose.set("strictQuery", true);

export const connectDB = async () => {
  try {
    // Reuse existing connection
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    const uri = process.env.MONGO_URL;

    if (!uri) {
      throw new Error(
        "MONGO_URL is not defined in environment variables"
      );
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );

    return conn;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    // Do NOT use process.exit() on Vercel
    throw error;
  }
};