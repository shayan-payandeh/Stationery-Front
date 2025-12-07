import AppBreadCrumb from "@/component/AppBreadCrumb";
import { appRoutes } from "@/constant/routes";
import ErrorFallback from "@/component/ErrorFallback";
import subCategoryService from "@/service/subCategoryService";
import categoryService from "@/service/categoryService";
import SubCategoriesClient from "./SubCategoriesClient";

// Flow:
// Build time: Server fetches ALL subcategories and categories
// Build time: Server renders both Server + Client components to static HTML
// Build time: Creates RSC Payload with data and component references
// User visits: Gets complete pre-rendered HTML (instantly visible)
// Browser: JavaScript hydrates client components (adds interactivity)
// Client: Handles search filtering locally (no server requests)

// Architecture:
// Build renders: Complete HTML for all components + RSC Payload
// Hydration: Attaches event listeners to existing HTML
// Client handles: Search input, local filtering, UI updates

export default async function SubcategoriesPage() {
  const { link, persianTitle } = appRoutes.subcategories;
  const [initialSubCategoriesResult, initialCategoriesResult] =
    await Promise.all([
      subCategoryService.getServerSubCategories(),
      categoryService.getServerCategories(),
    ]);

  if (!initialCategoriesResult.error && !initialSubCategoriesResult.error) {
    return (
      <div id="categoryPpage-wrapper" className="flex-center w-full">
        <div className="responsive__wrapper flex flex-col justify-center gap-5 text-center">
          <AppBreadCrumb destinations={[{ title: persianTitle, link: link }]} />

          <SubCategoriesClient
            initialSubCategories={initialSubCategoriesResult.data || []}
            initialCategories={initialCategoriesResult.data || []}
          />
        </div>
      </div>
    );
  }
  return <ErrorFallback message="خطا در بارگذاری زیر دسته ها" fullScreen />;
}
