import Loading from "@/component/Loading";
import { Suspense } from "react";
import getMyOrderServerComponent from "../service";
import OrderAddress from "./OrderAddress";
import OrderDetail from "./OrderDetail";
import OrderStatus from "./OrderStatus";

async function Page({ params }) {
  const { id } = params;
  const data = await getMyOrderServerComponent();
  const { orders } = data.data.data;
  const theOrder = orders?.find((order) => order._id === id);
  return (
    <Suspense fallback={<Loading />}>
      {theOrder && (
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
      )}
      {!theOrder && (
        <div className="flex justify-center">سفارش مورد نظر یافت نشد</div>
      )}
    </Suspense>
  );
}

export default Page;
