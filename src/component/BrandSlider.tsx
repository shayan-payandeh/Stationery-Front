"use client";
import { routes } from "@/constant/routes";
import { IBrandsGet } from "@/interface/brands";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import Slider from "react-slick";
import ScrollBlur from "./animate/ScrollBlur";

function BrandSlider({ BrandsToShow }: { BrandsToShow: IBrandsGet[] }) {
  // const SlickButtonFix = (props: {
  //   children: JSX.Element;
  //   slidecount?: number;
  //   currentslide?: number;
  // }) => {
  //   const { children, ...others } = props;
  //   return <span>{children}</span>;
  // };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="w-1/6 rounded-full bg-black p-2 text-white transition hover:bg-gray-800"
      >
        <IoIosArrowBack size={25} />
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="w-1/6 rounded-full bg-black p-2 text-white transition"
      >
        <IoIosArrowBack size={25} />
      </div>
    );
  };

  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="gap-4 px-4 lg:hidden">
      <div id="product-card-wrapper" className="w-full">
        <div className="">
          <Slider
            {...settings}
            rtl={true}
            centerMode={false}
            responsive={[
              {
                breakpoint: 520,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: true,
                  initialSlide: 9,
                },
              },
              {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 1, arrows: true },
              },
              {
                breakpoint: 1024,
                settings: { slidesToShow: 3, slidesToScroll: 1, arrows: true },
              },
              {
                breakpoint: 1280,
                settings: { slidesToShow: 4, slidesToScroll: 1, arrows: false },
              },
            ]}
          >
            {BrandsToShow!?.map((brand) => (
              <ScrollBlur
                htmlTag="div"
                key={brand._id}
                id="brand-card"
                className="col-span-2 grid w-full place-items-center justify-items-center gap-y-2 rounded-md bg-light-100 p-4 sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-2"
              >
                <Link href={`${routes.products}?brand=${brand.title}`}>
                  <div
                    id="image-wrapper"
                    className="transition-smooth flex-center h-[117px] w-[117px] rounded-full bg-light-100 p-2 shadow-container hover:scale-105"
                  >
                    <img
                      alt={brand.title}
                      src={brand.logo}
                      className="rounded-full border-2 border-primary-500 p-1 shadow-container"
                    />
                  </div>
                </Link>
                <Link href={`${routes.products}?brand=${brand.title}`}>
                  <div
                    id="title-wrapper"
                    className="text-[15px] font-semibold text-dark-500"
                  >
                    {brand.persianTitle}{" "}
                    <span className="text-[.75rem] text-primary-500">
                      ({toPersianNumbers(brand.productsCount)} محصول)
                    </span>
                  </div>
                </Link>
              </ScrollBlur>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default BrandSlider;
