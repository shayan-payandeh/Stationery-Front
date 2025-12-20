import { getValidatedBaseUrl } from "@/utils/baseUrl";
import { cookies } from "next/headers";

async function Greeting() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken");

    if (!token) {
      return (
        <h2 className="font-semibold text-dark-500">
          <span className="text-dark-500">سلام</span>{" "}
          <span className="font-morvarid text-primary-500">مهمان</span>
        </h2>
      );
    }

    const getProfile = async () => {
      const baseUrl = getValidatedBaseUrl();
      const { data } = await fetch(`${baseUrl}/user/profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `${token.name}=${token.value};` as any,
        } as HeadersInit,
        cache: "no-store",
      }).then((res) => res.json());
      const { user } = data || {};
      return user;
    };
    const user = await getProfile();

    return (
      <h2 className="font-semibold text-dark-500">
        <span className="text-dark-500">سلام</span>{" "}
        <span className="font-morvarid text-primary-500">
          &quot; {user?.fullName} &quot;
        </span>
      </h2>
    );
  } catch (error) {
    return (
      <h2 className="font-semibold text-dark-500">
        <span className="text-dark-500">سلام</span>{" "}
        <span className="font-morvarid text-primary-500">کاربر</span>
      </h2>
    );
  }
}

export default Greeting;
