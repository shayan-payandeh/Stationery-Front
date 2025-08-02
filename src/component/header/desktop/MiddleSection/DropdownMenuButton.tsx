"use client";
import { routes } from "@/constant/routes";
import { AppCtxt } from "@/context/Store";
import { useGetProfile } from "@/hook/useAuth";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";

export default function DropdownMenuButton() {
  const router = useRouter();
  const token = getCookie("accessToken");
  const hasToken = token ? true : false;
  const userData = useGetProfile(hasToken);
  const { data, isLoading } = userData || {};
  const { state } = useContext(AppCtxt);
  const [cartLength, setCartLength] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const profileMenu = [
    { link: `${routes.profile}`, persianTitle: "حساب کاربری" },
    { link: `${routes.profileInfo}`, persianTitle: "جزئیات حساب" },
    { link: `${routes.profileOrders}`, persianTitle: "سفارشات" },
  ];
  const authMenu = [
    { link: `${routes.login}`, persianTitle: "ورود" },
    { link: `${routes.register}`, persianTitle: "ثبت نام" },
  ];
  useEffect(() => {
    if (state.cart?.cartItems) setCartLength(state.cart.cartItems.length);
  }, [state.cart?.cartItems]);

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

      <Link href={`${routes.cart}`}>
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
