import { NextRequest, NextResponse } from "next/server";
import EnterUserModel from "../../../../models/enterModel";
import DBConnectHandler from "@/utils/dbConnectFn";
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

  const username = data?.username;

  const user = await EnterUserModel.findOne({ username });

  if (!user) {
    return NextResponse.json(
      {
        status: "fail.",
        message: "404. user not found.",
      },
      { status: 404, statusText: "USER NOT FOUND." }
    );
  }

  return NextResponse.json({
    status: "success",
    message: "",
    data: { logs: user.userLogins, username },
  });
}

export const dynamic = "force-dynamic";
