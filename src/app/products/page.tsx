import productService from "@/service/productService";
import PageClient from "./PageClient";
import ErrorFallback from "@/component/ErrorFallback";

export default async function Page({ searchParams }: { searchParams: any }) {
  const { data, error } = await productService.getServerProducts(searchParams);

  if (error)
    return <ErrorFallback message="خطا در بازگذاری محصولات" fullScreen />;
  return <PageClient initialProducts={data} />;
}

// Summary
// General Concepts:

// searchParams + { cache: "force-cache" } = Dynamic page with cached API calls
// searchParams always makes pages dynamic (rendered per request, not at build)
// { cache: "force-cache" } only affects individual fetch requests, not page rendering
// This combination is good for filter/search pages where data doesn't change often

// Your Product Page Example:

// Server Component (page.tsx): Fetches data based on searchParams, passes to Client Component
// Client Component (PageClient.tsx): Receives initialProducts as props, uses for React Query initialData
// Result: User gets fully rendered HTML with actual product data immediately
// Server renders: Static content + product data
// Client handles: Clicks, navigation, state changes, React Query refetching
// Flow:
// User visits /products?page=2
// Server fetches products for page 2
// Server renders complete HTML with product cards
// Browser shows content instantly (no loading)
// React hydrates and makes it interactive

// Benefits: Fast first load + SEO-friendly + interactive + cached API responses
