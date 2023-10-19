import DBConnectHandler from "@/utils/dbConnectFn";
import { NextRequest, NextResponse } from "next/server";
import EnterUserModel from "../../../../models/enterModel";
import User from "../../../../models/userModel";
import guardJustAdmin from "@/utils/guard-admin";

export async function POST(req: NextRequest, res: NextResponse) {
  await DBConnectHandler(NextResponse);

  try {
    await guardJustAdmin();
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "fail",
        message: error.message || "You'r not authorized to do such things!",
      },
      { status: 401 }
    );
  }

  const data = await req.json();

  const { uid, username } = data;

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
        { status: 404 }
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
