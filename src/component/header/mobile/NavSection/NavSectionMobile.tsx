"use client";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { MdKeyboardArrowUp, MdOutlineArrowBack } from "react-icons/md";
import { TbSearch } from "react-icons/tb";
import logo from "../../../../../public/logo-white-removebg-preview.png";
import MenuItemsMobile from "./MenuItemsMobile";
import NavbarMobile from "./NavbarMobile";

type NavSecionMobileProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

function NavSectionMobile({ setOpen, isOpen }: NavSecionMobileProps) {
  const [isSearchBoxOpen, setSearchBox] = useState(false);

  return (
    <>
      <div className="fixed z-[70] w-full bg-primary-500 px-[9px] py-[3px] md:hidden">
        <div className="flex">
          <div
            id="menu-search-wrapper"
            className="z-[70] flex w-[50%] items-center gap-[2px]"
          >
            <Hamburger
              toggled={isOpen}
              size={20}
              toggle={setOpen}
              color="white"
              duration={0.5}
            />
            {!isSearchBoxOpen && (
              <TbSearch
                className="rotate-90 cursor-pointer text-white"
                size={22}
                onClick={() => setSearchBox(!isSearchBoxOpen)}
              />
            )}
            {isSearchBoxOpen && (
              <MdKeyboardArrowUp
                className="cursor-pointer text-white"
                size={26}
                onClick={() => setSearchBox(!isSearchBoxOpen)}
              />
            )}
          </div>
          <div className="flex w-[50%] items-center justify-end px-4">
            <Link href={"/"}>
              <img alt={logo.src} src={logo.src} className="h-[38px]" />
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`fixed z-[65] mt-[54px] flex flex-1 items-center justify-center md:hidden ${isSearchBoxOpen ? "opacity-100" : "-mt-[55px] opacity-0"} transition-smooth w-full bg-primary-500 px-2 py-4`}
      >
        <div className="relative w-full px-5">
          <input
            type="text"
            placeholder="جستجوی محصولات ..."
            className={`w-full rounded-sm bg-white px-[45px] py-[6px] text-sm outline-none ${isSearchBoxOpen ? "block" : "hidden"}`}
          />
          <TbSearch className="absolute right-0 top-0 my-[6px] mr-[30px] text-lg font-black text-[#c1c1c1]" />
          <button className="absolute left-0 top-0 my-[4px] ml-[25px] rounded-sm bg-[#a5956a] p-[6px]">
            <MdOutlineArrowBack className="text-white" size={12} />
          </button>
        </div>
      </div>
      <div
        className={`${isOpen ? "fixed flex" : "fixed -mr-[2000px]"} z-[60] h-[100vh] w-[100%] md:hidden`}
      >
        <div
          className={`flex h-full w-[85%] max-w-[330px] flex-col gap-4 overflow-y-scroll bg-white px-4 pt-[70px] transition-all duration-300 ease-linear ${isOpen ? "opacity-100" : "-mr-[800px] opacity-0"}`}
        >
          <MenuItemsMobile openHandler={setOpen} />
          <div className="w-full border border-[#eeeeee]"></div>
          <NavbarMobile openHandler={setOpen} />
        </div>
        <div
          onClick={() => setOpen(false)}
          className={`${isOpen ? "opacity-60" : "-mr-[800px] opacity-0"} h-full flex-1 bg-[#424242] p-10 transition-all duration-300 ease-linear`}
        ></div>
      </div>
    </>
  );
}

export default NavSectionMobile;
