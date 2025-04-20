import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDb = async () => {
  console.log("*** Database connecting ***");
  if (!MONGODB_URI) {
    console.error(
      "MongoDB connection string is missing in environment variables"
    );
    return;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      dbName: "EECC", // Replace with your actual database name
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // 15 seconds timeout for server selection
      socketTimeoutMS: 45000, // 45 seconds timeout for socket inactivity
    });
    console.log("*** Database connected Successfully ***");
    return connection;
  } catch (error) {
    console.error("### Database Connection Failed ###");
    console.error(error);
    throw error;
  }
};
