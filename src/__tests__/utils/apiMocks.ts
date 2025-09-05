/* eslint-disable @typescript-eslint/no-explicit-any */
// Mock axios
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: {
        use: jest.fn(),
        eject: jest.fn(),
      },
      response: {
        use: jest.fn(),
        eject: jest.fn(),
      },
    },
  })),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

// Mock API responses
export const mockApiResponses = {
  quotes: {
    success: {
      "Global Quote": {
        "01. symbol": "CORN",
        "02. name": "Corn Futures",
        "05. price": "450.25",
        "07. latest trading day": "2024-01-15",
        "09. change": "+5.50",
        "10. change percent": "+1.24%",
      }
    },
    error: {
      "Error Message": "Invalid API call. Please retry or visit the documentation for more information."
    },
    rateLimit: {
      "Information": "Thank you for using Alpha Vantage! Our standard API call frequency is 5 calls per minute and 500 calls per day."
    }
  },
  commodities: {
    success: {
      "Time Series (Daily)": {
        "2024-01-15": {
          "1. open": "445.00",
          "2. high": "455.00",
          "3. low": "440.00",
          "4. close": "450.25",
          "5. volume": "125000"
        },
        "2024-01-14": {
          "1. open": "440.00",
          "2. high": "450.00",
          "3. low": "435.00",
          "4. close": "445.00",
          "5. volume": "110000"
        }
      },
      "Meta Data": {
        "1. Information": "Daily Prices (open, high, low, close) and Volumes",
        "2. Symbol": "CORN",
        "3. Last Refreshed": "2024-01-15",
        "4. Output Size": "Compact",
        "5. Time Zone": "US/Eastern"
      }
    }
  }
};

// Mock fetch
export const mockFetch = (response: any, ok = true, status = 200) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
    } as Response)
  );
};

// Mock API endpoints
export const mockApiEndpoints = {
  quotes: (symbol: string) => `/api/quotes/${symbol}`,
  commodities: (symbol: string) => `/api/commodities/${symbol}`,
  search: (query: string) => `/api/search?q=${query}`,
};

// Mock API client
export class MockApiClient {
  static mockResponses: { [key: string]: any } = {};

  static setMockResponse(endpoint: string, response: any) {
    this.mockResponses[endpoint] = response;
  }

  static clearMocks() {
    this.mockResponses = {};
  }

  static async get(endpoint: string) {
    if (this.mockResponses[endpoint]) {
      return { data: this.mockResponses[endpoint] };
    }
    throw new Error(`No mock response set for ${endpoint}`);
  }
}

// Mock React Query hooks
export const mockUseQuery = (data: any, isLoading = false, error: any = null) => ({
  data,
  isLoading,
  error,
  refetch: jest.fn(),
  isFetching: false,
  isError: !!error,
  isSuccess: !isLoading && !error,
});

export const mockUseMutation = (mutationFn: any = jest.fn()) => ({
  mutate: mutationFn,
  mutateAsync: mutationFn,
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
  data: null,
  reset: jest.fn(),
});

// Mock Next.js API routes
export const mockApiHandler = (handler: any) => {
  return {
    GET: handler,
    POST: handler,
    PUT: handler,
    DELETE: handler,
  };
};

// Environment variable mocks
export const mockEnvVars = {
  ALPHA_VANTAGE_API_KEY: "mock_api_key_12345",
  NEXTAUTH_SECRET: "mock_nextauth_secret",
  NEXTAUTH_URL: "http://localhost:3000",
};

// Mock localStorage
export const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Setup for tests
export const setupApiMocks = () => {
  // Mock localStorage
  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
  });

  // Mock environment variables
  process.env = { ...process.env, ...mockEnvVars };
};

// Cleanup for tests
export const cleanupApiMocks = () => {
  jest.clearAllMocks();
  MockApiClient.clearMocks();
  mockLocalStorage.clear();
};
