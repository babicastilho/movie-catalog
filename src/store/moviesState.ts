/**
 * moviesState.ts
 * Manages the state for movies in the Vuex store.
 *
 * This module is responsible for handling the list of movies, pagination, genre filtering,
 * errors, and API integration. It also includes functionality for searching movies by title.
 *
 * @module Vuex Movies State
 * @state movies - The list of movies displayed on the current page.
 * @state totalPages - Total number of pages available for the current genre or search query.
 * @state currentPage - The current page number being viewed.
 * @state genre - The genre filter applied to the movies list.
 * @state error - Stores any errors encountered during API requests.
 * @state isLoading - Indicates whether the movies list is being fetched.
 * @state selectedMovie - The movie currently selected or viewed in detail.
 * @state itemsPerPage - Number of items displayed per page.
 *
 * @actions fetchMovies - Fetches movies from the API based on the current page and genre.
 * @actions searchMovies - Searches movies by title from the API.
 *
 * @mutations setMovies - Updates the state with the list of movies and total pages.
 * @mutations setPage - Updates the current page number.
 * @mutations setGenre - Sets the genre filter.
 * @mutations setError - Updates the error state.
 * @mutations setLoading - Toggles the loading state.
 * @mutations setSelectedMovie - Updates the currently selected movie.
 */

import { Module, MutationTree, ActionTree, ActionContext } from "vuex";

// Interface defining the structure of the movies state
export interface MoviesState {
  movies: any[]; // List of movies displayed on the current page
  totalPages: number; // Total number of pages available
  currentPage: number; // Current page number
  genre: string; // Genre filter applied to the movies list
  error: string | null; // Error messages from API requests
  isLoading: boolean; // Indicates if the API call is in progress
  selectedMovie: any | null; // The currently selected movie
  itemsPerPage: number; // Number of items displayed per page
}

type MoviesActionContext = ActionContext<MoviesState, any>;

// Vuex mutations for updating the movies state
export const mutations: MutationTree<MoviesState> = {
  setMovies(state, payload) {
    // Updates the list of movies and total pages
    state.movies = payload.movies;
    state.totalPages = payload.totalPages;
    console.log(
      `Movies updated: ${state.movies.length} movies, Total pages: ${state.totalPages}`
    );
  },
  setPage(state, page: number) {
    // Updates the current page number
    state.currentPage = page;
  },
  setItemsPerPage(state, items: number) {
    // Updates the number of items displayed per page
    state.itemsPerPage = items;
  },
  setGenre(state, genre: string) {
    // Updates the genre filter
    state.genre = genre;
  },
  setError(state, error: string | null) {
    // Updates the error message
    state.error = error;
  },
  setLoading(state, isLoading: boolean) {
    // Toggles the loading state
    state.isLoading = isLoading;
  },
  setSelectedMovie(state, movie: any) {
    // Updates the currently selected movie
    state.selectedMovie = movie;
  },
};

// Vuex actions for managing the movies state
const actions: ActionTree<MoviesState, any> = {
  async fetchMovies({ commit, state }: MoviesActionContext) {
    commit("setLoading", true);

    try {
      const { currentPage, itemsPerPage, genre } = state;

      console.log(
        `Fetching movies: Page ${currentPage}, Items per page: ${itemsPerPage}, Genre: ${genre}`
      );

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_TMDB_API_KEY}&page=${currentPage}&with_genres=${genre}&language=en-US`
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();

      const filteredMovies = data.results.filter((movie: any) =>
        movie.genre_ids.includes(Number(genre))
      );

      const totalFilteredMovies = filteredMovies.length;
      const totalPages = Math.ceil(totalFilteredMovies / itemsPerPage);

      commit("setMovies", {
        movies: filteredMovies.slice(0, itemsPerPage),
        totalPages,
      });

      commit("setError", null);
    } catch (err) {
      console.error("Error fetching movies:", err);
      commit("setError", "Failed to fetch movies. Please try again later.");
    } finally {
      commit("setLoading", false);
    }
  },
  async searchMovies({ commit, state }: MoviesActionContext, query: string) {
    commit("setLoading", true);

    try {
      console.log(`Searching movies for query: ${query}`);

      // Fetch search results
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.VUE_APP_TMDB_API_KEY
        }&query=${encodeURIComponent(query)}&language=en-US`
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();

      // Filter movies manually based on the current genre stored in Vuex
      const filteredMovies = data.results.filter((movie: any) => {
        return movie.genre_ids && movie.genre_ids.includes(Number(state.genre));
      });

      // Commit filtered movies to the store
      commit("setMovies", {
        movies: filteredMovies,
        totalPages: Math.ceil(filteredMovies.length / state.itemsPerPage),
      });

      commit("setError", null);
    } catch (err) {
      console.error("Error searching movies:", err);
      commit("setError", "Failed to search movies. Please try again later.");
    } finally {
      commit("setLoading", false);
    }
  },
};

// Vuex module for managing movies state
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
