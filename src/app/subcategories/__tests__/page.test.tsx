import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../page";
import categoryService from "@/service/categoryService";
import subCategoryService from "@/service/subCategoryService";

jest.mock("@/service/subCategoryService");
jest.mock("@/service/categoryService");
const MockSubCategoriesClient = ({ initialSubCategories, initialCategories }: any) => (
  <div data-testid="subcategoriesClient">
    {initialSubCategories.length} subcategories, {initialCategories.length}{" "}
    categories
  </div>
);
MockSubCategoriesClient.displayName = 'MockSubCategoriesClient';
jest.mock("../SubCategoriesClient", () => MockSubCategoriesClient);

const mockSubCategories = [{ _id: "1", title: "Sub1" }];
const mockCategories = [{ _id: "1", title: "Cat1" }];

describe("Subcategories Page", () => {
  const mockSubCategoriesService =
    subCategoryService.getServerSubCategories as jest.Mock;
  const mockCategoriesService =
    categoryService.getServerCategories as jest.Mock;

  const renderPage = async () => {
    const component = await Page();
    render(component);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders page with subcategories and categories", async () => {
    mockSubCategoriesService.mockResolvedValue(mockSubCategories);
    mockCategoriesService.mockResolvedValue(mockCategories);

    await renderPage();
    expect(screen.getByTestId("subcategoriesClient")).toHaveTextContent(
      "1 subcategories, 1 categories",
    );
  });

  it("renders error fallback when services fail", async () => {
    mockSubCategoriesService.mockRejectedValue(new Error("Service error"));
    mockCategoriesService.mockRejectedValue(new Error("Service error"));

    await renderPage();
    expect(screen.getByText(/خطا/i)).toBeInTheDocument();
  });
});
