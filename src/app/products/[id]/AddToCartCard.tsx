"use client";
import { useCartStore } from "@/hook/useCartStore";
import { IProductsGet } from "@/interface/products";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import { useEffect, useState } from "react";
import { MdEventAvailable } from "react-icons/md";
import { PiPackage } from "react-icons/pi";

function AddToCartCard({ product }: { product: IProductsGet }) {
  const { cartItems, addItem, removeItem } = useCartStore((state) => state);
  const [isProductInCart, setProductInCart] = useState(false);
  const existItem = cartItems?.find((item) => item._id === product._id);
  useEffect(() => {
    if (existItem) setProductInCart(true);
  }, [existItem]);

  const addToCartHandler = (number: number = 1) => {
    const item = {
      _id: product._id,
      name: product.name,
      count: product.count,
    };
    const quantity = existItem ? existItem.quantity + number : 1;
    if (quantity === 0) {
      removeItem(item._id);
      setProductInCart(false);
    } else {
      addItem({ ...item, quantity: quantity });
      setProductInCart(true);
    }
  };

  return (
    <div className="flex h-fit w-full flex-col items-center gap-3 overflow-hidden rounded-md border bg-light-200 p-2 xl:p-4">
      <section className="w-full text-xs leading-8 text-black">
        <div className="flex items-center gap-1 text-start">
          <span>
            <MdEventAvailable className="text-[18px] text-primary-500" />
          </span>
          <span>موجود در انبار فروشگاه</span>
        </div>
        <div className="flex items-center gap-1 text-start text-dark-500">
          <span>
            <PiPackage className="text-[18px] text-primary-500" />
          </span>
          <span>ارسال توسط فروشگاه</span>
        </div>
      </section>
      <section className="flex w-full flex-row-reverse items-center justify-between gap-4 border-t pt-4">
        <div className="flex flex-col items-center justify-start">
          <p className="text-warning-500">
            <span className="text-sm sm:text-[18px]">
              {toPersianNumbersWithComma(product?.price)}
            </span>
            &nbsp;
            <span className="text-[12px] sm:text-sm">تومان</span>
          </p>
        </div>
        {!isProductInCart && (
          <button
            onClick={() => addToCartHandler(1)}
            className="my-1 rounded-md bg-primary-500 px-[14px] py-[12px] text-[12px] leading-4 text-light-100 sm:text-sm lg:px-[18px] lg:py-[14px]"
          >
            افزودن به سبد خرید
          </button>
        )}
        {isProductInCart && existItem && (
          <div className="flex rounded-md border border-gray-300">
            <button
              className="rounded-r-md bg-primary-500 p-[8px] text-white md:p-[10px] lg:p-3"
              onClick={() => addToCartHandler(1)}
              disabled={existItem!?.count - existItem!?.quantity === 1}
            >
              +
            </button>
            {existItem!?.quantity > 0 && (
              <span className="bg-white px-[28px] py-[8px] sm:px-9 lg:px-10">
                {toPersianNumbers(existItem!?.quantity)}
              </span>
            )}
            <button
              className="rounded-l-md bg-primary-500 p-[8px] text-white md:p-[10px] lg:p-3"
              onClick={() => addToCartHandler(-1)}
              disabled={existItem!?.quantity === 0}
            >
              -
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default AddToCartCard;
