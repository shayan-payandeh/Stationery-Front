import { IApiResponse } from "@/interface/apiResponse";
import http from "./http";
import { ICategoryGet, ICategoryPost } from "@/interface/category";

class CategoryService {
  async getCategories() {
    return await http
      .get<IApiResponse<ICategoryGet>>("/category/list")
      .then(({ data }) => data.data);
  }

  async getCategoryById(id: string) {
    return await http
      .get<{
        statusCode: number;
        data: { category: ICategoryGet };
      }>(`/category/${id}`)
      .then(({ data }) => data.data);
  }

  async addCategory(data: ICategoryPost) {
    return await http
      .post<{
        statusCode: number;
        data: { message: string };
      }>("/admin/category/add", data)
      .then(({ data }) => data.data);
  }

  async updateCategory(id: string, data: ICategoryPost) {
    return await http
      .patch<{
        statusCode: number;
        data: { message: string };
      }>(`/admin/category/update/${id}`, data)
      .then(({ data }) => data.data);
  }

  async removeCategory(id: string) {
    return await http
      .delete(`/admin/category/remove/${id}`)
      .then(({ data }) => data.data);
  }
}
const categoryService = new CategoryService();
export default categoryService;
