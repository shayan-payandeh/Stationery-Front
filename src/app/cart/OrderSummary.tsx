"use client";
import { appRoutes } from "@/constant/routes";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import { useRouter } from "next/navigation";
import React from "react";

function OrderSummary({ totalPrice, discountOnTotal, payablePrice }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 bg-light-200 p-4 py-[15px] text-sm shadow-container lg:text-[16px]">
      <div>
        <span className="text-primary-500">خلاصه سفارش</span>
      </div>
      <div className="m-auto w-full border border-primary-400"></div>
      <div className="flex">
        <span>جمع کل : </span>
        &nbsp;
        <span className="text-primary-500">
          {toPersianNumbersWithComma(totalPrice)}
        </span>
        &nbsp;
        <span className="text-primary-500">تومان</span>
      </div>
      <div className="flex">
        <span>تخفیف : </span>
        &nbsp;
        <span className="text-primary-500">
          {toPersianNumbersWithComma(discountOnTotal)}
        </span>
        &nbsp;
        {discountOnTotal > 0 && <span className="text-primary-500">درصد</span>}
      </div>
      <div className="flex font-semibold">
        <span>قابل پرداخت : </span>
        &nbsp;
        <span className="text-primary-500">
          {toPersianNumbersWithComma(payablePrice)}
        </span>
        &nbsp;
        <span className="text-primary-500">تومان</span>
      </div>
      <div className="">
        <div
          onClick={() => router.push(`${appRoutes.payment.link}`)}
          className="cursor-pointer bg-primary-500 px-8 py-2 text-light-100 lg:py-3"
        >
          <span>پرداخت</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
