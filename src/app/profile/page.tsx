import ScrollStaggeredFade from "@/component/animate/ScrollStaggeredFade";
import { profileText } from "@/constant/profileTests";
import { routes } from "@/constant/routes";
import Link from "next/link";
import { LiaEnvelopeOpenTextSolid, LiaUserEditSolid } from "react-icons/lia";
import Greeting from "./Greeting";

function Page() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-lg border border-light-200 px-5 py-6 shadow-container">
      <Greeting />
      <div className="text-[.8rem] sm:text-[.9rem] lg:text-[1rem]">
        <p className="mt-2 text-dark-500">
          {profileText.contextOne.split(" ").map((item, index) => (
            <ScrollStaggeredFade key={index} htmlTag="span" custom={index}>
              {item}{" "}
            </ScrollStaggeredFade>
          ))}
        </p>
        <p className="mt-2 text-dark-500">
          {profileText.contextTwo.split(" ").map((item, index) => (
            <ScrollStaggeredFade
              key={index}
              delay={1}
              htmlTag="span"
              custom={index}
            >
              {item}{" "}
            </ScrollStaggeredFade>
          ))}
        </p>
      </div>
      <div className="flex flex-1 items-end justify-center gap-x-4 py-3 sm:justify-end lg:p-3">
        <Link href={routes.profileInfo}>
          <div className="flex-center transition-smooth gap-x-2 rounded-md border border-primary-500 px-3 py-2 text-[11px] text-primary-500 hover:bg-primary-500 hover:text-light-100 md:text-[12.5px] lg:text-[14px]">
            <span>
              <LiaUserEditSolid className="text-[18px]" />
            </span>
            <span>ویرایش اطلاعات</span>
          </div>
        </Link>
        <Link href={routes.contact}>
          <div className="flex-center transition-smooth gap-x-2 rounded-md border border-primary-500 px-3 py-2 text-[11px] text-primary-500 hover:bg-primary-500 hover:text-light-100 md:text-[12.5px] lg:text-[14px]">
            <span>
              <LiaEnvelopeOpenTextSolid className="text-[18px]" />
            </span>
            <span>ارتباط با ما</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Page;
