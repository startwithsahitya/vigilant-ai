import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }

  await mongoose.connect(process.env.MONGO_URL!); // Access the MongoDB URL from the environment variable
};

export default connectDb;
