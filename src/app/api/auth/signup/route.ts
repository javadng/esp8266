import { DBURL } from "@/utils/db";
import DBConnectHandler from "@/utils/dbConnectFn";
import { createSendToken } from "@/utils/jwt-signtoken";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import User, { UserDocument } from "../../../../../models/userModel";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  const { name, username, password, passwordConfirm, email } = data;

  let client = await DBConnectHandler(NextResponse);

  try {
    const user = await User.create({
      name,
      username,
      password,
      passwordConfirm,
      email,
    });

    user.password = undefined;

    // set cookie
    createSendToken(user._id);

    mongoose.connection.close();

    return NextResponse.json(
      { status: "success", message: "welcome", data: user },
      { status: 201 }
    );
  } catch (error: any) {
    mongoose.connection.close();
    return NextResponse.json({
      status: "fail. create-enter",
      message: error.message,
    });
  }
}
