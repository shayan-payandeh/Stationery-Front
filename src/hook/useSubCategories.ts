import subCategoryService from "@/service/subCategoryService";
import { useQuery } from "@tanstack/react-query";

export const useGetSubCategories = () =>
  useQuery({
    queryKey: ["get-subCategories"],
    queryFn: subCategoryService.getSubCategories,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetSubCategoryById = (id: string) =>
  useQuery({
    queryKey: ["get-subCategory", id],
    queryFn: () => subCategoryService.getSubCategoryById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
