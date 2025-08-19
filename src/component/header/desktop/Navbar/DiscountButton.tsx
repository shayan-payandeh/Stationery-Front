import { appRoutes } from "@/constant/routes";
import Link from "next/link";
import React from "react";
import { RiDiscountPercentFill } from "react-icons/ri";

function DiscountButton() {
  return (
    <div
      id="discount-wrapper"
      className="flex w-[17%] items-center justify-end lg:w-[15%]"
    >
      <Link href={`${appRoutes.products.link}?discount=true`}>
        <div className="transition-smooth flex gap-2 rounded-md border border-warning-500 px-[12px] py-[6px] text-listItem font-medium text-warning-500 hover:scale-105 hover:border-warning-800 hover:bg-warning-200">
          <RiDiscountPercentFill
            size={18}
            className="text-warborder-warning-500"
          />
          <span>تخفیف ها</span>
        </div>
      </Link>
    </div>
  );
}

export default DiscountButton;
