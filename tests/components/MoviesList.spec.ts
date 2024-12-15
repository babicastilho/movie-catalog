import { shallowMount } from "@vue/test-utils";
import MoviesList from "@/components/movies/MoviesList.vue";
import { createStore } from "vuex";
import Spinner from "@/components/commom/Spinner.vue";
import MovieCard from "@/components/movies/MovieCard.vue";

describe("MoviesList.vue", () => {
  let store: any;
  let fetchMoviesMock: jest.Mock;

  beforeEach(() => {
    // Mock do fetchMovies
    fetchMoviesMock = jest.fn();

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

  it("renders Spinner when isLoading is true", () => {
    store.state.moviesState.isLoading = true;
    const wrapper = shallowMount(MoviesList, {
      global: { plugins: [store] },
    });
    expect(wrapper.findComponent(Spinner).exists()).toBe(true); // Verifica se o Spinner é renderizado
  });

  it("renders error message when error is set", () => {
    store.state.moviesState.error = "Failed to fetch movies";
    const wrapper = shallowMount(MoviesList, {
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain("Failed to fetch movies");
  });

  it("renders MovieCard components when movies state is populated", () => {
    store.state.moviesState.movies = [
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
    const wrapper = shallowMount(MoviesList, {
      global: {
        plugins: [store],
        components: { MovieCard }, // Adiciona o MovieCard como componente global para o teste
      },
    });
    expect(wrapper.findAllComponents(MovieCard).length).toBe(2); // Verifica se MovieCard é renderizado para cada filme
  });

  it("renders 'No movies found' message when no movies are available", () => {
    store.state.moviesState.movies = [];
    const wrapper = shallowMount(MoviesList, {
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain("No movies found");
  });

  it("calls fetchMovies action on component mount", () => {
    shallowMount(MoviesList, {
      global: { plugins: [store] },
    });
    expect(fetchMoviesMock).toHaveBeenCalled(); // Verifica se o mock foi chamado
  });
});
