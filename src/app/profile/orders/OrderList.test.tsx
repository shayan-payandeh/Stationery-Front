import { render, screen } from "@testing-library/react";
import OrdersList from "./OrdersList";
import getMyOrderServerComponent from "./service";
import { error } from "console";

jest.mock("./service");

describe("OrderList Page", () => {
  const mockMyOrderSerive = getMyOrderServerComponent as jest.Mock;
  const mockMyOrders = [{ id: "12", status: "تکمیل شده" }];

  const renderPage = async () => {
    const component = await OrdersList();
    render(component);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render orderlist structure", async () => {
    mockMyOrderSerive.mockResolvedValue(mockMyOrders);

    await renderPage();
    expect(screen.getByText("تکمیل شده")).toBeInTheDocument();
  });

  it("render when orderlist is empty", async () => {
    mockMyOrderSerive.mockResolvedValue([]);

    await renderPage();
    expect(
      screen.getByText(" شما هنوز سفارشی ثبت نکرده‌اید!"),
    ).toBeInTheDocument();
  });

  it("render error", async () => {
    mockMyOrderSerive.mockRejectedValue(new error("service error"));

    await renderPage();
    expect(screen.getByText(/خطا/i)).toBeInTheDocument();
  });
});
