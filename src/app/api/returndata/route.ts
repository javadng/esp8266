import { NextResponse } from "next/server";
import EnterUserModel from "../../../../models/enterModel";
import connectDB from "@/utils/db";

export async function POST(request: Request) {
  try {
    const isConnected = await connectDB();

    const response = await request.json();

    if (!isConnected)
      return NextResponse.json({ message: "fail to connect mongoDB" });

    const { id } = response;
    const date = new Date();

    const enteredUser = await EnterUserModel.create({ uid: id, date });

    return NextResponse.json({ message: "successfull", enteredUser });
  } catch (error) {
    return NextResponse.json({ message: "fail", error });
  }
}
