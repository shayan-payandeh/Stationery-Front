jest.mock("@/hook/useCartStore");
jest.mock("@tanstack/react-query");
const MockLoading = () => (
  <div data-testid="loading">Loading...</div>
);
MockLoading.displayName = 'MockLoading';
jest.mock("@/component/Loading", () => MockLoading);

const MockAppBreadCrumb = () => <div>Breadcrumb</div>;
MockAppBreadCrumb.displayName = 'MockAppBreadCrumb';
jest.mock("@/component/AppBreadCrumb", () => MockAppBreadCrumb);

const MockCartDetail = () => (
  <div data-testid="cart-detail">Cart Detail</div>
);
MockCartDetail.displayName = 'MockCartDetail';
jest.mock("../CartDetail", () => MockCartDetail);

const MockOrderSummary = () => (
  <div data-testid="order-summary">Order Summary</div>
);
MockOrderSummary.displayName = 'MockOrderSummary';
jest.mock("../OrderSummary", () => MockOrderSummary);

const MockEmptyCart = () => (
  <div data-testid="empty-cart">Empty Cart</div>
);
MockEmptyCart.displayName = 'MockEmptyCart';
jest.mock("../EmptyCart", () => MockEmptyCart);
jest.mock("@/constant/routes", () => ({
  appRoutes: { cart: { link: "/cart", persianTitle: "سبد خرید" } },
}));

import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useCartStore } from "@/hook/useCartStore";
import { useQueries } from "@tanstack/react-query";
import Page from "../page";

describe("CartPage async data flow", () => {
  const mockUseCartStore = useCartStore as jest.MockedFunction<
    typeof useCartStore
  >;
  const mockUseQueries = useQueries as jest.Mock;

  it("renders loading first, then cart details after data is loaded", async () => {
    mockUseCartStore.mockReturnValue({
      cartItems: [
        { _id: "1", quantity: 2 },
        { _id: "2", quantity: 1 },
      ],
      addItem: jest.fn(),
      removeItem: jest.fn(),
    });

    // First render: loading state
    mockUseQueries.mockReturnValue([
      { isLoading: true, isSuccess: false },
      { isLoading: true, isSuccess: false },
    ]);

    const { rerender } = render(<Page />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    // Second render: data loaded
    mockUseQueries.mockReturnValue([
      {
        isLoading: false,
        isSuccess: true,
        data: { product: { _id: "1", price: 100, name: "Product 1" } },
      },
      {
        isLoading: false,
        isSuccess: true,
        data: { product: { _id: "2", price: 200, name: "Product 2" } },
      },
    ]);

    rerender(<Page />);

    await waitFor(() => {
      expect(screen.getByTestId("cart-detail")).toBeInTheDocument();
      expect(screen.getByTestId("order-summary")).toBeInTheDocument();
    });
  });

  it("renders empty cart when no items", () => {
    mockUseCartStore.mockReturnValue({
      cartItems: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
    });
    mockUseQueries.mockReturnValue([]);

    render(<Page />);
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
  });
});

describe("CartPage discount calculation", () => {
  const mockUseCartStore = useCartStore as jest.MockedFunction<
    typeof useCartStore
  >;
  const mockUseQueries = useQueries as jest.Mock;

  it("applies 0% discount when total ≤ 500000", async () => {
    mockUseCartStore.mockReturnValue({
      cartItems: [{ _id: "1", quantity: 2 }],
      addItem: jest.fn(),
      removeItem: jest.fn(),
    });

    mockUseQueries.mockReturnValue([
      {
        isLoading: false,
        isSuccess: true,
        data: { product: { _id: "1", price: 200000 } },
      },
    ]);

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/Discount: 0%/)).toBeInTheDocument();
    });
  });

  it("applies 5% discount when total between 500000 and 1,000,000", async () => {
    mockUseCartStore.mockReturnValue({
      cartItems: [{ _id: "1", quantity: 3 }],
      addItem: jest.fn(),
      removeItem: jest.fn(),
    });

    mockUseQueries.mockReturnValue([
      {
        isLoading: false,
        isSuccess: true,
        data: { product: { _id: "1", price: 200000 } },
      },
    ]);

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/Discount: 5%/)).toBeInTheDocument();
    });
  });

  it("applies 10% discount when total > 1,000,000", async () => {
    mockUseCartStore.mockReturnValue({
      cartItems: [{ _id: "1", quantity: 6 }],
      addItem: jest.fn(),
      removeItem: jest.fn(),
    });

    mockUseQueries.mockReturnValue([
      {
        isLoading: false,
        isSuccess: true,
        data: { product: { _id: "1", price: 200000 } },
      },
    ]);

    render(<Page />);
    await waitFor(() => {
      expect(screen.getByText(/Discount: 10%/)).toBeInTheDocument();
    });
  });
});
