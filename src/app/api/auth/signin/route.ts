import { DBURL } from "@/utils/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/userModel";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  const { username, password } = data;

  let client;
  try {
    client = await mongoose.connect(DBURL);
    console.log("DB connected");
  } catch (error: any) {
    console.log("DB fail.", error);
    return NextResponse.json({ status: "fail. DB", message: error.message });
  }

  try {
    const user = await User.find({ username });

    if (!user || user.length === 0) {
      return NextResponse.json(
        { status: "fail", message: "user not found" },
        { status: 404 }
      );
    }

    // password checks
    // if() {}

    return NextResponse.json(
      { status: "success", message: "welcome", data: user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({
      status: "fail. create-enter",
      message: error.message,
    });
  }
}
