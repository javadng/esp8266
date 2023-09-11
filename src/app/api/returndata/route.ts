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

  const { id } = data;

  if (!id || !id.trim())
    return NextResponse.json(
      {
        status: "fail.",
        message: "ID is not Found in the response.",
      },
      { status: 422 }
    );

  const date = new Date();
  const enteredData = { uid: id, date };

  try {
    await EnterUserModel.create(enteredData);

    return NextResponse.json(
      { status: "success", message: "welcome" },
      { status: 201 }
    );
  } catch (error: any) {
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
