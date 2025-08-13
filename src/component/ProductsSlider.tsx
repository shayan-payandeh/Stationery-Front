"use client";
import Card from "@/component/Card";
import { IProductsGet } from "@/interface/products";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function ProductsSlider({
  productsToShow,
}: {
  productsToShow: IProductsGet[];
}) {
  return (
    <div className="relative overflow-x-hidden px-4">
      <Swiper
        className=""
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          960: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {productsToShow?.map((product) => (
          <SwiperSlide key={product._id} className="!flex justify-center gap-2">
            <Card product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* دکمه‌های سفارشی */}
      <button className="custom-prev absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-sm text-light-100 md:right-0">
        <IoIosArrowForward size={16} />
      </button>
      <button className="custom-next absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-sm text-light-100 md:left-0">
        <IoIosArrowBack size={16} />
      </button>
    </div>
  );
}

export default ProductsSlider;
