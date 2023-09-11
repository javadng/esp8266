// db.ts

import mongoose from "mongoose";

// Replace 'your_database_url' with your actual MongoDB connection string
export const DBURL =
  "mongodb+srv://admin:admin1234@cluster0.tvul5uv.mongodb.net/esp8266";

async function connectDB() {
  try {
    await mongoose.connect(DBURL);
    return true;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return false;
  }
}

export default connectDB;
