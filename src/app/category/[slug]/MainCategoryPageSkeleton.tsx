import AppBreadCrumb from "@/component/AppBreadCrumb";
import MainCategoryProductsSection from "@/component/skeleton/MainCategoryProductsSection";
import SwiperSectionSkeleton from "@/component/skeleton/SwiperSectionSkeleton";
import React from "react";

function MainCategoryPageSkeleton({ persianTitle, link, slug }) {
  return (
    <div className="flex-center w-full">
      <div className="responsive__wrapper flex flex-col justify-center gap-1">
        <AppBreadCrumb
          destinations={[
            { title: persianTitle, link: link },
            { title: decodeURI(slug).replaceAll("-", " "), link: "" },
          ]}
        />
        <div
          id="category-wrapper"
          className={`grid w-full grid-cols-10 gap-2 pb-10 pt-6 lg:grid-cols-12 xl:grid-cols-10`}
        >
          <div
            id="category-products-section-wrapper"
            className={`col-span-10 flex flex-col px-6 py-0 md:px-0 lg:col-span-12 xl:col-span-10`}
          >
            <div className="flex flex-col justify-center gap-10">
              {/* {theCategory && <SwiperSection />} */}
              {/* swiwper skeleton */}
              <SwiperSectionSkeleton />
              <div
                id="products-wrapper"
                className={`flex flex-col items-center gap-4`}
              >
                {/* <CategoryTitle Icon={Icon!} theCategory={theCategory!} /> */}
                {/* title skeleton */}

                <MainCategoryProductsSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCategoryPageSkeleton;
