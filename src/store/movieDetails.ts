/**
 * movieDetails.ts
 * Vuex module for managing the state and actions related to movie details and cast information.
 *
 * This file is responsible for:
 * - Defining the structure of the movie and cast objects.
 * - Managing the loading, error, and detailed data states for a selected movie.
 * - Fetching movie and cast data from an external API using Vuex actions.
 * - Updating the state with mutations for seamless integration across components.
 *
 * **Key Functionalities**:
 * - **State Management**:
 *   - Holds the details of the currently selected movie (`movie`).
 *   - Stores the cast information (`cast`), limited to the top 10 members for clarity.
 *   - Tracks the loading state (`isLoading`) and error messages (`error`) for better UX.
 *
 * - **Mutations**:
 *   - `setMovie`: Updates the movie details in the state.
 *   - `setCast`: Updates the cast list in the state.
 *   - `setLoading`: Toggles the loading state during API calls.
 *   - `setError`: Stores error messages if an API call fails.
 *
 * - **Actions**:
 *   - `fetchMovieDetails`: Fetches detailed movie and cast information from The Movie Database (TMDB) API.
 *   - Handles errors gracefully and updates state accordingly.
 *
 * @interface Movie - Defines the structure for movie details.
 * @property {number} id - The unique identifier for the movie.
 * @property {string} title - The title of the movie.
 * @property {string} overview - A brief description of the movie.
 * @property {string} poster_path - Path to the movie's poster image.
 * @property {string} release_date - The release date of the movie.
 * @property {Array<{id: number, name: string}>} genres - A list of genres associated with the movie.
 *
 * @interface Cast - Defines the structure for cast members.
 * @property {number} id - The unique identifier for the cast member.
 * @property {string} name - The name of the cast member.
 * @property {string} character - The character played by the cast member.
 *
 * @interface MovieState - Defines the Vuex state structure for this module.
 * @property {Movie | null} movie - The selected movie's details.
 * @property {Cast[]} cast - List of cast members for the selected movie.
 * @property {boolean} isLoading - Indicates whether a fetch operation is in progress.
 * @property {string | null} error - Stores error messages related to fetch operations.
 *
 * @exports - The Vuex module setup is exported for use in the application.
 */

import { Module } from "vuex";

// Movie interface definition
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
}

// Cast interface definition
export interface Cast {
  id: number;
  name: string;
  character: string;
}

// Vuex state interface definition
export interface MovieState {
  movie: Movie | null;
  cast: Cast[];
  isLoading: boolean;
  error: string | null;
}

const movieDetails: Module<MovieState, any> = {
  namespaced: true,
  state: {
    movie: null,
    cast: [],
    isLoading: false,
    error: null,
  },
  mutations: {
    // Updates the state with the movie details
    setMovie(state, movie: Movie) {
      state.movie = movie;
    },
    // Updates the state with the cast list
    setCast(state, cast: Cast[]) {
      state.cast = cast;
    },
    // Toggles the loading state
    setLoading(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    // Stores error messages in the state
    setError(state, error: string | null) {
      state.error = error;
    },
  },
  actions: {
    // Fetches movie details and cast information from the TMDB API
    async fetchMovieDetails({ commit }, movieId: number) {
      console.log("Fetching movie details for ID:", movieId);
      commit("setLoading", true);
      commit("setError", null);

      try {
        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
        );

        if (!movieResponse.ok) {
          throw new Error(
            `Failed to fetch movie details. Status: ${movieResponse.status}`
          );
        }

        const movie = await movieResponse.json();
        commit("setMovie", movie);

        // Fetch cast details
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
        );

        if (!creditsResponse.ok) {
          throw new Error(
            `Failed to fetch cast details. Status: ${creditsResponse.status}`
          );
        }

        const credits = await creditsResponse.json();
        commit("setCast", credits.cast.slice(0, 10)); // Mostra os 10 primeiros membros do elenco
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load movie details.";
        commit("setError", errorMessage);
      } finally {
        commit("setLoading", false);
      }
    },
  },
};

export default movieDetails;
