import FAQ from "@/common/svg/FAQ";
import { routes } from "./routes";
import OrderGuide from "@/common/svg/OrderGuide";
import ContactUs from "@/common/svg/ContactUs";
import AboutUs from "@/common/svg/AboutUs";

export const cards = [
  {
    id: 1,
    title: "سوالات متداول",
    link: routes.faq,
    icon: <FAQ />,
    bgImage:
      "radial-gradient(circle, #ff8794, #ec7480, #d8616d, #c54d5a, #b23a48)",
  },
  {
    id: 2,
    title: "راهنمای سفارش",
    link: routes.faq,
    icon: <OrderGuide />,
    bgImage:
      "radial-gradient(circle, #e2d0b6, #dcc5a5, #d6ba94, #d1af83, #cba473)",
  },
  {
    id: 3,
    title: "ارتباط با ما",
    link: routes.contact,
    icon: <ContactUs />,
    bgImage:
      "radial-gradient(circle, #89ceb4, #76bfa3, #63b092, #4fa281, #3b9371)",
  },
  {
    id: 4,
    title: "درباره ما",
    link: routes.about,
    icon: <AboutUs />,
    bgImage:
      "radial-gradient(circle, #abacad, #9b9ea1, #8b9095, #7b8289, #6c757d)",
  },
];
