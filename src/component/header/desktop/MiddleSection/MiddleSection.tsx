import { PiArrowCircleLeftFill } from "react-icons/pi";
import { TbSearch } from "react-icons/tb";
import DropdownMenuButton from "./DropdownMenuButton";
import logo from "../../../../../public/main_logo.png";
import Link from "next/link";
import { routes } from "@/constant/routes";
import { useState } from "react";

function MiddleSection() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="hidden w-full justify-center bg-light-200 shadow-md md:flex">
      <div className="responsive__wrapper grid w-full grid-cols-12">
        <div className="col-span-8 grid w-full grid-cols-11 md:col-span-7 lg:col-span-8 lg:grid-cols-12">
          <div
            id="logo"
            className="col-span-2 flex items-center justify-center py-2 lg:col-span-2 xl:col-span-1"
          >
            <div className="h-full w-full">
              <Link href={routes.main}>
                <img
                  alt={logo.src}
                  src={logo.src}
                  className="h-[58px] w-[65px] transition-all duration-200 ease-in hover:scale-110"
                />
              </Link>
            </div>
          </div>
          <div
            id="search-box"
            className="col-span-8 flex w-full items-center lg:col-span-10 xl:col-span-9"
          >
            <div className="relative w-full px-[25px] lg:px-[1px] xl:px-[30px]">
              <input
                className="peer w-[283px] rounded-md bg-light-100 px-10 py-[6px] text-[11px] placeholder-light-400 shadow-container focus:border-none focus:outline focus:outline-primary-500 lg:w-[400px] lg:text-[12.5px] xl:text-[13.5px]"
                type="text"
                placeholder="جستجوی محصولات ..."
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Link href={`${routes.products}?search=${searchValue}`}>
                <TbSearch className="absolute right-0 top-0 my-[6px] mr-10 text-lg font-black text-light-400 peer-focus:-scale-x-100 peer-focus:text-primary-500 lg:mr-3 xl:mr-10" />
              </Link>
              <PiArrowCircleLeftFill className="absolute right-0 top-0 mr-[276px] mt-[4px] hidden cursor-pointer text-[24px] text-primary-500 peer-focus:block lg:mr-[370px] xl:mr-[400px]" />
            </div>
          </div>
        </div>
        <div
          id="auth-cart-wrapper"
          className="col-span-4 flex w-full pl-0 sm:pl-0 md:col-span-5 lg:col-span-4"
        >
          <div
            id="auth-wrapper"
            className="flex w-full items-center pr-4 lg:pr-6"
          >
            <DropdownMenuButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiddleSection;
