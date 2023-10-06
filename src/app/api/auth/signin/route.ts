import { env } from "node:process";
import { DBURL } from "@/utils/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import User, { UserDocument } from "@/../../models/userModel";
import { createSendToken } from "@/utils/jwt-signtoken";
import DBConnectHandler from "@/utils/dbConnectFn";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  const { username, password } = data;

  let client = await DBConnectHandler(NextResponse);

  try {
    const user: UserDocument | null = await User.findOne({ username })
      .select("+password")
      .exec();

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "user not found" },
        { status: 404 }
      );
    }

    // password checks
    if (!user || !(await user.correctPassword(password, user.password))) {
      return NextResponse.json(
        { status: "fail", message: "username or password are not correct!" },
        { status: 401 }
      );
    }
    // set cookie
    createSendToken(user._id);

    user.password = undefined;

    return NextResponse.json(
      { status: "success", message: "welcome", data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({
      status: "fail. create-enter",
      message: error.message,
    });
  }
}