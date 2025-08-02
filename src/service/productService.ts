import { IProduct } from "@/interface/products";
import { QueryType } from "@/type/query";
import http from "./http";

class ProductService {
  async getProducts(query: QueryType) {
    return await http
      .get<IProduct>(`/product/list?${query}`)
      .then(({ data }) => data.data);
  }
  async getProductsBySlug(slug: string, query: QueryType) {
    return await http
      .get<IProduct>(`/product/${slug}?${query}`)
      .then(({ data }) => data.data.products);
  }

  async getProductById(id: string) {
    return await http
      .get(`/product/product/${id}`)
      .then(({ data }) => data.data);
  }
}

const productSerice = new ProductService();

export default productSerice;
