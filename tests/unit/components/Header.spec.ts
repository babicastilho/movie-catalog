import { shallowMount, VueWrapper } from "@vue/test-utils";
import Header from "@/components/layout/Header.vue";
import { createStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

describe("Header.vue", () => {
  let wrapper: VueWrapper<any>;
  let store: any;
  let toggleThemeMock: jest.Mock;
  let toggleSidebarMock: jest.Mock;

  beforeEach(() => {
    // Mocks para ações e mutações
    toggleThemeMock = jest.fn();
    toggleSidebarMock = jest.fn();

    // Mock Vuex store
    store = createStore({
      modules: {
        uiState: {
          namespaced: true,
          state: {
            isSidebarOpen: false,
          },
          mutations: {
            toggleSidebar: toggleSidebarMock, // Mock de commit
          },
        },
        themeState: {
          namespaced: true,
          state: {
            theme: "light",
          },
          actions: {
            toggleTheme: toggleThemeMock, // Mock de dispatch
          },
        },
      },
    });

    // Montar componente
    wrapper = shallowMount(Header, {
      global: {
        plugins: [store],
        components: {
          "font-awesome-icon": FontAwesomeIcon, // Mock para font-awesome-icon
        },
      },
    });
  });

  it("renders the title correctly", () => {
    const title = wrapper.find('[data-testid="header-title"]');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Movie Catalog");
  });

  it("renders the desktop toggle theme button", () => {
    const themeButton = wrapper.find('[data-testid="toggle-theme-button"]');
    expect(themeButton.exists()).toBe(true);
    expect(themeButton.classes()).toContain("lg:block");
  });

  it("renders the mobile menu button", () => {
    const menuButton = wrapper.find('[data-testid="toggle-sidebar-button"]');
    expect(menuButton.exists()).toBe(true);
    expect(menuButton.classes()).toContain("lg:hidden");
  });

  it("emits toggleTheme action on theme button click", async () => {
    const themeButton = wrapper.find('[data-testid="toggle-theme-button"]');
    await themeButton.trigger("click");
    expect(toggleThemeMock).toHaveBeenCalled(); // Verifica se o dispatch foi chamado
  });

  it("emits toggleSidebar mutation on menu button click", async () => {
    const menuButton = wrapper.find('[data-testid="toggle-sidebar-button"]');
    await menuButton.trigger("click");
    expect(toggleSidebarMock).toHaveBeenCalled(); // Verifica se o commit foi chamado
  });
});
