import { env } from "node:process";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const jwtCookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN;
const jwtSecret = process.env.JWT_SECRET || "esp8266-secret-javad";

const expiresInMs = jwtCookieExpiresIn ? +jwtCookieExpiresIn * 24 * 60 * 60 : 0;

export const signToken = (id: String) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: expiresInMs * 24 * 60 * 60,
  });
};

export const createSendToken = (id: String) => {
  const jwtToken = signToken(id);

  const jwtCookieExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN;

  const expiresInMs = jwtCookieExpiresIn
    ? +jwtCookieExpiresIn * 24 * 60 * 60
    : 0;

  const cookieOptions = {
    expires: new Date(Date.now() + expiresInMs),
    httpOnly: true,
  };

  const cookieStore = cookies();

  cookieStore.set("jwt", jwtToken, cookieOptions);
};
