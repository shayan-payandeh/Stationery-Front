import PriceUnit from "@/component/PriceUnit";
import { appRoutes } from "@/constant/routes";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import Link from "next/link";

function OrderDetail({ theOrder }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[15px] lg:text-[18px]">جزئیات سفارش</h2>
      <div id="table-container" className="overflow-auto">
        <table className="w-full border border-gray-200 text-[12px] sm:text-[14px] lg:text-[16px]">
          <thead>
            <tr>
              <th className="p-3 text-start">محصول</th>
              <th className="p-3 text-start">مجموع</th>
            </tr>
          </thead>
          <tbody className="[&>:not(:last-child)]:border [&>:not(:last-child)]:border-b [&>:not(:last-child)]:border-gray-200">
            {theOrder?.orderInfo.orderItems.map((item) => (
              <tr key={item._id}>
                <td className="p-3">
                  <Link href={`${appRoutes.products.link}/${item.product._id}`}>
                    <span className="text-primary-500">
                      {item.product.name}
                    </span>
                  </Link>
                  &nbsp;
                  <span dir="ltr">
                    {toPersianNumbers(item.quantity)}
                    &nbsp;
                    <span>x</span>
                  </span>
                </td>
                <td>
                  {toPersianNumbersWithComma(item.product.price)}
                  <PriceUnit />
                </td>
              </tr>
            ))}
            <tr>
              <td className="p-3">جمع کل سبد خرید :</td>
              <td className="py-3">
                {toPersianNumbersWithComma(
                  theOrder.orderInfo.payInfo.totalPrice,
                )}
                <PriceUnit />
              </td>
            </tr>
            <tr>
              <td className="p-3"> تخفیف :</td>
              <td className="py-3">
                {toPersianNumbersWithComma(
                  (theOrder.orderInfo.payInfo.discount / 100) *
                    theOrder.orderInfo.payInfo.totalPrice,
                )}
                <PriceUnit />
              </td>
            </tr>
            <tr>
              <td className="p-3">هزینه ارسال :</td>
              <td className="py-3">
                {toPersianNumbersWithComma(
                  theOrder.orderInfo.payInfo.delieveryCost,
                )}
                <PriceUnit />
              </td>
            </tr>
            <tr>
              <td className="p-3">قیمت پرداختی :</td>
              <td className="py-3">
                {toPersianNumbersWithComma(
                  theOrder.orderInfo.payInfo.paidPrice,
                )}
                <PriceUnit />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderDetail;
