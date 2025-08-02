import PriceUnit from "@/component/PriceUnit";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import React from "react";

function OrderSummaryCheck({
  cartItems,
  discountOnTotal,
  totalPriceAfterDiscount,
  delieveryCost,
  payablePrice,
}) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-start text-[15px] lg:text-[18px]">خلاصه سفارش</h3>
      <table className="w-full border-collapse border border-gray-300 text-[12px] sm:text-[14px] lg:w-[50%] lg:text-[16px]">
        <thead>
          <tr>
            <th className="p-3">محصول</th>
            <th className="p-3">جمع</th>
          </tr>
        </thead>
        <tbody className="[&>:not(:last-child)]:border [&>:not(:last-child)]:border-b [&>:not(:last-child)]:border-gray-300">
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td className="p-3">
                <span>{item.name}</span>
                &nbsp;
                <span dir="ltr">
                  {toPersianNumbers(item.quantity)}
                  &nbsp;
                  <span>x</span>
                </span>
              </td>
              <td className="flex-center p-3">
                {toPersianNumbersWithComma(item?.price * item?.quantity)}
                &nbsp;
                <span className="font-semibold">
                  <PriceUnit />
                </span>
              </td>
            </tr>
          ))}
          <tr>
            <th className="p-3">تخفیف</th>
            <th className="p-3">
              {toPersianNumbersWithComma(discountOnTotal)}
              <span>
                <PriceUnit />
              </span>
            </th>
          </tr>
          <tr>
            <th className="p-3">جمع جزء</th>
            <th className="p-3">
              {toPersianNumbersWithComma(totalPriceAfterDiscount)}
              <span>
                <PriceUnit />
              </span>
            </th>
          </tr>
          <tr>
            <th className="p-3">هزینه ارسال</th>
            <th className="p-3">
              {toPersianNumbersWithComma(delieveryCost)}

              <span>
                <PriceUnit />
              </span>
            </th>
          </tr>
          <tr>
            <th className="p-3">مجموع</th>
            <th className="p-3 text-primary-500">
              {toPersianNumbersWithComma(payablePrice)}
              <span>
                <PriceUnit />
              </span>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderSummaryCheck;
