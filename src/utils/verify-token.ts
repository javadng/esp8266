import { env } from "node:process";

import { checkAuthToken } from "@/utils/check-auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { UserDocument } from "@/../../models/userModel";

const jwtSecret = process.env.JWT_SECRET || "esp8266-secret-javad";

export default async function verifyToken() {
  const jwtToken = checkAuthToken();

  if (jwtToken) {
    try {
      const verifiedToken = jwt.verify(jwtToken.value, jwtSecret);

      const decodedToken = jwt.decode(jwtToken.value) as JwtPayload;
      const _id = decodedToken?.id;

      const user: UserDocument | null = await User.findById({ _id });

      if (user?.role !== "admin")
        throw new Error("You are not Allowed to create new card. just admin");
    } catch (error: any) {
      return error.message;
    }
  }
}
