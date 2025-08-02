"use client";
import Card from "@/component/Card";
import { IProductsGet } from "@/interface/products";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";
import ScrollBlur from "./animate/ScrollBlur";

function ProductsSlider({
  productsToShow,
}: {
  productsToShow: IProductsGet[];
}) {
  const SlickButtonFix = (props: {
    children: JSX.Element;
    slidecount?: number;
    currentslide?: number;
  }) => {
    const { children, ...others } = props;
    return <span {...others}>{children}</span>;
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <SlickButtonFix>
        <IoIosArrowBack size={30} />
      </SlickButtonFix>
    ),
    prevArrow: (
      <SlickButtonFix>
        <IoIosArrowForward size={25} />
      </SlickButtonFix>
    ),
  };

  return (
    <div className="w-full gap-4 px-4">
      <div className="w-full gap-4 px-4">
        <div id="product-card-wrapper" className="w-full">
          <div>
            <Slider
              {...settings}
              rtl={true}
              centerMode={false}
              responsive={[
                {
                  breakpoint: 580,
                  settings: { slidesToShow: 1, slidesToScroll: 1 },
                },
                {
                  breakpoint: 1024,
                  settings: { slidesToShow: 2, slidesToScroll: 1 },
                },
                {
                  breakpoint: 1280,
                  settings: { slidesToShow: 3, slidesToScroll: 1 },
                },
              ]}
            >
              {productsToShow!?.map((product) => (
                <ScrollBlur
                  htmlTag="div"
                  key={product._id}
                  id="brand-card"
                  className="col-span-2 grid w-full place-items-center justify-items-center gap-y-2 rounded-md sm:col-span-3 md:col-span-2 lg:col-span-3 xl:col-span-2"
                >
                  <Card product={product} />
                </ScrollBlur>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsSlider;
