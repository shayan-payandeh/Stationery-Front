import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../page";
import brandService from "@/service/brandService";

jest.mock("@/service/brandService");
const MockBrandsClient = ({ initialBrands }: any) => (
  <div data-testid="brandsClient">{initialBrands.length}</div>
);
MockBrandsClient.displayName = 'MockBrandsClient';
jest.mock("../BrandsClient", () => MockBrandsClient);

const brandsMock = [
  {
    _id: "1",
    title: "the title",
    productsCount: 10,
    persianTitle: "عنوان",
    logo: "/image",
    usecase: ["1", "2"],
  },
];

describe("Brand Page", () => {
  const mockService = brandService.getServerBrands as jest.Mock;
  
  const renderPage = async () => {
    const component = await Page();
    render(component);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render brand page with all components", async () => {
    mockService.mockResolvedValue(brandsMock);
    await renderPage();
    expect(screen.getByTestId("brandsClient")).toHaveTextContent("1");
  });

  it("renders error fallback when service fails", async () => {
    mockService.mockRejectedValue(new Error("Service error"));
    await renderPage();
    expect(screen.getByText("خطا در بارگذاری برندها")).toBeInTheDocument();
  });
});
