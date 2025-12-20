import { IApiResponse } from "@/interface/apiResponse";
import http from "./http";
import { ICategoryGet, ICategoryPost } from "@/interface/category";
import { getValidatedBaseUrl } from "@/utils/baseUrl";

class CategoryService {
  async getCategories() {
    return await http
      .get<IApiResponse<ICategoryGet>>("/category/list")
      .then(({ data }) => data.data);
  }

  async getServerCategories() {
    const baseUrl = getValidatedBaseUrl();

    try {
      const res = await fetch(`${baseUrl}/category/list`);
      if (!res.ok) throw new Error("Faied to fetch categories");
      const data = await res.json();
      return { data: data.data.categories, error: false };
    } catch (error) {
      return { data: [], error: true };
    }
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
