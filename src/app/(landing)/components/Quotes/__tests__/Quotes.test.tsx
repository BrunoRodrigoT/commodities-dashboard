import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Quotes from "../index";
import { mockApiResponses } from "@/__tests__/utils/apiMocks";

// Mock dependencies
jest.mock("@/services/quote.service", () => ({
  get: jest.fn(),
}));

jest.mock("@/contexts/ApiKeyContext", () => ({
  useApiKey: jest.fn(),
}));

jest.mock("@/utils/toast", () => ({
  __esModule: true,
  default: jest.fn(),
}));

interface MockCommoditsCardProps {
  data: Record<string, string>;
  loading: boolean;
  icon: React.ComponentType;
  className: string;
  iconClassName: string;
}

jest.mock("@/components/Cards", () => ({
  CommoditsCard: ({ data, loading, className, iconClassName }: MockCommoditsCardProps) => (
    <div
      data-testid="commodits-card"
      data-loading={loading}
      data-symbol={data["01. symbol"] || "no-symbol"}
      className={className}
    >
      <div data-testid="icon" className={iconClassName} />
      {loading ? "Loading..." : `Price: ${data["05. price"] || "N/A"}`}
    </div>
  ),
}));

import QuoteService from "@/services/quote.service";
import { useApiKey } from "@/contexts/ApiKeyContext";
import toast from "@/utils/toast";

const mockQuoteService = QuoteService as jest.Mocked<typeof QuoteService>;
const mockUseApiKey = useApiKey as jest.MockedFunction<typeof useApiKey>;
const mockToast = toast as jest.MockedFunction<typeof toast>;

describe("Quotes Component", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
    
    // Provide default mock responses to prevent "query data cannot be undefined" errors
    mockQuoteService.get.mockResolvedValue({
      "Global Quote": {
        "01. symbol": "TEST",
        "05. price": "0.00",
      }
    });
  });

  const renderWithQueryClient = (apiKey = "test-api-key") => {
    mockUseApiKey.mockReturnValue({
      apiKey,
      setApiKey: jest.fn(),
    });

    return render(
      <QueryClientProvider client={queryClient}>
        <Quotes />
      </QueryClientProvider>
    );
  };

  it("should render three commodity cards", () => {
    renderWithQueryClient();

    const cards = screen.getAllByTestId("commodits-card");
    expect(cards).toHaveLength(3);
  });

  it("should not fetch data when API key is empty", () => {
    renderWithQueryClient("");

    expect(mockQuoteService.get).not.toHaveBeenCalled();
  });

  it("should fetch data for all three commodities when API key is provided", async () => {
    mockQuoteService.get.mockResolvedValue(mockApiResponses.quotes.success);
    
    renderWithQueryClient("valid-api-key");

    await waitFor(() => {
      expect(mockQuoteService.get).toHaveBeenCalledWith("Wheat", "valid-api-key");
      expect(mockQuoteService.get).toHaveBeenCalledWith("Corn", "valid-api-key");
      expect(mockQuoteService.get).toHaveBeenCalledWith("DOL", "valid-api-key");
    });
  });

  it("should show loading state for all cards initially", () => {
    renderWithQueryClient();

    const cards = screen.getAllByTestId("commodits-card");
    cards.forEach(card => {
      expect(card).toHaveAttribute("data-loading", "true");
    });
  });

  it("should display commodity data when loaded successfully", async () => {
    const mockData = {
      "Global Quote": {
        "01. symbol": "CORN",
        "05. price": "450.25",
      }
    };
    
    mockQuoteService.get.mockResolvedValue(mockData);
    
    renderWithQueryClient();

    await waitFor(() => {
      const priceElements = screen.getAllByText("Price: 450.25");
      expect(priceElements.length).toBeGreaterThan(0);
      expect(priceElements[0]).toBeInTheDocument();
    });
  });

  it("should apply correct styling classes to each card", () => {
    renderWithQueryClient();

    const cards = screen.getAllByTestId("commodits-card");
    
    // Wheat card (success styling)
    expect(cards[0]).toHaveClass(
      "border-2", 
      "border-success-200", 
      "bg-success-100", 
      "dark:bg-success-900", 
      "dark:border-success-800"
    );

    // Corn card (warning styling)
    expect(cards[1]).toHaveClass(
      "border-2", 
      "border-warning-200", 
      "bg-warning-50", 
      "dark:bg-warning-900", 
      "dark:border-warning-800"
    );

    // Dollar card (info styling)
    expect(cards[2]).toHaveClass(
      "border-2", 
      "border-info-200", 
      "bg-info-100", 
      "dark:bg-info-900", 
      "dark:border-info-800"
    );
  });

  it("should apply correct icon styling", () => {
    renderWithQueryClient();

    const icons = screen.getAllByTestId("icon");
    
    icons.forEach(icon => {
      expect(icon).toHaveClass("size-8");
    });

    // Check specific color classes
    expect(icons[0]).toHaveClass("text-success-600", "dark:text-success-200");
    expect(icons[1]).toHaveClass("text-warning-600", "dark:text-warning-200");
    expect(icons[2]).toHaveClass("text-info-600", "dark:text-info-200");
  });

  it("should show toast notification for API errors", async () => {
    const errorResponse = {
      "Error Message": "Invalid API call. Please check your API key."
    };
    
    mockQuoteService.get.mockResolvedValue(errorResponse);
    
    renderWithQueryClient();

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        type: "error",
        message: "Wheat: Invalid API call. Please check your API key.",
      });
    });
  });

  it("should show toast notification for API information messages", async () => {
    const infoResponse = {
      "Information": "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute."
    };
    
    mockQuoteService.get.mockResolvedValue(infoResponse);
    
    renderWithQueryClient();

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        type: "info",
        message: "Wheat: Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute.",
      });
    });
  });

  it("should have proper responsive layout classes", () => {
    const { container } = renderWithQueryClient();

    const section = container.querySelector("section");
    expect(section).toHaveClass(
      "flex", 
      "flex-row", 
      "gap-4", 
      "w-full", 
      "items-center", 
      "justify-center", 
      "max-lg:flex-col"
    );
  });

  it("should handle API key changes", async () => {
    const { rerender } = renderWithQueryClient("first-key");

    expect(mockQuoteService.get).toHaveBeenCalledWith("Wheat", "first-key");

    // Change API key
    mockUseApiKey.mockReturnValue({
      apiKey: "second-key",
      setApiKey: jest.fn(),
    });

    rerender(
      <QueryClientProvider client={queryClient}>
        <Quotes />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(mockQuoteService.get).toHaveBeenCalledWith("Wheat", "second-key");
    });
  });

  describe("accessibility", () => {
    it("should render as a semantic section", () => {
      const { container } = renderWithQueryClient();
      
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass(
        "flex", 
        "flex-row", 
        "gap-4", 
        "w-full", 
        "items-center", 
        "justify-center", 
        "max-lg:flex-col"
      );
    });

    it("should provide meaningful content for screen readers", () => {
      renderWithQueryClient();
      
      const cards = screen.getAllByTestId("commodits-card");
      expect(cards).toHaveLength(3);
      
      cards.forEach(card => {
        expect(card).toBeInTheDocument();
      });
    });
  });
});
