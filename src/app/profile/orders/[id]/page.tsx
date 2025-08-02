"use client";
import Loading from "@/component/Loading";
import { useGetMyOrders } from "@/hook/useOrders";
import { useParams } from "next/navigation";
import OrderAddress from "./OrderAddress";
import OrderDetail from "./OrderDetail";
import OrderStatus from "./OrderStatus";

function Page() {
  const { id } = useParams();
  const orderData = useGetMyOrders();
  const { isLoading, data } = orderData || {};
  const orders = data?.data.data.orders;
  const theOrder = orders?.find((order) => order._id === id);

  if (isLoading) return <Loading />;
  return (
    <div className="flex h-full flex-col gap-8 rounded-lg border border-light-200 px-5 py-6 shadow-container">
      <div id="order-status-container">
        <OrderStatus theOrder={theOrder} />
      </div>
      <div id="order-detail-container">
        <OrderDetail theOrder={theOrder} />
      </div>
      <div id="order-address-container">
        <OrderAddress theOrder={theOrder} />
      </div>
    </div>
  );
}

export default Page;
