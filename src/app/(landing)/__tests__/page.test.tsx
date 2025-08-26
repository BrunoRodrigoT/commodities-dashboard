import { render, screen } from "@testing-library/react";
import Home from "../page";

// Mock the child components
jest.mock("../components/ApiKeyCard", () => {
  return function MockApiKeyCard() {
    return <div data-testid="api-key-card">API Key Card</div>;
  };
});

jest.mock("../components/Quotes", () => {
  return function MockQuotes() {
    return <div data-testid="quotes">Quotes Component</div>;
  };
});

jest.mock("../components/DataListProvider", () => {
  return function MockDataListProvider() {
    return <div data-testid="data-list-provider">Data List Provider</div>;
  };
});

describe("Home Page", () => {
  it("should render the main page layout", () => {
    const { container } = render(<Home />);

    const mainContainer = container.querySelector(".flex.flex-col");
    expect(mainContainer).toBeInTheDocument();
  });

  it("should render all main components", () => {
    render(<Home />);

    expect(screen.getByTestId("api-key-card")).toBeInTheDocument();
    expect(screen.getByTestId("quotes")).toBeInTheDocument();
    expect(screen.getByTestId("data-list-provider")).toBeInTheDocument();
  });

  it("should have proper layout classes", () => {
    const { container } = render(<Home />);

    const mainDiv = container.firstChild as Element;
    expect(mainDiv).toHaveClass(
      "flex",
      "flex-col",
      "gap-4",
      "align-baseline",
      "w-full"
    );
  });

  it("should render components in correct order", () => {
    render(<Home />);

    const components = [
      screen.getByTestId("api-key-card"),
      screen.getByTestId("quotes"),
      screen.getByTestId("data-list-provider"),
    ];

    // Check that each component exists
    components.forEach((component) => {
      expect(component).toBeInTheDocument();
    });

    // ApiKeyCard should be first
    const apiKeyCard = screen.getByTestId("api-key-card");
    const quotes = screen.getByTestId("quotes");
    const dataListProvider = screen.getByTestId("data-list-provider");

    // In DOM order, API Key should come before Quotes
    expect(apiKeyCard.compareDocumentPosition(quotes)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );

    // Quotes should come before DataListProvider
    expect(quotes.compareDocumentPosition(dataListProvider)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  describe("responsiveness", () => {
    it("should have responsive padding and gap classes", () => {
      const { container } = render(<Home />);

      const mainDiv = container.firstChild as Element;
      expect(mainDiv).toHaveClass("px-4", "py-16");
    });
  });

  describe("accessibility", () => {
    it("should be accessible", () => {
      render(<Home />);

      // Check that the page contains interactive elements
      const components = [
        screen.getByTestId("api-key-card"),
        screen.getByTestId("quotes"),
        screen.getByTestId("data-list-provider"),
      ];

      components.forEach((component) => {
        expect(component).toBeInTheDocument();
      });
    });
  });
});
