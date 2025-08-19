import { IOrderPost } from "@/interface/order";
import axios from "axios";
import { getCookie } from "cookies-next";

class OrderService {
  async orderAdd(order: IOrderPost) {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_LOCAL_API_URL;
    const token = getCookie("accessToken");
    const res = await axios.post(`${baseUrl}/order/add`, order, {
      withCredentials: true,
      headers: {
        Cookie: token,
      },
    });
    // const res = await fetch(
    //   `${this.baseUrl}/order/add`,
    //   {
    //     method: "POST",
    //     credentials: "include",
    //     body: JSON.stringify(order),
    //     headers: {
    //       Cookie: token,
    //     } as HeadersInit,
    //   },
    // ).then((res) => res.json());
    return res;
  }

  async getMyOrder() {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL
        : process.env.NEXT_PUBLIC_LOCAL_API_URL;
    const token = getCookie("accessToken");
    const res = await axios.get(`${baseUrl}/order/myorders`, {
      withCredentials: true,
      headers: {
        Cookie: token,
      },
    });

    return res;
  }

  // async getMyOrderServerComponent() {
  //   const baseUrl =
  //     process.env.NODE_ENV === "production"
  //       ? process.env.NEXT_PUBLIC_API_URL
  //       : process.env.NEXT_PUBLIC_LOCAL_API_URL;
  //   const cookieStore = cookies();
  //   const token = cookieStore.get("accessToken")?.value;
  //   const { data } = await axios.get(`${baseUrl}/order/myorders`, {
  //     headers: {
  //       Cookie: `accessToken=${token}`,
  //     },
  //   });

  //   return data;
  // }
}

const orderService = new OrderService();

export default orderService;
