
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

let connectionPromise = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing from the environment variables"
    );
  }

  // Reuse an established connection.
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Reuse a connection attempt already in progress.
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      })
      .then((connection) => {
        console.log(
          `MongoDB connected: ${connection.connection.host}/${connection.connection.name}`
        );

        return connection;
      })
      .catch((error) => {
        connectionPromise = null;
        console.error(
          "MongoDB connection failed:",
          error.message
        );
        throw error;
      });
  }

  return connectionPromise;
};
