import { ISubCategoryGet } from "@/interface/subCategory";
import { ICategoryGet } from "@/interface/category";
import SubCategoryCard from "./SubCategoryCard";

type SubCategoriesListProps = {
  subCategories: ISubCategoryGet[];
  categories: ICategoryGet[];
};

function SubCategoriesList({
  subCategories,
  categories,
}: SubCategoriesListProps) {
  return (
    <div
      id="category-wrapper"
      className="grid w-full grid-cols-2 gap-10 rounded-md bg-light-100 px-8 py-8 sm:grid-cols-6 md:gap-7 md:px-6 lg:grid-cols-12 xl:grid-cols-10 2xl:grid-cols-12"
    >
      {subCategories.map((subCategory) => (
        <SubCategoryCard
          categories={categories}
          subCategory={subCategory}
          key={subCategory._id}
          classes="col-span-2 grid w-full place-items-center justify-items-center gap-y-2 rounded-md bg-light-300 p-4 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-2 2xl:col-span-2"
        />
      ))}
    </div>
  );
}

export default SubCategoriesList;
