import { shallowMount } from "@vue/test-utils";
import MoviesList from "@/components/movies/MoviesList.vue";
import { createStore } from "vuex";

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
          },
          actions: {
            fetchMovies: fetchMoviesMock, // Substitui por um mock
          },
        },
      },
    });
  });

  it("renders loader when isLoading is true", () => {
    store.state.moviesState.isLoading = true;
    const wrapper = shallowMount(MoviesList, {
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain("Loading...");
  });

  it("renders error message when error is set", () => {
    store.state.moviesState.error = "Failed to fetch movies";
    const wrapper = shallowMount(MoviesList, {
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain("Failed to fetch movies");
  });

  it("renders movies when movies state is populated", () => {
    store.state.moviesState.movies = [
      {
        id: 1,
        title: "Movie 1",
        overview: "Overview 1",
        poster_path: "/path1.jpg",
      },
    ];
    const wrapper = shallowMount(MoviesList, {
      global: { plugins: [store] },
    });
    expect(wrapper.text()).toContain("Movie 1");
    expect(wrapper.html()).toContain(
      '<img src="https://image.tmdb.org/t/p/w500/path1.jpg"'
    );
  });

  it("calls fetchMovies action on component mount", () => {
    shallowMount(MoviesList, {
      global: { plugins: [store] },
    });
    expect(fetchMoviesMock).toHaveBeenCalled(); // Verifica se o mock foi chamado
  });
});
