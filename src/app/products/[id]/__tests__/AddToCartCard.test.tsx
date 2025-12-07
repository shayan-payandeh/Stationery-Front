import { useCartStore } from "@/hook/useCartStore";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AddToCartCard from "../AddToCartCard";

jest.mock("@/hook/useCartStore");
jest.mock("@/utils/toPersianNumbers", () => ({
  toPersianNumbersWithComma: jest.fn((num) => num.toString()),
  toPersianNumbers: jest.fn((num) => num.toString()),
}));

describe("AddToCartCard", () => {
  const mockUseCartStore = useCartStore as jest.MockedFunction<
    typeof useCartStore
  >;
  const mockAddItem = jest.fn();
  const mockRemoveItem = jest.fn();

  const product = {
    _id: "p1",
    name: "Test Product",
    count: 5,
    price: 100000,
    category: { _id: "c1", title: "Category", persianTitle: "دسته" },
    subCategory: { _id: "s1", title: "SubCategory", persianTitle: "زیردسته" },
    brand: { _id: "b1", title: "Brand", persianTitle: "برند" },
    images: [{ src: "image.jpg" }],
    discount: 0,
    description: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders 'افزودن به سبد خرید' button when product not in cart", () => {
    mockUseCartStore.mockReturnValue({
      cartItems: [{ _id: "p2", quantity: 1, count: 3, name: "Other Product" }],
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      shippingAddress: {},
      saveShippingAddress: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<AddToCartCard product={product} />);
    expect(screen.getByText("افزودن به سبد خرید")).toBeInTheDocument();
  });

  it("calls addItem when 'افزودن به سبد خرید' clicked", () => {
    mockUseCartStore.mockReturnValue({
      cartItems: [],
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      shippingAddress: {},
      saveShippingAddress: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<AddToCartCard product={product} />);
    fireEvent.click(screen.getByText("افزودن به سبد خرید"));
    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({ _id: "p1", quantity: 1 }),
    );
  });

  it("renders + and - buttons when product already in cart", () => {
    mockUseCartStore.mockReturnValue({
      cartItems: [{ _id: "p1", quantity: 2, count: 5, name: "Test Product" }],
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      shippingAddress: {},
      saveShippingAddress: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<AddToCartCard product={product} />);
    expect(screen.getByText("+")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls addItem when + clicked", () => {
    mockUseCartStore.mockReturnValue({
      cartItems: [{ _id: "p1", quantity: 2, count: 5, name: "Test Product" }],
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      shippingAddress: {},
      saveShippingAddress: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<AddToCartCard product={product} />);
    fireEvent.click(screen.getByText("+"));
    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({ _id: "p1", quantity: 3 }),
    );
  });

  it("calls removeItem when quantity becomes 0 after - click", () => {
    mockUseCartStore.mockReturnValue({
      cartItems: [{ _id: "p1", quantity: 1, count: 5, name: "Test Product" }],
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      shippingAddress: {},
      saveShippingAddress: jest.fn(),
      clearCart: jest.fn(),
    });

    render(<AddToCartCard product={product} />);
    fireEvent.click(screen.getByText("-"));
    expect(mockRemoveItem).toHaveBeenCalledWith("p1");
  });
});
