import { NextRequest } from "next/server";
import { toStringCookies } from "./toStringCookies";

export default async function middlewareAuth(req: NextRequest) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_LOCAL_API_URL;
  try {
    const { data } = await fetch(`${baseUrl}/user/profile`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: toStringCookies(req.cookies) as any,
      },
    }).then((res) => res.json());
    const { user } = data || {};
    return user;
  } catch (error) {}
}
