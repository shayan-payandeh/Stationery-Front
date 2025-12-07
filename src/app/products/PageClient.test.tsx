import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useGetProducts } from "@/hook/useProducts";
import PageClient from "./PageClient";

jest.mock("next/navigation");
// Whenever inside this test file someone wants to import something from the next/navigation package,
// don’t take its real version! Make a fake (mock) version of it so I can control it in the test.”

jest.mock("@/hook/useProducts");
// Whenever this test file imports the module (or file) @/hook/useProducts,
// don’t run the real version of that file ❌
// Instead, create a fake (mock) version of it so I can control what it returns. ✅

const MockAppBreadCrumb = () => (
  <div data-testid="breadcrumb" />
);
MockAppBreadCrumb.displayName = 'MockAppBreadCrumb';
jest.mock("@/component/AppBreadCrumb", () => MockAppBreadCrumb);

const MockCard = ({ product }: any) => (
  <div data-testid={`card-${product._id}`} />
);
MockCard.displayName = 'MockCard';
jest.mock("@/component/Card", () => MockCard);

const MockPaginate = () => <div data-testid="paginate" />;
MockPaginate.displayName = 'MockPaginate';
jest.mock("@/component/Paginate", () => MockPaginate);

const MockNoProductsToShow = () => (
  <div data-testid="no-products" />
);
MockNoProductsToShow.displayName = 'MockNoProductsToShow';
jest.mock("../category/[slug]/NoProductsToShow", () => MockNoProductsToShow);

const MockProductSkeleton = () => <div data-testid="skeleton" />;
MockProductSkeleton.displayName = 'MockProductSkeleton';
jest.mock("./ProductSkeleton", () => MockProductSkeleton);

const MockErrorFallback = ({ onRetry }: any) => (
  <button data-testid="error-fallback" onClick={onRetry}>
    Retry
  </button>
);
MockErrorFallback.displayName = 'MockErrorFallback';
jest.mock("@/component/ErrorFallback", () => MockErrorFallback);

const mockRouter = { push: jest.fn() };
const mockRefetch = jest.fn();

describe("PageClient", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue("/products");
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=1"),
    );
  });

  const mockProducts = {
    products: {
      docs: [
        { _id: "1", name: "Product 1" },
        { _id: "2", name: "Product 2" },
      ],
    },
  };

  it("renders products successfully", () => {
    (useGetProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isFetching: false,
      isError: false,
      refetch: mockRefetch,
    });

    render(<PageClient initialProducts={mockProducts} />);

    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
    expect(screen.getByTestId("card-1")).toBeInTheDocument();
    expect(screen.getByTestId("card-2")).toBeInTheDocument();
    expect(screen.getByTestId("paginate")).toBeInTheDocument();
  });

  it("shows skeleton when fetching with no products", () => {
    (useGetProducts as jest.Mock).mockReturnValue({
      data: { products: { docs: [] } },
      isFetching: true,
      isError: false,
      refetch: mockRefetch,
    });

    render(<PageClient initialProducts={{ products: { docs: [] } }} />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("shows no products message when empty", () => {
    (useGetProducts as jest.Mock).mockReturnValue({
      data: { products: { docs: [] } },
      isFetching: false,
      isError: false,
      refetch: mockRefetch,
    });

    render(<PageClient initialProducts={{ products: { docs: [] } }} />);

    expect(screen.getByTestId("no-products")).toBeInTheDocument();
  });

  it("shows error fallback on error", () => {
    (useGetProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isFetching: false,
      isError: true,
      refetch: mockRefetch,
    });

    render(<PageClient initialProducts={mockProducts} />);

    expect(screen.getByTestId("error-fallback")).toBeInTheDocument();
  });

  it("calls refetch when retry is clicked", () => {
    (useGetProducts as jest.Mock).mockReturnValue({
      data: mockProducts,
      isFetching: false,
      isError: true,
      refetch: mockRefetch,
    });

    render(<PageClient initialProducts={mockProducts} />);

    fireEvent.click(screen.getByTestId("error-fallback"));
    expect(mockRefetch).toHaveBeenCalled();
  });
});
