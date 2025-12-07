import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../page";
import productService from "@/service/productService";
import http from "@/service/http";

jest.mock("@/service/productService");
jest.mock("@/service/http");
const MockAddToCartCard = ({ product }: any) => (
  <div data-testid="add-to-cart">{product.name}</div>
);
MockAddToCartCard.displayName = 'MockAddToCartCard';
jest.mock("../AddToCartCard", () => MockAddToCartCard);

const MockImageGallery = ({ images }: any) => (
  <div data-testid="image-gallery">{images.length} images</div>
);
MockImageGallery.displayName = 'MockImageGallery';
jest.mock("../ImageGallery", () => MockImageGallery);

const MockProductInformation = ({ product }: any) => (
  <div data-testid="product-info">{product.name}</div>
);
MockProductInformation.displayName = 'MockProductInformation';
jest.mock("../ProductInformation", () => MockProductInformation);

const MockCommentSection = () => (
  <div data-testid="comments">Comments</div>
);
MockCommentSection.displayName = 'MockCommentSection';
jest.mock("../CommentSection/page", () => MockCommentSection);

const MockProductsSlider = ({ productsToShow }: any) => (
  <div data-testid="related-products">{productsToShow.length} products</div>
);
MockProductsSlider.displayName = 'MockProductsSlider';
jest.mock("@/component/ProductsSlider", () => MockProductsSlider);

const mockProduct = {
  _id: "p1",
  name: "Test Product",
  category: { persianTitle: "دسته تست" },
  images: [{ src: "image1.jpg" }, { src: "image2.jpg" }],
  description: { persianTitle: "توضیحات تست" },
  brand: "برند تست",
  price: 100000,
  stock: 5,
};

describe("Product Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product page with all components", async () => {
    (productService.getServerProductById as jest.Mock).mockResolvedValue(
      mockProduct,
    );
    (http.get as jest.Mock).mockResolvedValue({
      data: { data: { products: { docs: [] } } },
    });

    const component = await Page({ params: { id: "p1" }, searchParams: {} });
    render(component);

    expect(screen.getByTestId("add-to-cart")).toHaveTextContent("Test Product");
    expect(screen.getByTestId("image-gallery")).toHaveTextContent("2 images");
    expect(screen.getByTestId("product-info")).toHaveTextContent(
      "Test Product",
    );
    expect(screen.getByTestId("comments")).toBeInTheDocument();
  });

  it("renders error fallback when product not found", async () => {
    (productService.getServerProductById as jest.Mock).mockResolvedValue(null);

    const component = await Page({
      params: { id: "invalid" },
      searchParams: {},
    });
    render(component);

    expect(screen.getByText("خطا در بارگذاری محصول")).toBeInTheDocument();
  });

  it("renders related products when available", async () => {
    const relatedProducts = Array(6)
      .fill(null)
      .map((_, i) => ({ _id: `p${i}`, name: `Product ${i}` }));

    (productService.getServerProductById as jest.Mock).mockResolvedValue(
      mockProduct,
    );
    (http.get as jest.Mock).mockResolvedValue({
      data: { data: { products: { docs: relatedProducts } } },
    });

    const component = await Page({ params: { id: "p1" }, searchParams: {} });
    render(component);

    expect(screen.getByText("محصولات مرتبط")).toBeInTheDocument();
    expect(screen.getByTestId("related-products")).toBeInTheDocument();
  });
});
