import axios from "axios";
import { cookies } from "next/headers";

export default async function getMyOrderServerComponent() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_LOCAL_API_URL;
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;
  const { data } = await axios.get(`${baseUrl}/order/myorders`, {
    headers: {
      Cookie: `accessToken=${token}`,
    },
  });

  return data;
}
