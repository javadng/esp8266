import { DBURL } from "@/utils/db";
import formatDate from "@/utils/formatDate";
import mongoose, { ObjectId } from "mongoose";
import EnterUserModel from "../../../models/enterModel";

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

const ActivityPage = async () => {
  let allActivity: UserLogItem[] = [];
  let errorMessage = "";
  let elements;

  try {
    const res = await fetch(`http://localhost:3000/api/get-activity`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(res.statusText + " ** " + res.status);

    const result = await res.json();

    allActivity = result?.data;
  } catch (error: any) {
    errorMessage = error.message;
  }

  if (allActivity && allActivity?.length > 0) {
    elements = allActivity.map((item: any) => (
      <div
        key={item.uid}
        className="shadow-lg my-6 w-3/4 mx-auto rounded-3xl bg-indigo-50 p-3 flex flex-col justify-evenly items-center"
      >
        <h2 className="text-start self-start ml-10">
          <span className="italic">Username : </span>
          <span className="font-bold">{item.username}</span>
        </h2>
        <ul className="grid grid-col-1">
          {item.userLogins.length > 0 &&
            item.userLogins.map((item: any) => {
              const enterDate = new Date(item.enter);
              const exitDate = item.exit ? new Date(item.exit) : null;
              return (
                <li
                  key={item._id}
                  className="grid md:grid-cols-2 gap-3 justify-between my-1 odd:bg-indigo-400 even:bg-indigo-100 odd:text-white p-3 rounded-2xl"
                >
                  <h3 className="row-start-2 sm:row-start-1">
                    <span>خروج : </span>
                    <span>{exitDate && formatDate(exitDate)}</span>
                  </h3>
                  <h3 className="md:col-start-2">
                    <span> ورود : </span>
                    <span>{formatDate(enterDate)}</span>
                  </h3>
                </li>
              );
            })}

          {item.userLogins.length <= 0 && (
            <span className="block underline italic text-red-400">
              No logs Yet
            </span>
          )}
        </ul>
      </div>
    ));
  }

  return (
    <div>
      <div>{new Date().toLocaleString()}</div>
      {errorMessage === "" && elements}
      {errorMessage !== "" && errorMessage}
    </div>
  );
};

export default ActivityPage;
