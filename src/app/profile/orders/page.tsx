import { Suspense } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import OrdersList from "./OrdersList";

export const dynamic = "force-dynamic";
function Page() {
  // const orderData = useGetMyOrders();
  // const { isLoading, data } = orderData || {};
  // const orders = data?.data.data.orders;

  return (
    <Suspense
      fallback={
        <SkeletonTheme
          baseColor="#D6D6D6"
          highlightColor="#E4E5E8"
          height={50}
          direction="rtl"
        >
          <Skeleton count={5} />
        </SkeletonTheme>
      }
    >
      <OrdersList />
    </Suspense>
  );
}

export default Page;
