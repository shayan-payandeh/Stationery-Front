"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function createUser(prevState: any, formData: FormData) {
  const cookieStore = await cookies();

  // Get cookie
  let message;
  let errorMessage;
  const data = {
    email: formData["email"],
    phoneNumber: formData["phoneNumber"],
    fullName: formData["name"],
    password: formData["password"],
  };
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/user/register`,
      data,
    );
    const setCookieHeader = result.headers["set-cookie"]![0];
    const cookies = setCookieHeader.split(";").map((cookie) => cookie.trim());
    const jwtCookie = cookies.find((cookie) =>
      cookie.startsWith("accessToken="),
    );
    const token = jwtCookie?.split("=")[1];

    cookieStore.set("accessToken", token as string);
    message = result.data.data.message || "عضویت شما با موفقیت انجام شد";
    redirect("/");
  } catch (error: any) {
    errorMessage = error?.response?.data?.message || error.message;
  }
  return { message: message, errorMessage: errorMessage };
}
