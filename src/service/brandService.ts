import { IApiResponse } from "@/interface/apiResponse";
import http from "./http";
import { IBrandsGet, IBrandsPost } from "@/interface/brands";

class BrandService {
  async getBrands() {
    return await http
      .get<IApiResponse<IBrandsGet>>("/brand/list")
      .then(({ data }) => data.data);
  }

  async getBrandById(id: string) {
    return await http
      .get<{
        statusCode: number;
        data: { category: IBrandsGet };
      }>(`/brand/${id}`)
      .then(({ data }) => data.data);
  }

  async addBrand(data: IBrandsPost) {
    return await http
      .post<{
        statusCode: number;
        data: { message: string };
      }>("/admin/brand/add", data)
      .then(({ data }) => data.data);
  }

  async updateBrand(id: string, data: IBrandsPost) {
    return await http
      .patch<{
        statusCode: number;
        data: { message: string };
      }>(`/admin/brand/update/${id}`, data)
      .then(({ data }) => data.data);
  }

  async removeBrand(id: string) {
    return await http
      .delete(`/admin/brand/remove/${id}`)
      .then(({ data }) => data.data);
  }
}
const brandService = new BrandService();

export default brandService;
