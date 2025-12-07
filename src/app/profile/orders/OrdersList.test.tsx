import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrdersList from "./OrdersList";
import getMyOrderServerComponent from "./service";

jest.mock("./service");
const MockScrollBlur = ({ children, htmlTag: Tag = "div", className }: any) => (
  <Tag className={className}>{children}</Tag>
);
MockScrollBlur.displayName = 'MockScrollBlur';
jest.mock("@/component/animate/ScrollBlur", () => MockScrollBlur);

const mockOrders = [
  {
    _id: "12345678abcdef",
    createdAt: "2024-01-15T10:30:00Z",
    status: "completed",
    orderInfo: {
      payInfo: {
        paidPrice: 150000
      }
    }
  },
  {
    _id: "87654321fedcba",
    createdAt: "2024-01-10T14:20:00Z", 
    status: "pending",
    orderInfo: {
      payInfo: {
        paidPrice: 75000
      }
    }
  }
];

describe("OrdersList Component", () => {
  const mockService = getMyOrderServerComponent as jest.Mock;

  const renderComponent = async () => {
    const component = await OrdersList();
    render(component);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders orders table when data is available", async () => {
    mockService.mockResolvedValue({
      data: { data: { orders: mockOrders } },
      error: false
    });

    await renderComponent();
    
    expect(screen.getByText("سفارش")).toBeInTheDocument();
    expect(screen.getByText("تاریخ")).toBeInTheDocument();
    expect(screen.getByText("وضعیت")).toBeInTheDocument();
    expect(screen.getByText("پرداختی")).toBeInTheDocument();
    expect(screen.getByText("عملیات")).toBeInTheDocument();
    expect(screen.getByText("تکمیل شده")).toBeInTheDocument();
    expect(screen.getByText("درحال انجام")).toBeInTheDocument();
    
    const viewLinks = screen.getAllByText("مشاهده");
    expect(viewLinks).toHaveLength(2);
    expect(viewLinks[0].closest('a')).toHaveAttribute('href', '/profile/order/12345678abcdef');
    expect(viewLinks[1].closest('a')).toHaveAttribute('href', '/profile/order/87654321fedcba');
  });

  it("renders empty state when no orders", async () => {
    mockService.mockResolvedValue({
      data: { data: { orders: [] } },
      error: false
    });

    await renderComponent();
    
    expect(screen.getByText("شما هنوز سفارشی ثبت نکردهاید!")).toBeInTheDocument();
  });

  it("renders error state when service fails", async () => {
    mockService.mockResolvedValue({
      data: { orders: [] },
      error: true
    });

    await renderComponent();
    
    expect(screen.getByText("خطا در دریافت سفارشها")).toBeInTheDocument();
  });


});