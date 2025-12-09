import AppBreadCrumb from "@/component/AppBreadCrumb";
import { faqTexts } from "@/constant/faqTexts";
import { appRoutes } from "@/constant/routes";
import { toPersianNumbers } from "@/utils/toPersianNumbers";

async function Page() {
  const mutualClass = `[&>*]:flex [&>*]:flex-col [&>*]:gap-2 [&>*]:p-8 [&>*]:shadow-container`;
  const mutualClassTwo = `[&_h1]:font-mikhak [&_h1]:text-primary-500`;
  const mutualClassThree = `[&_p]:leading-9`;
  const { link, persianTitle } = appRoutes.faq;

  return (
    <div id="category-page-wrapper" className="flex-center">
      <div className="responsive__wrapper flex flex-col gap-5">
        <AppBreadCrumb destinations={[{ link: link, title: persianTitle }]} />

        <div id="search-wrapper" className="flex flex-col gap-y-12 rounded-md">
          <div
            id="context"
            className={`flex w-full flex-col gap-y-3 ${mutualClass} ${mutualClassTwo} ${mutualClassThree}`}
          >
            <div>
              <h1>{faqTexts.titleOne}</h1>
              <p>{faqTexts.contextOne}</p>
            </div>
            <div>
              <h1>{faqTexts.titleTwo}</h1>
              <p>{faqTexts.contextTwo}</p>
            </div>
            <div>
              <h1>{faqTexts.titleThree}</h1>
              <p>{faqTexts.contextThree.sectionMain}</p>
              <p>{toPersianNumbers(faqTexts.contextThree.sectionOne)}</p>
              <p>{toPersianNumbers(faqTexts.contextThree.sectionTwo)}</p>
              <p>{toPersianNumbers(faqTexts.contextThree.sectionThree)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
