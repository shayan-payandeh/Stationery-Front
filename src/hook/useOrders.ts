import { appRoutes } from "@/constant/routes";
import { AppCtxt } from "@/context/Store";
import { IOrderPost } from "@/interface/order";
import orderService from "@/service/orderService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";

export const useAddOrder = () => {
  const router = useRouter();
  const { dispatch } = useContext(AppCtxt);
  return useMutation({
    mutationFn: (order: IOrderPost) => orderService.orderAdd(order),
    onSuccess: (data) => {
      toast.success(data.data.data.message);
      router.push(
        `${appRoutes.profileOrders.link}/${data.data.data.order._id}`,
      );
      dispatch({ type: "CART_CLEAR", payload: {} });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

export const useGetMyOrders = () =>
  useQuery({
    queryKey: ["get-myOrders"],
    queryFn: orderService.getMyOrder,
    retry: false,
    refetchOnWindowFocus: true,
  });
