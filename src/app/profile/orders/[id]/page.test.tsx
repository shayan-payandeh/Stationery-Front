import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page";
import OrderAddress from "./OrderAddress";
import OrderDetail from "./OrderDetail";
import OrderStatus from "./OrderStatus";
import getMyOrderServerComponent from "../service";
import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumbers";

jest.mock("../service");
jest.mock("@/utils/toPersianNumbers", () => ({
  toPersianNumbers: jest.fn((value) => value),
  toPersianNumbersWithComma: jest.fn((value) => value),
}));
const MockPriceUnit = () => <span>تومان</span>;
MockPriceUnit.displayName = 'MockPriceUnit';
jest.mock("@/component/PriceUnit", () => MockPriceUnit);

const MockLink = ({ children, href }: any) => (
  <a href={href}>{children}</a>
);
MockLink.displayName = 'MockLink';
jest.mock("next/link", () => MockLink);

const MockOrderStatus = ({ theOrder }: any) => (
  <div data-testid="order-status">Order Status: {theOrder._id}</div>
);
MockOrderStatus.displayName = 'MockOrderStatus';
jest.mock("./OrderStatus", () => MockOrderStatus);

const MockOrderAddress = ({ theOrder }: any) => (
  <div data-testid="order-address">Order Address: {theOrder._id}</div>
);
MockOrderAddress.displayName = 'MockOrderAddress';
jest.mock("./OrderAddress", () => MockOrderAddress);



const mockOrders = [
  { _id: "order123", status: "completed" },
  { _id: "order456", status: "pending" },
];

describe("Page component", () => {
  const mockService = getMyOrderServerComponent as jest.Mock;

  const renderPage = async (id: string) => {
    const component = await Page({ params: { id } });
    render(component);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders order details when order exists", async () => {
    mockService.mockResolvedValue({
      data: { data: { orders: mockOrders } },
    });

    await renderPage("order123");

    expect(screen.getByTestId("order-status")).toHaveTextContent(
      "Order Status: order123",
    );
    expect(screen.getByTestId("order-detail")).toHaveTextContent(
      "Order Detail: order123",
    );
    expect(screen.getByTestId("order-address")).toHaveTextContent(
      "Order Address: order123",
    );
  });

  it("renders not found message when order doesn't exist", async () => {
    mockService.mockResolvedValue({
      data: { data: { orders: mockOrders } },
    });

    await renderPage("nonexistent");

    expect(screen.getByText("سفارش مورد نظر یافت نشد")).toBeInTheDocument();
    expect(screen.queryByTestId("order-status")).not.toBeInTheDocument();
  });
});

describe("OrderAddress component", () => {
  const mockToPersianNumbers = toPersianNumbers as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockOrder = {
    orderInfo: {
      shippingAddress: {
        firstName: "احمد",
        lastName: "محمدی",
        province: "تهران",
        city: "تهران",
        address: "خیابان ولیعصر، پلاک 123",
        postalcode: "1234567890",
        phoneNumber: "09123456789",
      },
    },
  };

  it("renders shipping address information", () => {
    render(<OrderAddress theOrder={mockOrder} />);

    expect(screen.getByText("آدرس صورتحساب")).toBeInTheDocument();
    expect(screen.getByText("احمد محمدی")).toBeInTheDocument();
    expect(screen.getByText("تهران - تهران")).toBeInTheDocument();

    expect(mockToPersianNumbers).toHaveBeenCalledWith(
      "خیابان ولیعصر، پلاک 123",
    );
    expect(mockToPersianNumbers).toHaveBeenCalledWith("1234567890");
    expect(mockToPersianNumbers).toHaveBeenCalledWith("09123456789");
  });

});

describe("OrderDetail component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockOrder = {
    orderInfo: {
      orderItems: [
        {
          _id: "item1",
          quantity: 2,
          product: {
            _id: "product1",
            name: "قلم آبی",
            price: 15000,
          },
        },
      ],
      payInfo: {
        totalPrice: 30000,
        discount: 10,
        delieveryCost: 5000,
        paidPrice: 32000,
      },
    },
  };

  it("renders order items and payment details", () => {
    render(<OrderDetail theOrder={mockOrder} />);
    
    expect(screen.getByText("جزئیات سفارش")).toBeInTheDocument();
    expect(screen.getByText("قلم آبی")).toBeInTheDocument();
    expect(screen.getByText("جمع کل سبد خرید :")).toBeInTheDocument();
    expect(screen.getByText("تخفیف :")).toBeInTheDocument();
    expect(screen.getByText("هزینه ارسال :")).toBeInTheDocument();
    expect(screen.getByText("قیمت پرداختی :")).toBeInTheDocument();
  });

  it("calls toPersianNumbers and toPersianNumbersWithComma correctly", () => {
    const mockToPersianNumbers = toPersianNumbers as jest.Mock;
    const mockToPersianNumbersWithComma = toPersianNumbersWithComma as jest.Mock;
    
    render(<OrderDetail theOrder={mockOrder} />);
    
    expect(mockToPersianNumbers).toHaveBeenCalledWith(2);
    expect(mockToPersianNumbersWithComma).toHaveBeenCalledWith(15000);
    expect(mockToPersianNumbersWithComma).toHaveBeenCalledWith(30000);
    expect(mockToPersianNumbersWithComma).toHaveBeenCalledWith(3000);
    expect(mockToPersianNumbersWithComma).toHaveBeenCalledWith(5000);
    expect(mockToPersianNumbersWithComma).toHaveBeenCalledWith(32000);
  });
});

describe("OrderStatus component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProcessingOrder = {
    status: "processing",
    createdAt: "2024-01-15T10:30:00.000Z",
  };

  const mockCompletedOrder = {
    status: "completed",
    createdAt: "2024-01-10T14:20:00.000Z",
  };

  it("renders processing order status correctly", () => {
    render(<OrderStatus theOrder={mockProcessingOrder} />);
    
    expect(screen.getByText("وضعیت سفارش")).toBeInTheDocument();
    expect(screen.getByText("درحال انجام")).toBeInTheDocument();
    expect(screen.getByText("درحال انجام")).toHaveClass("bg-red-100");
  });

  it("renders completed order status correctly", () => {
    render(<OrderStatus theOrder={mockCompletedOrder} />);
    
    expect(screen.getByText("تکمیل شده")).toBeInTheDocument();
    expect(screen.getByText("تکمیل شده")).toHaveClass("bg-green-100");
  });

  it("calls toPersianNumbers for order number", () => {
    const mockToPersianNumbers = toPersianNumbers as jest.Mock;
    
    render(<OrderStatus theOrder={mockProcessingOrder} />);
    
    expect(mockToPersianNumbers).toHaveBeenCalledWith(65435);
  });
});
