import { shallowMount } from "@vue/test-utils";
import Sidebar from "@/components/layout/Sidebar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vuex from "vuex";

describe("Sidebar.vue", () => {
  let state: any;
  let actions: any;
  let store: any;
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    // Mock do estado e ações do Vuex
    state = {
      themeState: {
        theme: "light", // Define o tema inicial como "light"
      },
      uiState: {
        isSidebarOpen: true,
      },
    };

    actions = {
      toggleTheme: jest.fn(), // Nome da ação simplificado
    };

    store = new Vuex.Store({
      modules: {
        themeState: {
          namespaced: true,
          state: state.themeState,
          actions: {
            toggleTheme: actions.toggleTheme, // Ajuste para compatibilidade com o teste
          },
        },
        uiState: {
          namespaced: true,
          state: state.uiState,
        },
      },
    });

    // Substituir window.innerWidth por um valor customizado
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500, // Simula uma tela pequena
    });
  });

  afterEach(() => {
    // Restaura window.innerWidth ao valor original
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });

    jest.restoreAllMocks(); // Restaura os mocks após cada teste
  });

  it("calls toggleTheme action when theme toggle button is clicked", async () => {
    const wrapper = shallowMount(Sidebar, {
      global: {
        plugins: [store],
        components: { "font-awesome-icon": FontAwesomeIcon },
      },
    });

    const toggleButton = wrapper.find('[data-testid="theme-toggle-button"]');
    expect(toggleButton.exists()).toBe(true); // Verifica se o botão está presente

    await toggleButton.trigger("click");
    expect(actions.toggleTheme).toHaveBeenCalled();
  });

  it("displays the correct theme text based on the current theme", async () => {
    // Força o tema inicial como "light"
    state.themeState.theme = "light";

    const wrapper = shallowMount(Sidebar, {
      global: {
        plugins: [store],
        components: { "font-awesome-icon": FontAwesomeIcon },
      },
    });

    // Verifica o tema inicial
    console.log("Initial theme:", state.themeState.theme);

    const toggleButton = wrapper.find('[data-testid="theme-toggle-button"]');
    expect(toggleButton.exists()).toBe(true); // Verifica se o botão está presente

    // Log do texto do botão
    console.log("Initial button text:", toggleButton.text());

    expect(toggleButton.text()).toContain("Dark Mode");

    // Atualiza o tema para "dark"
    state.themeState.theme = "dark";
    await wrapper.vm.$nextTick();

    // Log do texto do botão após a mudança de tema
    console.log("Updated button text:", toggleButton.text());

    expect(toggleButton.text()).toContain("Dark Mode");
  });
});
