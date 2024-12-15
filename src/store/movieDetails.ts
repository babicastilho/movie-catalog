import { Module } from "vuex";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
}

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
    setMovie(state, movie: Movie) {
      state.movie = movie;
    },
    setCast(state, cast: Cast[]) {
      state.cast = cast;
    },
    setLoading(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    setError(state, error: string | null) {
      state.error = error;
    },
  },
  actions: {
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
