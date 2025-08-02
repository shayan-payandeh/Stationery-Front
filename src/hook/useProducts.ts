import productService from "@/service/productService";
import { QueryType } from "@/type/query";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (query: QueryType) =>
  useQuery({
    queryKey: ["get-products", query],
    queryFn: () => productService.getProducts(query),
    retry: false,
    refetchOnWindowFocus: true,
  });

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
