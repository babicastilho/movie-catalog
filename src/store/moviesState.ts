import { Module, MutationTree, ActionTree, ActionContext } from "vuex";

export interface MoviesState {
  movies: any[]; // Filmes exibidos na página atual
  totalPages: number; // Número total de páginas
  currentPage: number; // Página atual
  genre: string; // Gênero do filtro
  error: string | null; // Mensagens de erro
  isLoading: boolean; // Estado de carregamento
  selectedMovie: any | null; // Filme selecionado
  itemsPerPage: number; // Número de itens por página
}

type MoviesActionContext = ActionContext<MoviesState, any>;

export const mutations: MutationTree<MoviesState> = {
  setMovies(state, payload) {
    state.movies = payload.movies;
    state.totalPages = payload.totalPages;
    console.log(
      `Movies updated: ${state.movies.length} movies, Total pages: ${state.totalPages}`
    );
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
  async searchMovies({ commit }, query: string) {
    commit("setLoading", true);

    try {
      console.log(`Searching movies for query: ${query}`);

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.VUE_APP_TMDB_API_KEY
        }&query=${encodeURIComponent(query)}&language=en-US`
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
      console.error("Error searching movies:", err);
      commit("setError", "Failed to search movies. Please try again later.");
    } finally {
      commit("setLoading", false);
    }
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
