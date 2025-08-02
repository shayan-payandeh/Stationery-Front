import { routes } from "@/constant/routes";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import Link from "next/link";
import {
  PiInstagramLogo,
  PiTelegramLogoDuotone,
  PiWhatsappLogo,
} from "react-icons/pi";
import ScrollBlur from "../animate/ScrollBlur";

function Footer() {
  const menu = [
    {
      name: "خانه",
      link: `${routes.main}`,
    },
    {
      name: "درباره ما",
      link: `${routes.about}`,
    },
    {
      name: "ارتباط با ما",
      link: `${routes.contact}`,
    },
    {
      name: "سوالات متداول",
      link: `${routes.faq}`,
    },
    // {
    //   name: "تخفیف ها",
    //   link: "/",
    //   icon: <TbRosetteDiscount color="#d42c40" />,
    // },
  ];
  const secondaryList = [
    {
      name: "لیست همه محصولات",
      link: `${routes.products}`,
    },
    {
      name: "دسته بندی محصولات",
      link: `${routes.category}`,
    },
    {
      name: "برندها",
      link: `${routes.brands}`,
    },
    {
      name: "برچسب ها",
      link: `${routes.tags}`,
    },
    // {
    //   name: "تخفیف ها",
    //   link: "/",
    //   icon: <TbRosetteDiscount color="#d42c40" />,
    // },
  ];
  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: false });
  return (
    <footer className="flex flex-col">
      <div id="footer-wave-section ">
        <svg
          style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1366 65.3"
        >
          <path
            d="M0,9.2c156.1-22,468.3,0,683,18,175.6,17,507.4,7.5,683-20v50H0"
            fill="var(--color-primary-500)"
          ></path>
          <path
            d="M0,29.2c156.1-18,448.8-12,683,7,156.1,13,507.4,17,683-5V65.6H0Z"
            fill="var(--color-primary-800)"
          ></path>
        </svg>
      </div>
      <div
        id="footer-main-secton"
        className="flex min-h-[315px] justify-center bg-primary-800 py-0 md:py-6 lg:py-2"
      >
        <div className="responsive__wrapper grid grid-cols-12 place-items-center md:place-items-start">
          <div
            id="links"
            className="col-span-12 grid grid-cols-12 place-items-center gap-7 sm:gap-8 md:col-span-6 md:place-items-start lg:gap-10"
          >
            <div
              id="main-links-wrapper"
              className="col-span-6 flex flex-col items-start gap-[6px]"
            >
              <h2 className="w-[113px] border-b-[1.5px] border-dark-500 border-opacity-90 pb-[10px] text-[15px] font-bold text-primary-500">
                شایان نگارش
              </h2>
              <ScrollBlur>
                <ul>
                  {menu.map((item) => (
                    <Link href={item.link} key={item.name}>
                      <li className="my-5 text-listItem text-light-100">
                        {item.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </ScrollBlur>
            </div>
            <div
              id="secondary-links-wrapper"
              className="col-span-6 flex flex-col items-start gap-[6px]"
            >
              <span className="w-[113px] border-b-[1.5px] border-dark-500 pb-[10px] text-[15px] font-bold text-primary-500">
                محصولات
              </span>
              <ScrollBlur>
                <ul className="bgre">
                  {secondaryList.map((item) => (
                    <Link href={item.link} key={item.name}>
                      <li className="my-5 text-listItem text-light-100">
                        {item.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </ScrollBlur>
            </div>
          </div>
          <div
            id="contact-wrapper"
            className="-orange-400 col-span-12 flex w-full flex-col items-center gap-[6px] md:col-span-6"
          >
            <div
              id="phonenumber-wrapper"
              className="flex flex-col gap-[10px] py-4"
            >
              <span className="text-center text-sm text-light-500">
                با ما در تماس باشید‌:
              </span>
              <ScrollBlur className="rounded-md bg-primary-500 px-10 py-2 text-light-100">
                {toPersianNumbers("0930-817-7569")}
              </ScrollBlur>
            </div>
            <div
              id="socialmedia-wrapper"
              className="flex flex-col gap-[10px] py-4"
            >
              <span className="text-center text-sm text-light-500">
                شایان نگارش در شبکه های اجتماعی :
              </span>
              <ScrollBlur className="flex justify-center gap-4 text-light-500">
                <Link href={"/"}>
                  <PiWhatsappLogo size={30} />
                </Link>
                <Link href={"/"}>
                  <PiInstagramLogo size={30} />
                </Link>
                <Link href={"/"}>
                  <PiTelegramLogoDuotone size={30} />
                </Link>
              </ScrollBlur>
            </div>
          </div>
        </div>
      </div>
      <div
        id="footer-secondary-section"
        className="flex-center min-h-[60px] bg-primary-700"
      >
        <div className="flex-center flex-col gap-1 text-center text-[11px] text-light-500">
          <p>
            &#169; تمامی حقوق وبسایت برای &quot; شایان نگارش &quot; محفوظ است -
            ۱۴۰۳{" "}
          </p>
          <div className="flex-center gap-1">
            <span> طراح و توسعه توسط</span>
            <span className="font-mono text-[12px] font-semibold italic text-primary-500">
              Shayan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
