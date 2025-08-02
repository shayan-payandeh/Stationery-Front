export interface IProductsGet {
  _id: string;
  name: string;
  category: {
    _id: string;
    title: string;
    persianTitle: string;
  };
  subCategory: {
    _id: string;
    title: string;
    persianTitle: string;
  };
  brand: {
    _id: string;
    title: string;
    persianTitle: string;
  };
  images: { src: string }[];
  discount: number;
  price: number;
  description: { title: string; persianTitle: string; value: string }[];
  count: number;
}

export interface IProductsPost {
  name: string;
  category: number;
  subCategory: string;
  brand: string;
  images: { src: string }[];
  discount: number;
  price: number;
  description: { title: string; persianTitle: string; value: string }[];
}
export interface IProduct {
  statusCode: number;
  data: {
    products: {
      docs: IProductsGet[];
      totalDocs: number;
      limit: number;
      totalPages: number;
      page: number;
      pagingCounter: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: null | number;
      nextPage: null | number;
    };
  };
}
