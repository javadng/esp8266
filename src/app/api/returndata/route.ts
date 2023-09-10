import { NextResponse } from "next/server";
import EnterUserModel from "../../../../models/enterModel";
import connectDB from "@/utils/db";

export async function POST(request: Request) {
  try {
    // const isConnected = await connectDB();

    // console.log(isConnected);

    const response = await request.json();

    const { id } = response;
    const date = new Date();

    const enteredUser = await EnterUserModel.create({ uid: id, date });

    return NextResponse.json({ message: "successfull", enteredUser });
  } catch (error) {
    return NextResponse.json({ message: "fail", error });
  }
}
