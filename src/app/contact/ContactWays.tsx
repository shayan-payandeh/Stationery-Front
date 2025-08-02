import { toPersianNumbers } from "@/utils/toPersianNumbers";
import Link from "next/link";
import React from "react";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoShareSocial } from "react-icons/io5";
import {
  PiInstagramLogo,
  PiTelegramLogoDuotone,
  PiWhatsappLogo,
} from "react-icons/pi";

function ContactWays() {
  const mutualClass = ` [&>*]:flex [&>*]:gap-x-4`;
  const mutualClassTwo = `[&_.logo]:text-primary-500 [&_.logo]:text-[1.25rem]`;
  const mutualClassThree = `[&_span]:text-[.9rem] [&_span]:text-primary-500`;

  return (
    <div
      className={`flex w-full flex-col gap-4 ${mutualClassTwo} ${mutualClass} ${mutualClassThree}`}
    >
      <div id="phonenumber-wrapper">
        <div className="flex-center gap-2">
          <IoIosPhonePortrait className="logo" />
          <span>شماره تماس :</span>
        </div>
        <div className="flex text-dark-500">
          {toPersianNumbers("0930-817-7569")}
        </div>
      </div>
      <div id="socialnetwork-wrapper">
        <div className="flex-center gap-2">
          <IoShareSocial className="logo" />
          <span>شبکه های اجتماعی :</span>
        </div>

        <div className={`flex-center gap-[14px]`}>
          <Link href={"/"}>
            <PiWhatsappLogo className="logo" />
          </Link>
          <Link href={"/"}>
            <PiInstagramLogo className="logo" />
          </Link>
          <Link href={"/"}>
            <PiTelegramLogoDuotone className="logo" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactWays;
