import {
  IUserGet,
  IUserPost,
  IUserRegisterPost,
  IUserUpdatePatchOne,
  IUserUpdatePatchTwo,
} from "@/interface/user";
import { getValidatedBaseUrl } from "@/utils/baseUrl";
import { getCookie } from "cookies-next";
import http from "./http";

class AuthService {
  async register(data: IUserRegisterPost) {
    return (
      http
        .post<{
          statusNumber: number;
          data: { message: string; user: IUserGet };
        }>("/user/register", data)
        // amazonq-ignore-next-line
        .then((data) => data)
    );
  }

  async login(data: IUserPost) {
    return (
      http
        .post<{
          statusNumber: number;
          data: { message: string; user: IUserGet };
        }>("/user/login", data)
        // amazonq-ignore-next-line
        .then((data) => data)
    );
  }

  async logout() {
    // amazonq-ignore-next-line
    return http.post("/user/logout").then(({ data }) => data.data);
  }

  async getAllUsers() {
    return http.get("/admin/users/list").then(({ data }) => data.data);
  }

  async getProfile() {
    try {
      const token = getCookie("accessToken");
      const baseUrl = getValidatedBaseUrl();
      // amazonq-ignore-next-line
      const { data } = await fetch(`${baseUrl}/user/profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `accessToken=${token};` as any,
        } as HeadersInit,
      }).then((res) => res.json());
      const { user } = data || {};
      return user;
    } catch (error) {
      console.error(`err: ${error}`);
    }
  }

  // async getMyProfile() {
  //   const token = getCookie("accessToken");
  //   const baseUrl =
  //     process.env.NODE_ENV === "production"
  //       ? process.env.NEXT_PUBLIC_API_URL
  //       : process.env.NEXT_PUBLIC_LOCAL_API_URL;
  //   const { data } = await fetch(`${baseUrl}/user/profile`, {
  //     method: "GET",
  //     credentials: "include",
  //     headers: {
  //       Cookie: `accessToken=${token};` as any,
  //     },
  //   }).then((res) => res.json());
  //   const { user } = data || {};
  //   return user;
  // }

  async userUpdate(
    id: string,
    data: IUserUpdatePatchOne | IUserUpdatePatchTwo,
  ) {
    return http
      .patch<{
        statusNumber: number;
        data: { message: string; user: IUserGet };
      }>(`/user/update/${id}`, data)
      .then((data) => data);
  }
}

const authService = new AuthService();

export default authService;
