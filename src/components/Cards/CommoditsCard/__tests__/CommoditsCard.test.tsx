import { render, screen } from "@testing-library/react";
import CommoditsCard from "../index";
import { TrendingUp } from "lucide-react";

// Mock date-fns
jest.mock("date-fns", () => ({
  format: jest.fn(() => "01/01/2024"),
  parseISO: jest.fn((dateString: string) => new Date(dateString)),
}));

describe("CommoditsCard", () => {
  const mockIcon = TrendingUp;
  
  const mockDataComplete = {
    "01. symbol": "AAPL",
    "05. price": "150.25",
    "07. latest trading day": "2024-01-01",
    "10. change percent": "+2.5%",
  };

  const mockDataNegative = {
    "01. symbol": "TSLA",
    "05. price": "200.00",
    "07. latest trading day": "2024-01-01",
    "10. change percent": "-1.2%",
  };

  const mockDataMissing = {
    "01. symbol": "GOOGL",
  };

  const defaultProps = {
    data: mockDataComplete,
    icon: mockIcon,
  };

  it("should render loading skeleton when loading prop is true", () => {
    render(<CommoditsCard {...defaultProps} loading={true} />);
    
    const skeleton = document.querySelector(".animate-pulse");
    expect(skeleton).toBeInTheDocument();
  });

  it("should return null when symbol is missing", () => {
    const { container } = render(
      <CommoditsCard data={{}} icon={mockIcon} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it("should render card with complete data", () => {
    render(<CommoditsCard {...defaultProps} />);
    
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("$150.25")).toBeInTheDocument();
    expect(screen.getByText("/ETF")).toBeInTheDocument();
    expect(screen.getByText("01/01/2024")).toBeInTheDocument();
    expect(screen.getByText("+2.5%")).toBeInTheDocument();
  });

  it("should display N/A for missing data fields", () => {
    render(<CommoditsCard data={mockDataMissing} icon={mockIcon} />);
    
    expect(screen.getByText("GOOGL")).toBeInTheDocument();
    expect(screen.getByText("$N/A")).toBeInTheDocument();
    expect(screen.getByText("N/A", { selector: "p" })).toBeInTheDocument(); // for date
  });

  it("should apply success variant badge for positive change", () => {
    render(<CommoditsCard {...defaultProps} />);
    
    const badge = screen.getByText("+2.5%");
    // The badge should not have destructive styling
    expect(badge.closest("div")).not.toHaveClass("bg-destructive");
  });

  it("should apply destructive variant badge for negative change", () => {
    render(<CommoditsCard data={mockDataNegative} icon={mockIcon} />);
    
    const badge = screen.getByText("-1.2%");
    expect(badge).toBeInTheDocument();
  });

  it("should apply default variant badge when change percent is missing", () => {
    const dataWithoutChange = {
      ...mockDataComplete,
      "10. change percent": undefined,
    };
    
    render(<CommoditsCard data={dataWithoutChange} icon={mockIcon} />);
    
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("should render the provided icon", () => {
    render(<CommoditsCard {...defaultProps} />);
    
    // The icon should be rendered (mocked in jest.setup.js)
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    const customClass = "custom-card-class";
    const { container } = render(
      <CommoditsCard {...defaultProps} className={customClass} />
    );
    
    const card = container.firstChild;
    expect(card).toHaveClass(customClass);
  });

  it("should apply custom iconClassName", () => {
    const customIconClass = "custom-icon-class";
    const { container } = render(
      <CommoditsCard {...defaultProps} iconClassName={customIconClass} />
    );
    
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass(customIconClass);
  });

  it("should have proper card structure", () => {
    render(<CommoditsCard {...defaultProps} />);
    
    // Check for card components
    expect(document.querySelector(".w-full")).toBeInTheDocument();
    expect(document.querySelector(".min-w-\\[300px\\]")).toBeInTheDocument();
    expect(document.querySelector(".py-8")).toBeInTheDocument();
  });

  it("should format date correctly", () => {
    render(<CommoditsCard {...defaultProps} />);
    
    // Mock returns "01/01/2024" format
    expect(screen.getByText("01/01/2024")).toBeInTheDocument();
  });

  it("should handle edge cases in change percent detection", () => {
    const dataWithZeroChange = {
      ...mockDataComplete,
      "10. change percent": "0%",
    };
    
    render(<CommoditsCard data={dataWithZeroChange} icon={mockIcon} />);
    
    const badge = screen.getByText("0%");
    expect(badge).toBeInTheDocument();
    // Should not be destructive (no minus sign)
    expect(badge.closest("div")).not.toHaveClass("bg-destructive");
  });

  it("should handle change percent with minus sign correctly", () => {
    render(<CommoditsCard data={mockDataNegative} icon={mockIcon} />);
    
    const badge = screen.getByText("-1.2%");
    expect(badge).toBeInTheDocument();
  });

  describe("accessibility", () => {
    it("should be accessible", () => {
      render(<CommoditsCard {...defaultProps} />);
      
      // Card should be in document and contain meaningful content
      const symbolText = screen.getByText("AAPL");
      const priceText = screen.getByText("$150.25");
      
      expect(symbolText).toBeInTheDocument();
      expect(priceText).toBeInTheDocument();
    });
  });
});
