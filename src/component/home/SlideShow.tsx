"use client";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import slide1 from "../../../public/slideshow/slide_1.jpg";
import slide2 from "../../../public/slideshow/slide_2.jpg";
import slide3 from "../../../public/slideshow/slide_3.jpg";
import slide4 from "../../../public/slideshow/slide_4.jpg";
import slide5 from "../../../public/slideshow/slide_5.jpg";
import slide6 from "../../../public/slideshow/slide_6.jpg";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function SlideShow() {
  const images = [
    slide3.src,
    slide2.src,
    slide1.src,
    slide4.src,
    slide5.src,
    slide6.src,
  ];

  const mutualClass = `
    mx-auto rounded-full bg-gray-800 p-1 text-center text-[26px] text-white opacity-50 transition-all duration-200 ease-in-out hover:opacity-75
  `;

  const properties = {
    prevArrow: (
      <button className="flex justify-center">
        <IoIosArrowBack className={mutualClass} />
      </button>
    ),
    nextArrow: (
      <button className="flex justify-center">
        <IoIosArrowForward className={mutualClass} />
      </button>
    ),
  };

  return (
    <div id="slideshow-wrapper" className="px-2 py-12 lg:px-4">
      <div className="mx-auto max-w-[500px] md:max-w-[650px] lg:max-w-[900px] xl:max-w-[980px]">
        <Slide {...properties} indicators={true}>
          {images.map((image) => (
            <div key={image} className="each-slide-effect">
              <div
                className="flex-center h-[350px] bg-cover md:h-[400px] lg:h-[450px]"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default SlideShow;
