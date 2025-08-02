import { AiOutlineHome } from "react-icons/ai";
import {
  BsExclamationCircle,
  BsPatchQuestion,
  BsTelephone,
} from "react-icons/bs";
import { routes } from "./routes";

export const menuItems = [
  {
    name: "خانه",
    link: `${routes.main}`,
    icon: <AiOutlineHome />,
  },
  {
    name: "درباره ما",
    link: `${routes.about}`,
    icon: <BsExclamationCircle />,
  },
  {
    name: "ارتباط با ما",
    link: `${routes.contact}`,
    icon: <BsTelephone />,
  },
  {
    name: "سوالات متداول",
    link: `${routes.faq}`,
    icon: <BsPatchQuestion />,
  },
];
