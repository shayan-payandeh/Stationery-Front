import { categoriesIconSlug } from "@/constant/category";
import { appRoutes } from "@/constant/routes";
import Link from "next/link";

function NavbarMobile({ openHandler }) {
  const newCategories = categoriesIconSlug.map((item) => ({
    id: item.id,
    icon: <item.Icon />,
    title: item.persianTitle,
    link: `${appRoutes.category.link}/${item.slug}`,
  }));
  const navItems = [...newCategories];

  return (
    <nav className="flex flex-col gap-3 py-2">
      <h2 className="font-medium text-[#353535]">دسته بندی محصولات </h2>
      <ul>
        {navItems.map((item) => (
          <Link
            onClick={() => openHandler(false)}
            href={item.link}
            key={item.title}
          >
            <li
              key={item.title}
              className="group flex items-center gap-4 px-1 py-4"
            >
              <span className="text-[23px] text-[#b7b7b7] group-hover:text-primary-500">
                {item.icon}
              </span>
              <span className="text-[14px] font-medium text-[#2e2e2e]">
                {item.title}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default NavbarMobile;
