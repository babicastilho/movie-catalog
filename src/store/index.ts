import { createStore } from "vuex";
import uiState from "./uiState";
import themeState from "./themeState";

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
  },
});
