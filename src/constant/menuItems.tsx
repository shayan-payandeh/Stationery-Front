import { AiOutlineHome } from "react-icons/ai";
import {
  BsExclamationCircle,
  BsPatchQuestion,
  BsTelephone,
} from "react-icons/bs";
import { appRoutes } from "./routes";

export const menuItems = [
  {
    name: "خانه",
    link: `${appRoutes.main.link}`,
    icon: <AiOutlineHome />,
  },
  {
    name: "درباره ما",
    link: `${appRoutes.about.link}`,
    icon: <BsExclamationCircle />,
  },
  {
    name: "ارتباط با ما",
    link: `${appRoutes.contact.link}`,
    icon: <BsTelephone />,
  },
  {
    name: "سوالات متداول",
    link: `${appRoutes.faq.link}`,
    icon: <BsPatchQuestion />,
  },
];
