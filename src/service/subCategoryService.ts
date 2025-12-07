import { IApiResponse } from "@/interface/apiResponse";
import http from "./http";
import { ISubCategoryGet, ISubCategoryPost } from "@/interface/subCategory";

class SubCategoryService {
  async getSubCategories() {
    return await http
      .get<IApiResponse<ISubCategoryGet>>("/subcategory/list")
      .then(({ data }) => data.data);
  }

  async getServerSubCategories() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subcategory/list`,
      );
      if (!res.ok) throw new Error("Faied to fetch subcategories");
      const data = await res.json();

      return { data: data.data.subCategories, error: false };
    } catch (error) {
      return { data: [], error: true };
    }
  }

  async getSubCategoryById(id: string) {
    return await http
      .get<{
        statusCode: number;
        data: { category: ISubCategoryGet };
      }>(`/subcategory/${id}`)
      .then(({ data }) => data.data);
  }

  async addSubCategory(data: ISubCategoryPost) {
    return await http
      .post<{
        statusCode: number;
        data: { message: string };
      }>("/admin/subcategory/add", data)
      .then(({ data }) => data.data);
  }

  async updateSubCategory(id: string, data: ISubCategoryPost) {
    return await http
      .patch<{
        statusCode: number;
        data: { message: string };
      }>(`/admin/subcategory/update/${id}`, data)
      .then(({ data }) => data.data);
  }

  async removeSubCategory(id: string) {
    return await http
      .delete(`/admin/subcategory/remove/${id}`)
      .then(({ data }) => data.data);
  }
}

const subCategoryService = new SubCategoryService();

export default subCategoryService;
