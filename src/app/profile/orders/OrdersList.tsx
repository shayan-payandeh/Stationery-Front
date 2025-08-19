import ScrollBlur from "@/component/animate/ScrollBlur";
import { appRoutes } from "@/constant/routes";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import Link from "next/link";
import getMyOrderServerComponent from "./service";

async function OrdersList() {
  const data = await getMyOrderServerComponent();
  const { orders } = data.data;
  const { link: orderLink } = appRoutes.order;
  const { link: profileLink } = appRoutes.profile;
  return (
    <div className="min-h-full gap-6 rounded-lg border-light-400 px-5 pb-3 shadow-container">
      {orders?.length > 0 && (
        <div className="flex flex-col overflow-x-auto">
          <table className="relative w-full min-w-[600px] overflow-hidden">
            <thead className="border-b-2 border-light-350 text-[.93rem] leading-[50px]">
              <tr>
                <th>سفارش</th>
                <th>تاریخ</th>
                <th>وضعیت</th>
                <th>پرداختی</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <ScrollBlur
              htmlTag="tbody"
              className="py-12 text-center leading-[50px] text-dark-500"
            >
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>
                    {"#"}
                    {toPersianNumbers(order._id.slice(0, 8))}
                  </td>
                  <td className="text-[14px]">
                    {new Date(order.createdAt).toLocaleDateString("fa-IR", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="text-[.7rem]">
                    {order.status === "completed" ? (
                      <span className="rounded-md bg-[#cdf2d5] p-[6px]">
                        تکمیل شده
                      </span>
                    ) : (
                      <span className="rounded-md bg-red-100 p-[6px]">
                        درحال انجام
                      </span>
                    )}
                  </td>
                  <td>
                    <span className="font-medium">
                      {toPersianNumbersWithComma(
                        order.orderInfo.payInfo.paidPrice,
                      )}
                      <span className="font-morvarid text-[13px]"> تومان</span>
                    </span>
                    <span className="mr-1 text-[12.5px] font-medium text-primary-500">
                      {"( " + toPersianNumbers(orders.length) + " آیتم )"}{" "}
                    </span>
                  </td>
                  <td className="text-[.75rem]">
                    <Link href={`${profileLink}${orderLink}/${order._id}`}>
                      <span className="transition-smooth cursor-pointer rounded-md border border-primary-500 bg-light-100 px-[10px] py-[6px] text-primary-500 hover:bg-primary-500 hover:text-light-100">
                        مشاهده
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </ScrollBlur>
          </table>
        </div>
      )}
      {orders?.length === 0 && (
        <div className="flex items-center justify-center py-3">
          شما هنوز سفارشی ثبت نکرده اید !
        </div>
      )}
    </div>
  );
}

export default OrdersList;
