import { appRoutes } from "@/constant/routes";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import Link from "next/link";
import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

function CartDetail({ cartItems, addToCartHandler, removeCartItemHandler }) {
  return (
    <div className="overflow-auto p-8">
      <table className="w-full border border-gray-200 text-[12px] sm:text-[14px] lg:text-[16px]">
        <thead>
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">تصویر</th>
            <th className="min-w-[150px] p-3">نام</th>
            <th className="p-3">قیمت واحد</th>
            <th className="p-3">تعداد</th>
            <th className="p-3">قیمت کل</th>
            <th className="p-3">حذف</th>
          </tr>
        </thead>
        <tbody className="[&>:not(:last-child)]:border [&>:not(:last-child)]:border-b [&>:not(:last-child)]:border-gray-300">
          {cartItems.map((item, index) => (
            <tr key={item._id} className="odd:bg-light-200">
              <td className="p-3">{toPersianNumbers(index + 1)}</td>
              <td className="flex-center p-3">
                <Link href={`${appRoutes.products.link}/${item._id}`}>
                  <img
                    className="rounded-md"
                    src={item.images[0].src}
                    alt={"not"}
                    width={50}
                    height={50}
                  />
                </Link>
              </td>
              <td className="p-3">{item.name}</td>
              <td className="p-3">
                {toPersianNumbersWithComma(item.price)}
                &nbsp;
                {"تومان"}
              </td>
              <td className="p-3">
                <div className="flex-center flex">
                  <button
                    className="border border-y border-primary-500 bg-primary-500 px-2 py-[4px] text-white"
                    onClick={() => addToCartHandler(item._id, 1)}
                    disabled={item!?.count - item!?.quantity === 1}
                  >
                    +
                  </button>
                  {item!?.quantity > 0 && (
                    <button className="border border-y border-primary-500 px-5 py-[4px]">
                      {toPersianNumbers(item!?.quantity)}
                    </button>
                  )}
                  <button
                    className="border border-y border-primary-500 bg-primary-500 px-2 py-[4px] text-white"
                    onClick={() => addToCartHandler(item._id, -1)}
                    // disabled={existItem!?.quantity === 0}
                  >
                    -
                  </button>
                </div>
              </td>
              <td className="p-3">
                {toPersianNumbersWithComma(item?.quantity * item?.price)}
                &nbsp;
                {"تومان"}
              </td>
              <td className="">
                <span className="flex justify-center">
                  <RiDeleteBin5Line
                    onClick={() => removeCartItemHandler(item._id)}
                    className="cursor-pointer text-warning-500"
                    size={20}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartDetail;
