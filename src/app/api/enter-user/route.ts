import { NextResponse, NextRequest } from "next/server";
import EnterUserModel from "../../../../models/enterModel";
import { DBURL } from "@/utils/db";
import mongoose from "mongoose";
import { UserLogs } from "@/utils/globalInterfaces";

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

    const todayLogs = userLogs.filter(
      (item: UserLogs) => item.formatedDate === formatedDate
    );
    const allOtherLogs = userLogs.filter((item: UserLogs) => !!item.exit);

    let enteredUser;

    const isTodayExist = userLogs.some(
      (item: UserLogs) => item.formatedDate === formatedDate
    );

    const itemHasNoExit = todayLogs.find((item: UserLogs) => !!!item.exit);

    if (isTodayExist && itemHasNoExit) {
      const enteredDetail = [
        {
          formatedDate,
          enter: itemHasNoExit.enter,
          exit: date,
        },
        ...allOtherLogs,
      ];

      enteredUser = await EnterUserModel.findOneAndUpdate(
        { uid },
        { $set: { userLogins: enteredDetail } }
      );
    } else {
      const enteredDetail = { enter: date, formatedDate };

      enteredUser = await EnterUserModel.updateOne(
        { uid },
        { $push: { userLogins: enteredDetail } }
      );
    }

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
