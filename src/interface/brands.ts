export interface IBrands {
  _id: string;
  title: string;
  productsCount: number;
  persianTitle: string;
  logo: string;
  usecase: string[];
}

export interface IBrandsGet {
  _id: string;
  title: string;
  productsCount: number;
  persianTitle: string;
  logo: string;
  usecase: string[];
}

export interface IBrandsPost {
  title: string;
  productsCount: number;
  persianTitle: string;
  logo: string;
  usecase: string[];
}
