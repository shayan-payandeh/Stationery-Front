import productService from "@/service/productService";
import { render, screen } from "@testing-library/react";
import Page from "./page";

jest.mock("@/service/productService");
const MockPageClient = ({ initialProducts }: any) => (
  <div data-testid="page-client">{JSON.stringify(initialProducts)}</div>
);
MockPageClient.displayName = 'MockPageClient';
jest.mock("./PageClient", () => MockPageClient);

const MockErrorFallback = ({ message }: any) => (
  <div data-testid="error-fallback">{message}</div>
);
MockErrorFallback.displayName = 'MockErrorFallback';
jest.mock("@/component/ErrorFallback", () => MockErrorFallback);

describe("Products Page", () => {
  const mockProductService = productService.getServerProducts as jest.Mock;
  const renderComponent = async (searchParams: any) => {
    const component = await Page(searchParams);
    render(component);
  };

  it("renders PageClient with products data", async () => {
    const mockData = { products: [], total: 0 };
    mockProductService.mockResolvedValue(mockData);
    await renderComponent({ searchParams: { page: "1" } });

    expect(await screen.findByTestId("page-client")).toBeInTheDocument();
    expect(mockProductService).toHaveBeenCalledWith("page=1");
  });

  it("renders ErrorFallback on service error", async () => {
    mockProductService.mockRejectedValue(new Error());
    await renderComponent({ searchParams: {} });

    expect(await screen.findByTestId("error-fallback")).toBeInTheDocument();
    expect(screen.getByText(/خطا/i)).toBeInTheDocument();
  });
});
