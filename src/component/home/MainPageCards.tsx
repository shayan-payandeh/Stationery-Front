import ViewButton from "@/common/ViewButton";
import { cards } from "@/constant/mainPageCards";
import { routes } from "@/constant/routes";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import CategoryImage from "../../../public/stationery-category.png";
import ScrollFade from "../animate/ScrollFade";

function MainPageCards() {
  const mutualClass = `
    [&>*:not(:first-child)]:relative [&>*:not(:first-child)]:col-span-1 [&>*:not(:first-child)]:flex [&>*:not(:first-child)]:flex-col [&>*:not(:first-child)]:min-h-[90px] [&>*:not(:first-child)]:gap-[2px] [&>*:not(:first-child)]:rounded-md [&>*:not(:first-child)]:px-2  [&>*:not(:first-child)]:sm:min-h-[130px] [&>*:not(:first-child)]:py-[2px] [&>*:not(:first-child)]:md:py-5 [&>*:not(:first-child)]:lg:px-4 
  `;

  return (
    <div
      id="cards-wrapper"
      className="flex justify-center px-2 pb-12 pt-2 lg:px-4"
    >
      <div
        className={`${mutualClass} grid w-full max-w-[500px] grid-cols-2 gap-2 md:max-w-[650px] md:grid-cols-3 lg:max-w-[900px] xl:max-w-[980px] [&_h1]:font-mikhak`}
      >
        <ScrollFade
          side="left"
          id="category-card-wrapper"
          className="col-span-1 row-start-1 row-end-3 grid place-items-center gap-5 rounded-md px-2 py-5 md:h-[320px]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #63b0eb, #529dd7, #418ac4, #2f77b1, #1a659e)",
          }}
        >
          <h1 className="text-[.85rem] font-semibold text-light-100 sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.3rem] xl:text-[1.35rem]">
            دسته بندی محصولات
          </h1>
          <Link href={routes.category}>
            <button className="flex items-center justify-center gap-[3px] rounded-full !bg-gray-600 px-[5px] py-[5px] text-[7.5px] text-light-100 sm:text-[9.5px] lg:text-[11px]">
              <h4 className="mr-1">مشاهده</h4>
              <IoIosArrowBack className="text-xs text-primary-500 md:text-[13px] lg:text-sm" />
            </button>
          </Link>
          <img src={CategoryImage.src} alt={CategoryImage.src} />
        </ScrollFade>

        {cards.map((item) => (
          <ScrollFade
            key={item.id}
            side="right"
            style={{ backgroundImage: item.bgImage }}
          >
            <div className="py-2">
              <h1 className="text-[.7rem] font-medium text-light-100 sm:text-[1rem] md:text-[1.2rem] lg:text-[1.3rem] xl:text-[1.35rem]">
                {item.title}
              </h1>
            </div>
            <div>
              <Link href={item.link}>
                <ViewButton />
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 mb-2 ml-2 h-10 w-10 sm:h-14 sm:w-14 lg:mb-2 lg:ml-3 lg:h-[65px] lg:w-[65px] xl:h-[75px] xl:w-[75px]">
              {item.icon}
            </div>
          </ScrollFade>
        ))}
      </div>
    </div>
  );
}

export default MainPageCards;
