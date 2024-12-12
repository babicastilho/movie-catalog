import { toggleTheme } from "@/utils/themeUtils";

describe("themeUtils", () => {
  let mockLocalStorage: Record<string, string>;

  beforeAll(() => {
    // Mock DOM classList
    Object.defineProperty(document.documentElement, "classList", {
      value: {
        add: jest.fn(),
        remove: jest.fn(),
        contains: jest.fn((className) => mockLocalStorage["theme"] === "dark"),
        toggle: jest.fn((className, force) => force),
      },
      writable: true,
    });

    // Mock localStorage
    mockLocalStorage = {};
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn((key) => mockLocalStorage[key] || null),
        setItem: jest.fn((key, value) => {
          mockLocalStorage[key] = value;
        }),
      },
      writable: true,
    });
  });

  beforeEach(() => {
    // Reset mocks before each test
    mockLocalStorage = { theme: "dark" }; // Default to dark for your setup
    jest.clearAllMocks();
  });

  it("should toggle theme from light to dark", () => {
    expect(toggleTheme("light")).toBe("dark");
  });

  it("should toggle theme from dark to light", () => {
    expect(toggleTheme("dark")).toBe("light");
  });

  it("should keep the current theme for invalid inputs", () => {
    expect(toggleTheme("invalid")).toBe("invalid"); // Keeps the current theme
  });

  it("should toggle theme and update DOM classList", () => {
    toggleTheme("light");
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      true
    );
  });

  it("should persist the theme change in localStorage", () => {
    toggleTheme("dark");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  });
});
