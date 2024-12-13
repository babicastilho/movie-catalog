import { Module } from "vuex";

/**
 * Interface defining the state structure for movies.
 */
export interface MoviesState {
  movies: any[]; // Array to store movie objects retrieved from the API.
  totalPages: number; // Total number of pages available in the API response.
  currentPage: number; // Current page being viewed or fetched.
  genre: string; // Current genre filter applied to the movie list.
  error: string | null; // Error message, if an error occurs during API requests.
  isLoading: boolean; // Indicates if data is currently being fetched.
  selectedMovie: any | null; // Details of the currently selected movie.
}

/**
 * Vuex module to manage movies state and actions related to movie data.
 */
const moviesState: Module<MoviesState, any> = {
  namespaced: true, // Ensures this module's state, getters, and actions are namespaced.
  state: {
    movies: [], // Initial empty array to store fetched movies.
    totalPages: 0, // Initial total pages set to 0.
    currentPage: 1, // Initial current page set to the first page.
    genre: "28", // Default genre ID for "Action".
    error: null, // No error is present initially.
    isLoading: false, // Indicates the loading state; false by default.
    selectedMovie: null, // No movie is selected initially.
  },
  getters: {
    allMovies: (state) => state.movies,
    isLoading: (state) => state.isLoading,
    selectedMovie: (state) => state.selectedMovie,
  },
  mutations: {
    setMovies(state, payload) {
      state.movies = payload.movies;
      state.totalPages = payload.totalPages;
    },
    setPage(state, page: number) {
      state.currentPage = page;
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
  },
  actions: {
    async fetchMovies({ commit, state }) {
      commit("setLoading", true);
      try {
        console.log(
          `Fetching movies for page ${state.currentPage} and genre ${state.genre}`
        );
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.VUE_APP_TMDB_API_KEY}&page=${state.currentPage}&with_genres=${state.genre}`
        );
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Movies fetched:", data.results);
        commit("setMovies", {
          movies: data.results,
          totalPages: data.total_pages,
        });
        commit("setError", null);
      } catch (err) {
        const error = err as Error; // Explicitly type `err` as `Error`
        console.error("Error fetching movies:", error.message);
        commit("setError", "Failed to fetch movies. Please try again later.");
      } finally {
        commit("setLoading", false);
      }
    },
    async fetchMovieDetails({ commit }, id: string) {
      commit("setLoading", true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        const data = await response.json();
        commit("setSelectedMovie", data);
        commit("setError", null);
      } catch (err) {
        const error = err as Error; // Explicitly type `err` as `Error`
        console.error("Error fetching movie details:", error.message);
        commit(
          "setError",
          "Failed to fetch movie details. Please try again later."
        );
      } finally {
        commit("setLoading", false);
      }
    },
  },
};

export default moviesState;
