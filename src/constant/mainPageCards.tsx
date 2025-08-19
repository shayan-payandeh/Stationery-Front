import FAQ from "@/common/svg/FAQ";
import OrderGuide from "@/common/svg/OrderGuide";
import ContactUs from "@/common/svg/ContactUs";
import AboutUs from "@/common/svg/AboutUs";
import { appRoutes } from "./routes";

export const cards = [
  {
    id: 1,
    title: appRoutes.faq.persianTitle,
    link: appRoutes.faq.link,
    icon: <FAQ />,
    bgImage:
      "radial-gradient(circle, #ff8794, #ec7480, #d8616d, #c54d5a, #b23a48)",
  },
  {
    id: 2,
    title: appRoutes.orderGuid.persianTitle,
    link: appRoutes.orderGuid.link,
    icon: <OrderGuide />,
    bgImage:
      "radial-gradient(circle, #e2d0b6, #dcc5a5, #d6ba94, #d1af83, #cba473)",
  },
  {
    id: 3,
    title: appRoutes.contact.persianTitle,
    link: appRoutes.contact.link,
    icon: <ContactUs />,
    bgImage:
      "radial-gradient(circle, #89ceb4, #76bfa3, #63b092, #4fa281, #3b9371)",
  },
  {
    id: 4,
    title: appRoutes.about.persianTitle,
    link: appRoutes.about.link,
    icon: <AboutUs />,
    bgImage:
      "radial-gradient(circle, #abacad, #9b9ea1, #8b9095, #7b8289, #6c757d)",
  },
];
