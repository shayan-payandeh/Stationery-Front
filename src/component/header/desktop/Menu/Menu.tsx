import { menuItems } from "@/constant/menuItems";
import Link from "next/link";

function Menu() {
  return (
    <div className="hidden w-full justify-center bg-primary-500 md:flex">
      <div className="responsive__wrapper">
        <ul className="flex gap-8 text-[11.5px] font-medium text-light-200 xl:text-[13.5px]">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
