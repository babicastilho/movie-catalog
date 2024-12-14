import { createStore } from "vuex";
import uiState from "./uiState";
import themeState from "./themeState";
import moviesState from "./moviesState";
import movieDetails from "./movieDetails"; // Importação do módulo movieDetails

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
    movieDetails: {
      namespaced: true,
      ...movieDetails,
    },
  },
});
