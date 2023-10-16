import { ObjectId } from "mongoose";

export interface Http {
  error: Object | null;
  result: {
    status: string;
    message: string;
    data: { logs: []; username: string };
  } | null;
}

export interface LogItem {
  enter: Date;
  formatedDate: String;
  exit: Date | null;
  _id: ObjectId;
}

export interface UserLogItem {
  uid: String;
  username: String;
  logs: LogItem[];
}

export interface UserLogs {
  enter: Date;
  exit: Date;
  formatedDate: String;
}

// export interface LogItem {
//   enter: String;
//   formatedDate: String;
//   exit: String;
// }

export interface UserLogItem {
  _id: ObjectId;
  uid: String;
  username: String;
  userLogins: LogItem[];
}
