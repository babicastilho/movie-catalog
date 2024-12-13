import { createStore } from "vuex";
import uiState from "./uiState";
import themeState from "./themeState";
import moviesState from "./moviesState"; // Importação do módulo moviesState

export default createStore({
  modules: {
    uiState: {
      namespaced: true,
      ...uiState,
    },
    themeState: {
      namespaced: true,
      ...themeState,
    },
    moviesState: {
      namespaced: true,
      ...moviesState,
    },
  },
});
