import SortSection from "@/app/category/[slug]/SortSection";
import AccordionSkeletonSection from "./AccordionSkeleton";
import ProductsSkeletonSection from "./ProductsSkeleton";
import AppBreadCrumb from "../AppBreadCrumb";

function CategoryPageSkeleton({ persianTitle, link, slug }) {
  return (
    <div className="flex-center relative w-full">
      <div className="responsive__wrapper flex flex-col gap-1">
        <AppBreadCrumb
          destinations={[
            { title: persianTitle, link: link },
            { title: decodeURI(slug).replaceAll("-", " "), link: "" },
          ]}
        />
        <div
          id="category-wrapper"
          className={`grid grid-cols-10 gap-2 pb-10 pt-6`}
        >
          {<AccordionSkeletonSection />}
          <div
            id="category-products-section-wrapper"
            className={`col-span-10 flex flex-col py-0 lg:col-span-7 lg:px-0 xl:col-span-8 xl:px-0`}
          >
            {<SortSection />}
            <ProductsSkeletonSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPageSkeleton;
