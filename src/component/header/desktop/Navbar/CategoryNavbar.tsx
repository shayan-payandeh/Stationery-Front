import { categoriesIconSlug } from "@/constant/category";
import { appRoutes } from "@/constant/routes";
import Link from "next/link";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function CategoryNavbar() {
  const restCategories = categoriesIconSlug.map((item) => ({
    id: item.id,
    icon: <item.Icon />,
    title: item.persianTitle,
    link: `${appRoutes.category.link}/${item.slug}`,
  }));
  const navItems = [
    {
      title: "همه زیر دسته ها",
      link: `${appRoutes.subcategories.link}`,
      icon: <HiOutlineMenuAlt3 className="text-primary-500" />,
    },
    ...restCategories,
  ];
  return (
    <nav id="menu-wrapper" className="flex px-0 py-[10px] xl:px-0">
      <ul className="flex gap-4 text-listItem font-medium">
        {navItems.map((item) => (
          <li
            key={item.title}
            className="py-[2px] pl-2 first:border-l first:border-light-500 lg:pl-3"
          >
            <Link href={item.link}>
              <div className="flex items-center gap-[5px] text-light-500 hover:text-primary-500">
                <span className="text-[14px] lg:text-[18px]">{item.icon}</span>
                <span className="text-dark-500">{item.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryNavbar;
