import { createStore } from "vuex";

// Import Vuex modules
import uiState from "./uiState";
import themeState from "./themeState";
import movieDetails from "./movieDetails";
import moviesState from "./moviesState";

// Define the global State interface based on the modules' states
export interface State {
  uiState: typeof uiState.state;
  themeState: typeof themeState.state;
  moviesState: typeof moviesState.state;
  movieDetails: typeof movieDetails.state;
}

// Create the Vuex store instance with modules
export default createStore<State>({
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
