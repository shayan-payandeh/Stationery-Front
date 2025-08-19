"use client";
import { appRoutes } from "@/constant/routes";
import { AppCtxt } from "@/context/Store";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CiCircleList } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";

function MenuSectionMobile() {
  const [isNavVisible, setNavVisible] = useState(true);
  const { state } = useContext(AppCtxt);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    if (state.cart?.cartItems) setCartLength(state.cart.cartItems.length);
  }, [state.cart?.cartItems]);

  const items = [
    { label: "خانه", icon: <AiOutlineHome size={17} />, link: "/" },
    {
      label: "همه زیردسته ها",
      icon: <CiCircleList size={17} />,
      link: `${appRoutes.subcategories.link}`,
    },
    {
      label: "سبد خرید",
      icon: <MdOutlineAddShoppingCart size={17} />,
      link: `${appRoutes.cart.link}`,
      hasBadge: true,
    },
    {
      label: "حساب من",
      icon: <FaRegUser size={15} />,
      link: `${appRoutes.profile.link}`,
    },
  ];

  const myScrollFunc = function () {
    // var y = window.scrollY;
    if (window.scrollY > document.body.scrollHeight - 1100) {
      setNavVisible(false);
    } else {
      setNavVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", myScrollFunc);
  }, []);

  return (
    <>
      {isNavVisible && (
        <nav
          id="bottomsection"
          className="fixed bottom-0 z-50 w-full rounded-t-2xl bg-light-100 py-[10px] filter md:hidden"
          style={{
            boxShadow:
              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          }}
        >
          <div className="flex justify-center">
            <ul className="flex w-full max-w-[600px] items-center justify-between gap-7 px-8">
              {items.map((item) => (
                <Link href={item.link} key={item.label}>
                  <li className="grid justify-items-center gap-[2px]">
                    <span className={`${item.hasBadge ? "relative" : ""}`}>
                      {item.hasBadge && (
                        <span className="absolute left-0 top-0 -ml-[13px] -mt-[6px] rounded-badge bg-primary-500 px-[7px] text-[12px] text-light-100">
                          {toPersianNumbers(cartLength)}
                        </span>
                      )}
                      {item.icon}
                    </span>
                    <span className="text-[11px]">{item.label}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

export default MenuSectionMobile;
