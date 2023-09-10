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

    await EnterUserModel.create({ uid: id, date });

    return NextResponse.json({ id, date });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ status: "fail", message: error.message });
  }
}
