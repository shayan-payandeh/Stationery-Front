import { IProduct } from "@/interface/products";
import { QueryType } from "@/type/query";
import http from "./http";
import { getValidatedBaseUrl } from "@/utils/baseUrl";

class ProductService {
  async getProducts(query: QueryType) {
    const products = await http
      .get<IProduct>(`/product/list?${query}`)
      .then(({ data }) => data.data);

    return products;
  }

  async getServerProducts(searchParams: Record<string, string>) {
    const queryString = new URLSearchParams(searchParams).toString();
    const baseUrl = getValidatedBaseUrl();
    try {
      const res = await fetch(`${baseUrl}/product/list?${queryString}`, {
        cache: "force-cache", // مناسب SSG
      });

      if (!res.ok) {
        throw new Error("خطا در بارگذاری محصولات");
      }

      const data = await res.json();
      return { data: data.data, error: false };
    } catch (error) {
      return { data: {}, error: true };
    }
  }

  async getProductsBySlug(slug: string, query: QueryType) {
    return await http
      .get<IProduct>(`/product/${slug}?${query}`)
      .then(({ data }) => data.data.products);
  }

  async getServerProductsBySlug(slug: string, query: QueryType) {
    try {
      const res = await fetch(
        `${getValidatedBaseUrl()}/product/${slug}?${query}`,
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }

      const data = await res.json();
      return { data: data.data.products, error: false };
    } catch (error) {
      return { data: {}, error: true };
    }
  }

  async getProductById(id: string) {
    return await http
      .get(`/product/product/${id}`)
      .then(({ data }) => data.data);
  }

  async getServerProductById(id: string) {
    const baseUrl = getValidatedBaseUrl();
    try {
      const res = await fetch(
        `${baseUrl}/product/product/${id}`,
        { cache: "force-cache" }, // برای SSG
      );
      // ❌ اگر status غیر 2xx باشه
      if (!res.ok) {
        console.error(`❌ Fetch failed: ${res.status} - ${res.statusText}`);
        return null;
      }

      const json = await res.json();

      const product = json?.data?.product ?? null;

      // ⚠️ هندل کردن حالت محصول null
      if (!product) {
        console.warn(`⚠️ Product not found for id: ${id}`);
        return null;
      }

      return product;
    } catch (error) {
      console.error("❌ Error fetching product:", error);
      return null;
    }
  }
}

const productService = new ProductService();

export default productService;
