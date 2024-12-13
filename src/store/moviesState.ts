//
// moviesState.ts
// Vuex module to manage movies-related state and actions.
//
// This module is responsible for handling the following features:
// - Fetching and storing a list of movies based on filters (e.g., genre, page).
// - Managing pagination (current page, total pages).
// - Filtering movies by genre and managing items per page.
// - Handling loading states and errors during API calls.
// - Supporting movie selection for detailed views.
//
// Mutations:
// - setMovies: Updates the list of movies and total pages in the state.
// - setPage: Updates the current page.
// - setItemsPerPage: Sets the number of items per page.
// - setGenre: Updates the genre filter.
// - setError: Stores an error message in the state.
// - setLoading: Toggles the loading state.
// - setSelectedMovie: Stores the selected movie for detailed views.
//
// Actions:
// - fetchMovies: Fetches movies from the TMDB API based on the current state (page, genre, etc.).
// - setPage: Updates the current page and triggers fetchMovies.
// - setItemsPerPage: Updates items per page and triggers fetchMovies.
//

import { Module, MutationTree, ActionTree, ActionContext } from "vuex";

export interface MoviesState {
  movies: any[];
  totalPages: number;
  currentPage: number;
  genre: string;
  error: string | null;
  isLoading: boolean;
  selectedMovie: any | null;
  itemsPerPage: number;
}

type MoviesActionContext = ActionContext<MoviesState, any>;

export const mutations: MutationTree<MoviesState> = {
  setMovies(state, payload) {
    state.movies = payload.movies;
    state.totalPages = payload.totalPages;
  },
  setPage(state, page: number) {
    state.currentPage = page;
  },
  setItemsPerPage(state, items: number) {
    state.itemsPerPage = items;
  },
  setGenre(state, genre: string) {
    state.genre = genre;
  },
  setError(state, error: string | null) {
    state.error = error;
  },
  setLoading(state, isLoading: boolean) {
    state.isLoading = isLoading;
  },
  setSelectedMovie(state, movie: any) {
    state.selectedMovie = movie;
  },
};

const actions: ActionTree<MoviesState, any> = {
  async fetchMovies({ commit, state }: MoviesActionContext) {
    commit("setLoading", true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_TMDB_API_KEY}&page=${state.currentPage}&with_genres=${state.genre}`
      );
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      const data = await response.json();
      commit("setMovies", {
        movies: data.results,
        totalPages: data.total_pages,
      });
      commit("setError", null);
    } catch (err) {
      commit("setError", "Failed to fetch movies. Please try again later.");
    } finally {
      commit("setLoading", false);
    }
  },
  setPage({ commit, dispatch }: MoviesActionContext, page: number) {
    commit("setPage", page);
    dispatch("fetchMovies");
  },
  setItemsPerPage({ commit, dispatch }: MoviesActionContext, items: number) {
    commit("setItemsPerPage", items);
    dispatch("fetchMovies");
  },
};

const moviesState: Module<MoviesState, any> = {
  namespaced: true,
  state: (): MoviesState => ({
    movies: [],
    totalPages: 0,
    currentPage: 1,
    itemsPerPage: 10,
    genre: "28",
    error: null,
    isLoading: false,
    selectedMovie: null,
  }),
  mutations,
  actions,
};

export default moviesState;
