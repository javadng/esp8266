import DBConnectHandler from "@/utils/dbConnectFn";
import { NextRequest, NextResponse } from "next/server";
import EnterUserModel from "../../../../models/enterModel";

export async function GET(req: NextRequest, res: NextResponse) {
  await DBConnectHandler(NextResponse);

  try {
    const allUsersAcivity = await EnterUserModel.find({});

    return NextResponse.json({
      status: "success",
      message: "",
      data: allUsersAcivity,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "fail",
      message: error.message,
      data: {},
    });
  }
}

export const dynamic = "force-dynamic";
