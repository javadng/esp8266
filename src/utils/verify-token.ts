import { env } from "node:process";

import { checkAuthToken } from "@/utils/check-auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { UserDocument } from "@/../../models/userModel";

interface DataType {
  error: string;
  role: string;
}

const jwtSecret = process.env.JWT_SECRET || "esp8266-secret-javad";

export default async function verifyToken() {
  const jwtToken = checkAuthToken();
  let result: DataType;

  if (jwtToken) {
    try {
      const verifiedToken = jwt.verify(jwtToken.value, jwtSecret);

      const decodedToken = jwt.decode(jwtToken.value) as JwtPayload;
      const _id = decodedToken?.id;

      const user: UserDocument | null = await User.findById({ _id });

      if (user?.role !== "admin")
        throw new Error("You are not Allowed to do such thing!. just admin");

      result = { error: "", role: user?.role };
    } catch (error: any) {
      result = { error: error.message, role: "" };
    }

    return result;
  }
}
