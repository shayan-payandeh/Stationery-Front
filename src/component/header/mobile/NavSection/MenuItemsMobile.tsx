import { menuItems } from "@/constant/menuItems";
import { routes } from "@/constant/routes";
import Link from "next/link";
import { TbRosetteDiscount } from "react-icons/tb";

type MenuItemsMobileProps = {
  openHandler: (open: boolean) => void;
};

function MenuItemsMobile({ openHandler }: MenuItemsMobileProps) {
  const menu = [
    ...menuItems,
    {
      name: "تخفیف ها",
      link: `${routes.products}?discount=true`,
      icon: <TbRosetteDiscount color="#d42c40" />,
    },
  ];

  return (
    <nav>
      <ul>
        {menu.map((item) => (
          <Link
            onClick={() => openHandler(false)}
            href={item.link}
            key={item.name}
          >
            <li
              key={item.name}
              className="group flex items-center gap-4 px-1 py-4"
            >
              <span className="text-[23px] text-[#a0a0a0] group-hover:text-primary-500">
                {item.icon}
              </span>
              <span className="text-[14px] font-medium text-[#2e2e2e]">
                {item.name}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default MenuItemsMobile;
