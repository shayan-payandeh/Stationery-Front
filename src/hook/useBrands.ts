import brandService from "@/service/brandService";
import { useQuery } from "@tanstack/react-query";

export const useGetBrands = () =>
  useQuery({
    queryKey: ["get-brands"],
    queryFn: brandService.getBrands,
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useGetBrandById = (id: string) =>
  useQuery({
    queryKey: ["get-brand", id],
    queryFn: () => brandService.getBrandById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

// export const useAddBrand = () => {
//   const router = useRouter();
//   return useMutation({
//     mutationFn: brandService.addBrand,
//     onSuccess: (data) => {
//       toast.success(data.message);
//     //   router.push(adminRoutes.brandsRoute);
//     },
//     onError: (error: any) => {
//       toast.error(error.response?.data?.message || error.message);
//     },
//   });
// };
