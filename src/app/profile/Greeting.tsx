"use client";
import { useGetProfile } from "@/hook/useAuth";
import { getCookie } from "cookies-next";

function Greeting() {
  // const token = (await cookies().get("accessToken")) as any;
  // const data = await authService.getProfile(`${token["name"]}=${token.value}`);
  const cookie = getCookie("accessToken");
  const hasToken = cookie ? true : false;
  const userData = useGetProfile(hasToken);
  const { data, isLoading } = userData || {};

  return (
    <>
      <h2 className="font-semibold text-dark-500">
        <span className="text-dark-500">سلام</span>{" "}
        <span
          className={`font-morvarid text-primary-500 ${isLoading ? "blur-sm" : ""}`}
        >
          &quot; {data?.fullName} &quot;
        </span>
      </h2>
    </>
  );
}

export default Greeting;
