import { routes } from "@/constant/routes";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import logo from "../../../public/logo2.png";
import ScrollView from "../animate/ScollView";

function Slogan() {
  return (
    <ScrollView htmlTag="div">
      <section id="slogan-wrapper" className="flex justify-center px-2 pb-14">
        <div className="flex w-full max-w-[500px] flex-col gap-4 rounded-lg border-2 border-light-300 bg-light-100 px-[1px] py-8 md:max-w-[650px] md:flex-row-reverse md:justify-between md:px-20 lg:max-w-[900px] xl:max-w-[980px]">
          <div id="logo-container" className="flex justify-center">
            <img alt={logo.src} src={logo.src} width={100} />
          </div>
          <div id="text-container" className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-center text-title font-semibold text-dark-500 md:text-start">
              خرید بهترین نوشت افزارهای ایرانی و خارجی
            </h1>
            <p className="text-center font-morvarid text-[.8rem] text-light-500 md:text-start md:text-[.9rem] lg:text-[1rem] xl:text-[1.2rem]">
              با خیالی راحت با کیفیت ترین ها را با مناسب ترین قیمت از ما خریداری
              کنید.
            </p>
            <div className="flex-center mt-3 gap-3 md:justify-start">
              <Link href={routes.about}>
                <span className="transition-smooth flex gap-2 text-center text-listItem italic text-primary-500 hover:scale-[1.02]">
                  <span>درباره شایان نگارش</span>
                  <IoMdArrowBack className="text-[20px] text-primary-500" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ScrollView>
  );
}

export default Slogan;
