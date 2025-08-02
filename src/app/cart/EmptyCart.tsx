import { appRoutes } from "@/constant/routes";
import Link from "next/link";
import React from "react";
import { BsCartX } from "react-icons/bs";

function EmptyCart() {
  return (
    <div className="flex flex-col justify-center gap-4 py-10">
      <span className="flex justify-center">
        <BsCartX size={60} className="text-primary-500" />
      </span>
      <span className="text-sm text-primary-500 md:text-[16px] lg:text-xl">
        سبد خرید شما خالی است.
      </span>
      <span>
        <Link href={`${appRoutes.products.link}`}>شروع خرید</Link>
      </span>
    </div>
  );
}

export default EmptyCart;
