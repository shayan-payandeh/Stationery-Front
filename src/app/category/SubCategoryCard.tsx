import { routes } from "@/constant/routes";
import { ICategoryGet } from "@/interface/category";
import { ISubCategoryGet } from "@/interface/subCategory";
import Link from "next/link";
import React from "react";

type SubCategoryCardProps = {
  subCategory: ISubCategoryGet;
  categories: ICategoryGet[];
  classes: string;
};

function SubCategoryCard({
  subCategory,
  categories,
  classes,
}: SubCategoryCardProps) {
  const { image, persianTitle, slug, category: categoryId } = subCategory;
  const category = categories.find((item) => item._id === categoryId);
  return (
    <div id="subCategory-card" className={classes}>
      <Link href={`${routes.category}/${slug}/${category?.slug}`}>
        <div
          id="image-wrapper"
          className="flex h-[85px] w-[85px] items-center justify-center transition-all duration-200 ease-in hover:scale-105"
        >
          <img alt={"error"} src={image} className="scale-[1.05]" />
        </div>
      </Link>
      <Link href={`${routes.category}/${slug}/${category?.slug}`}>
        <div
          id="title-wrapper"
          className="text-[14px] font-medium text-dark-500"
        >
          {persianTitle}
        </div>
      </Link>
    </div>
  );
}

export default SubCategoryCard;
