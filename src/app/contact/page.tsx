import AppBreadCrumb from "@/component/AppBreadCrumb";
import { appRoutes } from "@/constant/routes";
import ContactWays from "./ContactWays";
import Form from "./Form";

function Page() {
  const { link, persianTitle } = appRoutes.contact;
  return (
    <div id="contact-page-wrapper" className="flex-center">
      <div className="responsive__wrapper flex flex-col gap-7">
        <AppBreadCrumb destinations={[{ link: link, title: persianTitle }]} />
        <div
          id="search-wrapper"
          className="flex flex-col gap-y-12 rounded-md p-5 shadow-container lg:px-9 lg:py-5"
        >
          <h1 className="text-[.95rem] font-semibold text-dark-700 lg:text-[1.15rem]">
            <span className="text-dark-500">ارتباط با شایان نگارش</span>
          </h1>
          <div className="flex w-full flex-col gap-x-24 gap-y-12 font-mikhak font-light lg:flex-row">
            <Form />
            <ContactWays />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
