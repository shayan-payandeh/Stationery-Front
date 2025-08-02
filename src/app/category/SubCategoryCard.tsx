import { routes } from "@/constant/routes";
import Link from "next/link";
import React from "react";

type SubCategoryCardProps = {
  slug: string;
  image: string;
  title: string;
  classes: string;
};

function SubCategoryCard({
  slug,
  image,
  title,
  classes,
}: SubCategoryCardProps) {
  return (
    <div id="subCategory-card" className={classes}>
      <Link href={`${routes.category}/${slug}`}>
        <div
          id="image-wrapper"
          className="flex h-[85px] w-[85px] items-center justify-center transition-all duration-200 ease-in hover:scale-105"
        >
          <img alt={"error"} src={image} className="scale-[1.05]" />
        </div>
      </Link>
      <Link href={`${routes.category}/${slug}`}>
        <div
          id="title-wrapper"
          className="text-[14px] font-medium text-dark-500"
        >
          {title}
        </div>
      </Link>
    </div>
  );
}

export default SubCategoryCard;
