import { NextRequest, NextResponse } from "next/server";
import EnterUserModel from "../../../../../models/enterModel";
import DBConnectHandler from "@/utils/dbConnectFn";
import { LogItem } from "@/utils/globalInterfaces";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await DBConnectHandler(NextResponse);

  const data = await req.json();
  const username = data?.username;

  const user = await EnterUserModel.findOne({ username });

  if (!user) {
    return NextResponse.json(
      { status: "fail", message: "404 user not found" },
      { status: 404, statusText: "USER NOT FOUND" }
    );
  }

  const startFilterDate = new Date(params.slug[0]);
  const endFilterDate = new Date(params.slug[1]);

  let isValidEndDate = false;
  try {
    isValidEndDate = endFilterDate.toISOString() !== "Invalid Date";
  } catch (error) {
    console.log("Time value Invalid or not set. (end Date).");
  }

  const filterd = user.userLogins.filter((el: LogItem) => {
    const enterDate = new Date(el.enter);

    return isValidEndDate
      ? enterDate >= startFilterDate && enterDate <= endFilterDate
      : enterDate >= startFilterDate;
  });

  return NextResponse.json({
    status: "success",
    message: "",
    data: { logs: filterd },
  });
}
