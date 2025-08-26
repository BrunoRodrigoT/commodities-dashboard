/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

// Test data mocks
export const mockCommodityData = {
  "01. symbol": "CORN",
  "02. name": "Corn Futures",
  "05. price": "450.25",
  "07. latest trading day": "2024-01-15",
  "09. change": "+5.50",
  "10. change percent": "+1.24%",
};

export const mockCommodityDataNegative = {
  "01. symbol": "WHEAT",
  "02. name": "Wheat Futures",
  "05. price": "620.10",
  "07. latest trading day": "2024-01-15",
  "09. change": "-8.20",
  "10. change percent": "-1.30%",
};

export const mockApiResponse = {
  "Global Quote": mockCommodityData,
};

export const mockApiResponseError = {
  "Error Message": "Invalid API call. Please check your API key.",
};

// Mock API functions
export const createMockApiResponse = (data: any, delay = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const createMockApiError = (message: string, delay = 0) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay);
  });
};

// Helper functions for testing
export const waitForLoadingToFinish = () => {
  return new Promise((resolve) => setTimeout(resolve, 0));
};

export const createMockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
};

// Theme Provider mock for testing dark/light themes
export const MockThemeProvider = ({
  children,
  theme = "light",
}: {
  children: React.ReactNode;
  theme?: string;
}) => {
  return (
    <div data-theme={theme} className={theme}>
      {children}
    </div>
  );
};

// Custom matchers (optional)
expect.extend({
  toHaveAccessibleName(received: Element, expected: string) {
    const accessibleName =
      received.getAttribute("aria-label") || received.textContent || "";

    const pass = accessibleName.includes(expected);

    if (pass) {
      return {
        message: () =>
          `expected element not to have accessible name containing "${expected}"`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected element to have accessible name containing "${expected}", but got "${accessibleName}"`,
        pass: false,
      };
    }
  },
});
