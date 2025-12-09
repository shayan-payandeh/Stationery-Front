"use client";
import { appRoutes } from "@/constant/routes";
import { useGetProfile } from "@/hook/useAuth";
import { useCartStore } from "@/hook/useCartStore";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";

export default function DropdownMenuButton() {
  const cartItems = useCartStore((state) => state.cartItems);
  const router = useRouter();
  const token = getCookie("accessToken");
  const hasToken = token ? true : false;
  const userData = useGetProfile(hasToken);
  const { data, isLoading } = userData || {};
  const [cartLength, setCartLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const profileMenu = [
    {
      link: `${appRoutes.profile.link}`,
      persianTitle: `${appRoutes.profile.persianTitle}`,
    },

    {
      link: `${appRoutes.profileInfo.link}`,
      persianTitle: `${appRoutes.profileInfo.persianTitle}`,
    },
    {
      link: `${appRoutes.profileOrders.link}`,
      persianTitle: `${appRoutes.profileOrders.persianTitle}`,
    },
  ];
  const authMenu = [
    {
      link: `${appRoutes.login.link}`,
      persianTitle: `${appRoutes.login.persianTitle}`,
    },
    {
      link: `${appRoutes.register.link}`,
      persianTitle: `${appRoutes.register.persianTitle}`,
    },
  ];
  useEffect(() => {
    if (cartItems) setCartLength(cartItems.length);
  }, [cartItems]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCloseDropdown = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleCloseDropdown);
    return () => document.removeEventListener("mousedown", handleCloseDropdown);
  }, []);

  const handleSelect = (item) => {
    router.push(item.link);
    setIsOpen(false);
  };

  return (
    <div className="flex w-full justify-end gap-[8px] lg:justify-end lg:gap-[30px]">
      <div
        ref={dropdownRef}
        className="relative flex items-center justify-center"
      >
        <FaRegUser className="w-3 font-bold text-light-500 lg:w-4" size={16} />

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex gap-2 rounded-md px-3 text-[14px] text-gray-500 focus:outline-none ${isLoading ? "blur-sm" : ""} `}
        >
          {data && !isLoading ? (
            <span>{data?.fullName}</span>
          ) : (
            <span>{"ثبت نام / ورود"}</span>
          )}
          <span className="flex items-center justify-center">
            <IoChevronDown />
          </span>
        </button>

        <div
          className={`absolute z-[999999999] ${data ? "mt-[168px]" : "mt-[120px]"} w-48 origin-top transform rounded-md border border-gray-200 bg-light-200 shadow-lg transition-all duration-200 ${isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-95 opacity-0"}`}
        >
          {data && (
            <>
              {profileMenu.map((item) => (
                <button
                  key={item.link}
                  onClick={() => handleSelect(item)}
                  className="w-full px-1 py-3 text-[12px] text-gray-700 hover:bg-light-300"
                >
                  {item.persianTitle}
                </button>
              ))}
            </>
          )}
          {!data && (
            <>
              {authMenu.map((item) => (
                <button
                  key={item.link}
                  onClick={() => handleSelect(item)}
                  className="w-full px-1 py-3 text-[12px] text-gray-700 hover:bg-light-300"
                >
                  {item.persianTitle}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      <Link href={`${appRoutes.cart.link}`}>
        <div className="relative z-50 flex max-w-[140px] items-center gap-3 rounded-md bg-primary-500 px-4 py-[10px] text-[11px] font-medium text-light-100 shadow-lg transition-all duration-200 ease-in hover:bg-primary-600 lg:px-4 lg:text-[12.8px]">
          <MdOutlineAddShoppingCart size={16} className="text-light-100" />
          {cartLength > 0 && (
            <span className="absolute right-0 top-0 mr-[5px] mt-1 flex items-center justify-center rounded-badge bg-light-100 px-[6px] py-0 text-[10.5px] font-normal text-primary-500">
              {toPersianNumbers(cartLength)}
            </span>
          )}
          <span>سبد خرید</span>
        </div>
      </Link>
    </div>
  );
}
