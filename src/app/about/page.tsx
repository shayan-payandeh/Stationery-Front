import ScrollFade from "@/component/animate/ScrollFade";
import AppBreadCrumb from "@/component/AppBreadCrumb";
import { aboutTexts } from "@/constant/aboutTexts";
import { appRoutes } from "@/constant/routes";

async function Page() {
  const { link, persianTitle } = appRoutes.about;
  return (
    <div id="category-page-wrapper" className="flex-center">
      <div className="responsive__wrapper flex flex-col gap-7">
        <AppBreadCrumb destinations={[{ link: link, title: persianTitle }]} />
        <div
          id="search-wrapper"
          className="flex flex-col gap-y-6 rounded-md p-5 shadow-container lg:px-9 lg:py-5"
        >
          <ScrollFade side="down">
            <h1 className="text-[.95rem] font-semibold text-dark-700 lg:text-[1.15rem]">
              <span className="text-dark-500">{aboutTexts.header}</span>
            </h1>
          </ScrollFade>
          <div
            id="context"
            className="flex w-full flex-col gap-x-24 gap-y-12 lg:flex-row"
          >
            <ScrollFade side="up" className="flex flex-col gap-2">
              <h1 className="font-mikhak text-[1.1rem] text-primary-500">
                {aboutTexts.title}
              </h1>
              <p className="leading-9">{aboutTexts.context}</p>
            </ScrollFade>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
