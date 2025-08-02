import { IApiResponse } from "@/interface/apiResponse";
import http from "./http";
import { ISubCategoryGet, ISubCategoryPost } from "@/interface/subCategory";

class SubCategoryService {
  async getSubCategories() {
    return await http
      .get<IApiResponse<ISubCategoryGet>>("/subcategory/list")
      .then(({ data }) => data.data);
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

const x = new SubCategoryService();

export default x;
