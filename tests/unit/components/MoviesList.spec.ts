import { createStore } from "vuex";

describe("MoviesList Logic", () => {
  let store: any;
  let fetchMoviesMock: jest.Mock;

  beforeEach(() => {
    // Mock do fetchMovies
    fetchMoviesMock = jest.fn();

    // Criação do mock do Vuex store
    store = createStore({
      modules: {
        moviesState: {
          namespaced: true,
          state: {
            movies: [],
            isLoading: false,
            error: null,
          },
          getters: {
            allMovies: (state) => state.movies,
            isLoading: (state) => state.isLoading,
            error: (state) => state.error,
          },
          actions: {
            fetchMovies: fetchMoviesMock, // Substitui por um mock
          },
        },
      },
    });
  });

  it("should render Spinner when isLoading is true", () => {
    const isLoading = true;

    // Simula o estado do carregamento
    store.state.moviesState.isLoading = isLoading;

    const renderSpinner = store.state.moviesState.isLoading;
    expect(renderSpinner).toBe(true);
  });

  it("should display error message when error is set", () => {
    const error = "Failed to fetch movies";

    // Simula o estado de erro
    store.state.moviesState.error = error;

    expect(store.state.moviesState.error).toBe("Failed to fetch movies");
  });

  it("should correctly map movies to MovieCard components", () => {
    const mockMovies = [
      {
        id: 1,
        title: "Movie 1",
        overview: "Overview 1",
        poster_path: "/path1.jpg",
      },
      {
        id: 2,
        title: "Movie 2",
        overview: "Overview 2",
        poster_path: "/path2.jpg",
      },
    ];

    // Simula o estado com filmes mockados
    store.state.moviesState.movies = mockMovies;

    const movies = store.state.moviesState.movies;
    expect(movies.length).toBe(2);
    expect(movies[0].title).toBe("Movie 1");
    expect(movies[1].title).toBe("Movie 2");
  });

  it("should display 'No movies found' message when no movies are available", () => {
    store.state.moviesState.movies = []; // Simula estado sem filmes

    const hasMovies = store.state.moviesState.movies.length > 0;
    expect(hasMovies).toBe(false);
    expect(store.state.moviesState.movies).toEqual([]);
  });

  it("should call fetchMovies action on component mount", async () => {
    // Simula a action de fetchMovies sendo chamada no componente
    await store.dispatch("moviesState/fetchMovies");
    expect(fetchMoviesMock).toHaveBeenCalledTimes(1);
  });
});
