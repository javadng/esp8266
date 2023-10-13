import DBConnectHandler from "@/utils/dbConnectFn";
import { NextRequest, NextResponse } from "next/server";
import EnterUserModel from "../../../../models/enterModel";
import { ObjectId } from "mongoose";

interface LogItem {
  enter: String;
  formatedDate: String;
  exit: String;
}

interface UserLogItem {
  _id: ObjectId;
  uid: String;
  username: String;
  userLogins: LogItem[];
}

export async function GET(req: NextRequest, res: NextResponse) {
  await DBConnectHandler(NextResponse);

  try {
    const allUsersAcivity: UserLogItem[] = await EnterUserModel.find({});

    const todayDate = new Date();
    const todayDateFormated = Intl.DateTimeFormat("fa-IR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(todayDate);

    const todayLogins = allUsersAcivity.map((el) => {
      const todayLogs = el.userLogins.filter(
        (log) => log.formatedDate === todayDateFormated
      );

      if (todayLogs.length) {
        return { uid: el.uid, username: el.username, logs: todayLogs };
      } else return null;
    });
    const todayLoginsFilterd = todayLogins.filter((el) => el !== null);

    return NextResponse.json({
      status: "success",
      message: "",
      data: todayLoginsFilterd,
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
