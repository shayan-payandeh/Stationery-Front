import { ICategoryPost } from "@/interface/category";
import categoryService from "@/service/categoryService";
import { adminRoutes } from "@/utils/routes";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useGetCategories = () =>
  useQuery({
    queryKey: ["get-categories"],
    queryFn: categoryService.getCategories,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetCategoryById = (id: string) =>
  useQuery({
    queryKey: ["get-category", id],
    queryFn: () => categoryService.getCategoryById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddCategory = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: categoryService.addCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push(adminRoutes.categoriesRoute);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

export const useUpdateCategory = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ICategoryPost }) =>
      categoryService.updateCategory(id, data),
    onSuccess: (data) => {
      toast.success(data.message);
      router.push(adminRoutes.categoriesRoute);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

export const useRemoveCategory = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: categoryService.removeCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};
