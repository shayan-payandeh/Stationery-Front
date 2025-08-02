"use client";
import { routes } from "@/constant/routes";
import { AppCtxt } from "@/context/Store";
import { useLogout } from "@/hook/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import {
  RiAccountPinBoxLine,
  RiDashboardLine,
  RiLogoutBoxLine,
  RiShoppingCart2Line,
} from "react-icons/ri";

const nabarItems = [
  {
    id: 10,
    title: "پیشخوان",
    link: `${routes.profile}`,
    icon: <RiDashboardLine />,
  },
  {
    id: 20,
    title: "جزئیات حساب",
    link: `${routes.profileInfo}`,
    icon: <RiAccountPinBoxLine />,
  },
  {
    id: 30,
    title: "سفارش ها",
    link: `${routes.profileOrders}`,
    icon: <RiShoppingCart2Line />,
  },
];

function Navbar() {
  const mutualClass = `transition-smooth flex items-center justify-start gap-4 rounded-lg px-5 py-[16px] text-[.8rem] font-medium shadow-md lg:text-[.9rem] `;
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useLogout(queryClient);
  const { dispatch } = useContext(AppCtxt);

  const logoutHandler = async () => {
    setShowModal(false);
    mutate();
    router.push("/");
    dispatch({ type: "CART_CLEAR", payload: {} });
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <nav id="list-item" className={`flex flex-col gap-4`}>
      {nabarItems.map((item) => (
        <Link href={item.link} key={item.id}>
          <div
            key={item.id}
            className={`${mutualClass} ${pathname === item.link ? "bg-primary-500 text-light-100" : "bg-light-100 text-dark-500 hover:bg-light-300"}`}
          >
            <span className="lg:[1.25rem] rounded-md bg-light-300 p-[6px] text-[.9rem] text-dark-500 lg:text-[1.25rem]">
              {item.icon}
            </span>
            <span>{item.title}</span>
          </div>
        </Link>
      ))}

      <div
        className={`text-warning-500 shadow-md hover:bg-light-300 lg:text-[.9rem] ${mutualClass} cursor-pointer`}
        onClick={() => setShowModal(true)}
      >
        <span className="rounded-md bg-red-50 p-[6px] text-[.9rem] lg:text-[1.25rem]">
          <RiLogoutBoxLine className="-scale-100 text-warning-500" />
        </span>
        <span>خروج از حساب</span>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-72 rounded-lg bg-white p-6 shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <h2 className="text-lg font-semibold text-gray-800">
              خروج از سایت
            </h2>
            <div className="mb-3 mt-3 h-0.5 bg-light-300"></div>
            <p className="mt-2 text-sm text-gray-600">
              آیا می خواهید از حساب کاربری خود خارج شوید؟
            </p>
            <div className="mt-4 flex justify-end gap-2 space-x-2 text-[13px]">
              <button
                onClick={() => setShowModal(false)}
                className="rounded bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
              >
                انصراف
              </button>
              <button
                onClick={logoutHandler}
                className="hover: rounded bg-rose-600 px-4 py-2 text-light-100 transition hover:bg-rose-700"
              >
                خروج از حساب
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
