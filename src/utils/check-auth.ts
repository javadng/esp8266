import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const checkAuthToken = () => {
  const cookieStore = cookies();
  const jwtCookie = cookieStore.get("jwt");

  if (!jwtCookie) {
    redirect("/authpage");
  } else return jwtCookie;
};
