import { NextResponse, NextRequest } from "next/server";
import EnterUserModel from "../../../../models/enterModel";
import { DBURL } from "@/utils/db";
import mongoose from "mongoose";

export async function POST(req: NextRequest, res: NextResponse) {
  let client;
  try {
    client = await mongoose.connect(DBURL);
    console.log("DB connected");
  } catch (error: any) {
    console.log("DB fail.", error);
    return NextResponse.json({ status: "fail. DB", message: error.message });
  }

  const data = await req.json();

  const { uid } = data;

  if (!uid || !uid.trim())
    return NextResponse.json(
      {
        status: "fail.",
        message: "UID is not Found in the response.",
      },
      { status: 422 }
    );

  const date = new Date();
  const formatedDate = Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  try {
    const { userLogins: userLogs } = await EnterUserModel.findOne({ uid })
      .select("userLogins")
      .exec();

    const todayLogs = userLogs.find(
      (item: any) => item.formatedDate === formatedDate
    );
    const allOtherLogs = userLogs.filter(
      (item: any) => item.formatedDate !== formatedDate
    );

    let enteredUser;

    const isTodayExist = userLogs.some(
      (item: any) => item.formatedDate === formatedDate
    );

    if (isTodayExist) {
      const userEnterDetail = [
        {
          formatedDate,
          enter: todayLogs.enter,
          exit: date,
        },
        ...allOtherLogs,
      ];

      enteredUser = await EnterUserModel.findOneAndUpdate(
        { uid },
        { $set: { userLogins: userEnterDetail } }
      );
    } else if (!isTodayExist) {
      const userEnterDetail = { enter: date, formatedDate };

      enteredUser = await EnterUserModel.findOneAndUpdate(
        { uid },
        { $push: { userLogins: userEnterDetail } }
      );
    }

    //else if (isTodayExist && exit) {
    //}

    if (!enteredUser) {
      return NextResponse.json(
        { status: "fail", message: "user not found." },
        { status: 401 }
      );
    }

    // EnterUserModel.updateOne({ uid }, { $push: { userLogins: formatedDate } });

    return NextResponse.json(
      { status: "success", message: "welcome" },
      { status: 201 }
    );
  } catch (error: any) {
    mongoose.connection.close();

    return NextResponse.json({
      status: "fail. create-enter",
      message: error.message,
    });
  }

  // return client.connection.close();
}

// export async function POST(request: Request) {
//   const response = await request.json();
//   const { id } = response;
//   return NextResponse.json({ id });
// }