"use client";
import { appRoutes } from "@/constant/routes";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { IoIosArrowBack } from "react-icons/io";

type AppBreadCrumbProps = {
  destinations: { title: string; link: string }[];
};
function AppBreadCrumb({ destinations }: AppBreadCrumbProps) {
  const mainDestination = [
    { title: appRoutes.main.persianTitle, link: appRoutes.main.link },
  ];
  const destinationArray = [...mainDestination, ...destinations];
  return (
    <Breadcrumbs
      className="px-6 text-[13px] text-dark-500 last:text-[15px] md:px-0"
      dir="rtl"
      itemClasses={{
        separator: "px-2 text-primary-500",
        item: "last:font-semibold",
      }}
      separator={<IoIosArrowBack />}
    >
      {destinationArray.map((dest) => (
        <BreadcrumbItem href={dest.link} key={dest.title}>
          {dest.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}

export default AppBreadCrumb;
