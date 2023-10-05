import mongoose from "mongoose";
import { DBURL } from "./db";

const DBConnectHandler = async (NextResponse: any) => {
  try {
    const client = await mongoose.connect(DBURL);
    console.log("DB connected");

    return client;
  } catch (error: any) {
    console.log("DB fail.", error);
    return NextResponse.json({ status: "fail. DB", message: error.message });
  }
};

export default DBConnectHandler;
