import DBConnectHandler from "@/utils/dbConnectFn";
import { NextRequest, NextResponse } from "next/server";
import EnterUserModel from "../../../../models/enterModel";
import User from "../../../../models/userModel";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  const { uid, username } = data;

  await DBConnectHandler(NextResponse);

  if (!uid.trim() || !username.trim()) {
    return NextResponse.json(
      {
        status: "fail",
        message: "uid or id are not in the correct format",
      },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "user not found." },
        { status: 401 }
      );
    }

    await EnterUserModel.create({ username, uid });

    return NextResponse.json(
      { status: "success", message: "recored on the DB." },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 401 }
    );
  }
}
