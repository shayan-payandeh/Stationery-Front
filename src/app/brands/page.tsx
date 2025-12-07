import AppBreadCrumb from "@/component/AppBreadCrumb";
import { appRoutes } from "@/constant/routes";
import BrandsClient from "./BrandsClient";
import brandService from "@/service/brandService";
import ErrorFallback from "@/component/ErrorFallback";

export default async function BrandsPage() {
  try {
    const initialBrands = await brandService.getServerBrands();
    const { link, persianTitle } = appRoutes.brands;
    return (
      <div id="brand-page-wrapper" className="flex-center w-full">
        <div className="responsive__wrapper flex flex-col justify-center gap-4">
          <AppBreadCrumb destinations={[{ link: link, title: persianTitle }]} />

          {/* Client Component handles search and filtering */}
          <BrandsClient initialBrands={initialBrands || []} />
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorFallback message="خطا در بارگذاری برندها" fullScreen />;
  }
}
