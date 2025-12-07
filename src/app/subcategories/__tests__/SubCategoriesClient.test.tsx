import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubCategoriesClient from "../SubCategoriesClient";
import { toPersianNumbers } from "@/utils/toPersianNumbers";

jest.mock("@/utils/toPersianNumbers", () => ({
  toPersianNumbers: jest.fn((num) => num.toString()),
}));
const MockSubCategoriesList = ({ subCategories, categories }: any) => (
  <div data-testid="subcategories-list">
    {subCategories.length} subcategories, {categories.length} categories
  </div>
);
MockSubCategoriesList.displayName = 'MockSubCategoriesList';
jest.mock("../SubCategoriesList", () => MockSubCategoriesList);

const MockSearchBox = ({ inputValue, onSearch, placeholderText }: any) => (
  <input
    value={inputValue}
    onChange={onSearch}
    placeholder={placeholderText}
    data-testid="search-input"
  />
);
MockSearchBox.displayName = 'MockSearchBox';
jest.mock("@/common/SearchBox", () => MockSearchBox);

const mockSubCategories = [
  { persianTitle: "دفتر" },
  { persianTitle: "خودکار" },
  { persianTitle: "مداد رنگی" },
];

const mockCategories = [
  { _id: "1", title: "Category 1" },
  { _id: "2", title: "Category 2" },
];

describe("SubCategoriesClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all subcategories initially", () => {
    render(
      <SubCategoriesClient
        initialSubCategories={mockSubCategories}
        initialCategories={mockCategories}
      />,
    );

    expect(screen.getByText("زیر دسته ها :")).toBeInTheDocument();
    expect(toPersianNumbers).toHaveBeenCalledWith(3);
    expect(screen.getByTestId("subcategories-list")).toHaveTextContent(
      "3 subcategories, 2 categories",
    );
  });

  it("filters subcategories based on search input", async () => {
    render(
      <SubCategoriesClient
        initialSubCategories={mockSubCategories}
        initialCategories={mockCategories}
      />,
    );

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "دفتر" } });

    await waitFor(() => {
      expect(toPersianNumbers).toHaveBeenCalledWith(1);
      expect(screen.getByTestId("subcategories-list")).toHaveTextContent(
        "1 subcategories, 2 categories",
      );
    });
  });

  it("shows no results when search doesn't match", async () => {
    render(
      <SubCategoriesClient
        initialSubCategories={mockSubCategories}
        initialCategories={mockCategories}
      />,
    );

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "نتیجهای نیست" } });

    await waitFor(() => {
      expect(toPersianNumbers).toHaveBeenCalledWith(0);
      expect(screen.getByTestId("subcategories-list")).toHaveTextContent(
        "0 subcategories, 2 categories",
      );
    });
  });

  // it("handles case-insensitive search", async () => {
  //   render(
  //     <SubCategoriesClient
  //       initialSubCategories={mockSubCategories}
  //       initialCategories={mockCategories}
  //     />
  //   );

  //   const searchInput = screen.getByTestId("search-input");
  //   fireEvent.change(searchInput, { target: { value: "خودکار" } });

  //   await waitFor(() => {
  //     expect(toPersianNumbers).toHaveBeenCalledWith(1);
  //   });
  // });

  it("trims whitespace in search", async () => {
    render(
      <SubCategoriesClient
        initialSubCategories={mockSubCategories}
        initialCategories={mockCategories}
      />,
    );

    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "  دفتر  " } });

    await waitFor(() => {
      expect(toPersianNumbers).toHaveBeenCalledWith(1);
    });
  });

  it("shows all items when search is cleared", async () => {
    render(
      <SubCategoriesClient
        initialSubCategories={mockSubCategories}
        initialCategories={mockCategories}
      />,
    );

    const searchInput = screen.getByTestId("search-input");

    // First search
    fireEvent.change(searchInput, { target: { value: "دفتر" } });
    await waitFor(() => {
      expect(toPersianNumbers).toHaveBeenCalledWith(1);
    });

    // Clear search
    fireEvent.change(searchInput, { target: { value: "" } });
    await waitFor(() => {
      expect(toPersianNumbers).toHaveBeenCalledWith(3);
    });
  });

  it("handles empty subcategories array", () => {
    render(
      <SubCategoriesClient
        initialSubCategories={[]}
        initialCategories={mockCategories}
      />,
    );

    expect(toPersianNumbers).toHaveBeenCalledWith(0);
    expect(screen.getByTestId("subcategories-list")).toHaveTextContent(
      "0 subcategories, 2 categories",
    );
  });

  it("handles empty categories array", () => {
    render(
      <SubCategoriesClient
        initialSubCategories={mockSubCategories}
        initialCategories={[]}
      />,
    );

    expect(screen.getByTestId("subcategories-list")).toHaveTextContent(
      "3 subcategories, 0 categories",
    );
  });

  it("passes correct props to SearchBox", () => {
    render(
      <SubCategoriesClient
        initialSubCategories={mockSubCategories}
        initialCategories={mockCategories}
      />,
    );

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toHaveAttribute(
      "placeholder",
      "جستجوی عنوان زیر دسته ...",
    );
    expect(searchInput).toHaveValue("");
  });

  it("debounces search input", async () => {
    render(
      <SubCategoriesClient
        initialSubCategories={mockSubCategories}
        initialCategories={mockCategories}
      />,
    );

    const searchInput = screen.getByTestId("search-input");

    // Type quickly
    fireEvent.change(searchInput, { target: { value: "د" } });
    fireEvent.change(searchInput, { target: { value: "دف" } });
    fireEvent.change(searchInput, { target: { value: "دفتر" } });

    // Should still show all items initially (debounced)
    expect(toPersianNumbers).toHaveBeenCalledWith(3);

    // Wait for debounce
    await waitFor(() => {
      expect(toPersianNumbers).toHaveBeenCalledWith(1);
    });
  });
});
