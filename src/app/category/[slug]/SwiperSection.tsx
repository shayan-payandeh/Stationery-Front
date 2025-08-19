"use client";
import { ISubCategoryGet } from "@/interface/subCategory";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import SubCategoryCard from "../../subcategories/SubCategoryCard";
import { ICategoryGet } from "@/interface/category";

type SwiperSectionProps = {
  theSubCategory: ISubCategoryGet[];
  categories: ICategoryGet[];
};

function SwiperSection({ theSubCategory, categories }: SwiperSectionProps) {
  const swiperRef = useRef<SwiperCore>();

  const limitDesktopLG = 6;
  const limitDesktopSM = 5;
  const limitTablet = 4;
  const limitMobileLG = 3;
  const limitMobileSM = 2;
  return (
    <>
      <div
        id="subCategory-wrapper"
        className="bg-light-100 px-6 py-5 shadow-container"
      >
        <h2 className="text-listItem font-semibold text-dark-500">
          زیر دسته ها :
        </h2>
        <div className="relative">
          <button
            className={`absolute right-0 top-[50%] z-50 translate-y-[-50%] rounded-badge bg-[#e4e4e4] p-1 ${theSubCategory!?.length > limitDesktopLG ? "desktopLg:block" : "desktopLg:hidden"} ${theSubCategory!?.length > limitDesktopSM ? "desktopSM:block" : "desktopSM:hidden"} ${theSubCategory!?.length > limitTablet ? "tablet:block" : "tablet:hidden"} ${theSubCategory!?.length > limitMobileLG ? "mobileLG:block" : "mobileLG:hidden"} ${theSubCategory!?.length > limitMobileSM ? "mobileSM:block" : "mobileSM:hidden"}`}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <IoIosArrowForward size={20} className="text-primary-500" />
          </button>
          <div className="mt-5">
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={1}
              spaceBetween={6}
              breakpoints={{
                430: {
                  slidesPerView: limitMobileSM,
                  spaceBetween: 1,
                },
                590: {
                  slidesPerView: limitMobileLG,
                  spaceBetween: 1,
                },
                1024: {
                  slidesPerView: limitTablet,
                  spaceBetween: 1,
                },
                1280: {
                  slidesPerView: limitDesktopSM,
                  spaceBetween: 1,
                },
                1450: {
                  slidesPerView: limitDesktopLG,
                  spaceBetween: 1,
                },
              }}
              //   modules={[Navigation]}
              className="mySwiper"
            >
              {theSubCategory?.map((subCategory) => (
                <SwiperSlide key={subCategory._id}>
                  <SubCategoryCard
                    subCategory={subCategory}
                    categories={categories}
                    classes="mx-auto grid w-[150px] place-items-center justify-items-center gap-y-2 rounded-md bg-light-200 px-2 py-3"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            className={`absolute left-0 top-[50%] z-50 translate-y-[-50%] rounded-badge bg-[#e4e4e4] p-1 ${theSubCategory!?.length > limitDesktopLG ? "desktopLg:block" : "desktopLg:hidden"} ${theSubCategory!?.length > limitDesktopSM ? "desktopSM:block" : "desktopSM:hidden"} ${theSubCategory!?.length > limitTablet ? "tablet:block" : "tablet:hidden"} ${theSubCategory!?.length > limitMobileLG ? "mobileLG:block" : "mobileLG:hidden"} ${theSubCategory!?.length > limitMobileSM ? "mobileSM:block" : "mobileSM:hidden"}`}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <IoIosArrowBack size={20} className="text-primary-500" />
          </button>
        </div>
      </div>
    </>
  );
}

export default SwiperSection;
