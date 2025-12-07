import productService from "@/service/productService";
import { QueryType } from "@/type/query";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (
  query: string,
  options?: { initialData?: any },
) => {
  const queryObj = query; // چون server عملاً string می‌فرستد

  return useQuery({
    queryKey: ["get-products", query],
    queryFn: () => productService.getProducts(queryObj),
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev,
    ...options,
  });
};

// export const useGetProducts = (
//   query: string,
//   options?: {
//     initialData?: any; // داده اولیه از سرور (SSR/SSG)
//   },
// ) =>
//   useQuery({
//     queryKey: ["get-products", query],
//     queryFn: () => productService.getServerProducts(query),
//     retry: false,
//     refetchOnWindowFocus: false,
//     placeholderData: (prev) => prev, // داده قبلی رو نگه می‌داره
//     ...options, // initialData و config : اجازه می‌دهد از بیرون بیاید”
//   });

export const useGetProductsBySlug = (
  slug: string,
  query: QueryType,
  enabled: boolean = true,
) =>
  useQuery({
    queryKey: ["get-productBySlug", query],
    queryFn: () => productService.getProductsBySlug(slug, query),
    retry: false,
    refetchOnWindowFocus: true,
    enabled: enabled,
  });

export const useGetProductById = (id: string) =>
  useQuery({
    queryKey: ["get-producById", id],
    queryFn: () => productService.getProductById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
