import { cookies } from "next/headers";

export default async function getMyOrderServerComponent() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_API_URL
      : process.env.NEXT_PUBLIC_LOCAL_API_URL;

  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");
  try {
    const res = await fetch(`${baseUrl}/order/myorders`, {
      headers: {
        Cookie: `accessToken=${token?.value}`,
      },
      cache: "no-store", // always fresh
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch orders: ${res.status}`);
    }

    return { data: await res.json(), error: false };
  } catch (err) {
    return { data: { orders: [] }, error: true }; // 👈 mark as error
  }
}
