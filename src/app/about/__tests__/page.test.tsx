import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "../page";

jest.mock("@/component/animate/ScrollFade", () => {
  return function MockScrollFade({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  };
});

const MockAppBreadCrumb = () => (
  <div data-testid="breadcrumb">Breadcrumb</div>
);
MockAppBreadCrumb.displayName = 'MockAppBreadCrumb';
jest.mock("@/component/AppBreadCrumb", () => MockAppBreadCrumb);

jest.mock("@/constant/aboutTexts", () => ({
  aboutTexts: {
    header: "Test Header",
    title: "Test Title",
    context: "Test Context",
  },
}));

jest.mock("@/constant/routes", () => ({
  appRoutes: {
    about: {
      link: "/about",
      persianTitle: "درباره ما",
    },
  },
}));

describe("About Page", () => {
  it("renders about page content", () => {
    render(<Page />);
    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();

    // expect(screen.getByText("Test Header")).toBeInTheDocument();
    // expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Test Header" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Test Title" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Test Context")).toBeInTheDocument();
  });
});
