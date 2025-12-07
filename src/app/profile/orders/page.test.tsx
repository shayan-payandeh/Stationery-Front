import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page";

const MockOrdersList = () => (
  <div data-testid="orders-list">Orders List</div>
);
MockOrdersList.displayName = 'MockOrdersList';
jest.mock("./OrdersList", () => MockOrdersList);

describe("Orders Page component", () => {
  it("renders OrdersList within Suspense", () => {
    render(<Page />);
    
    expect(screen.getByTestId("orders-list")).toBeInTheDocument();
  });
});