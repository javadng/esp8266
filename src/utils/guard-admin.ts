import verifyToken from "./verify-token";
import { cookies } from "next/headers";

const guardJustAdmin = async () => {
  try {
    const cookie = cookies();

    const jwtToken = cookie.get("jwt");

    if (!jwtToken) {
      throw new Error("You'r not authorized. pleas log in or signup.");
    }

    const tokenVerify = await verifyToken();

    const errorMessage = tokenVerify?.error;
    const userRole = tokenVerify?.role;

    if (errorMessage || userRole !== "admin") {
      throw new Error("You'r not authorized to do such things!");
    }
  } catch (error: any) {
    throw {
      status: "fail",
      message: error.message || "You'r not authorized to do such things!",
      statusCode: 401,
    };
  }
};
export default guardJustAdmin;
