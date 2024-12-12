// Import necessary modules
import themeState from "@/store/themeState";
import { createStore } from "vuex";

describe("themeState Vuex module", () => {
  let store: any;
  let mockLocalStorage: Record<string, string> = {};

  // Mock global objects before all tests
  beforeAll(() => {
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn((key) => mockLocalStorage[key] || null),
        setItem: jest.fn((key, value) => {
          mockLocalStorage[key] = value;
        }),
        removeItem: jest.fn((key) => {
          delete mockLocalStorage[key];
        }),
      },
      writable: true,
    });

    // Mock DOM classList
    Object.defineProperty(document.documentElement, "classList", {
      value: {
        add: jest.fn(),
        remove: jest.fn(),
        contains: jest.fn((className) => className === "dark"),
        toggle: jest.fn((className, force) => force),
      },
      writable: true,
    });
  });

  // Reset mockLocalStorage before each test
  beforeEach(() => {
    mockLocalStorage = {};

    store = createStore({
      modules: {
        themeState: {
          ...themeState,
          namespaced: true, // Ensure module is namespaced
        },
      },
    });
  });

  // Test default theme state
  it("should have a default theme", () => {
    expect(store.state.themeState.theme).toBe("light");
  });

  // Test theme change from light to dark
  it("should toggle the theme from light to dark", () => {
    store.commit("themeState/setTheme", "dark");
    expect(store.state.themeState.theme).toBe("dark");
    expect(document.documentElement.classList.add).toHaveBeenCalledWith("dark");
  });

  // Test toggling the theme using an action
  it("should toggle the theme using action", async () => {
    store.commit("themeState/setTheme", "light");
    await store.dispatch("themeState/toggleTheme");
    expect(store.state.themeState.theme).toBe("dark");
    expect(document.documentElement.classList.add).toHaveBeenCalledWith("dark");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  // Test persistence of theme changes in localStorage
  it("should persist theme changes in localStorage", () => {
    store.commit("themeState/setTheme", "dark");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    expect(mockLocalStorage["theme"]).toBe("dark");
  });
});
