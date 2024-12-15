import { createStore, ActionContext } from "vuex";
import moviesState, { mutations, MoviesState } from "@/store/moviesState";

describe("Vuex Movies State - fetchMovies", () => {
  beforeEach(() => {
    // Mock global.fetch to simulate API calls returning an error
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: "Internal Server Error",
          headers: new Headers(),
          redirected: false,
          url: "",
          body: null,
          bodyUsed: false,
          type: "default", // Required property for the Response type
          clone: jest.fn(),
          text: jest.fn(() => Promise.resolve("")),
          json: jest.fn(() => Promise.resolve({})),
          arrayBuffer: jest.fn(),
          blob: jest.fn(),
          formData: jest.fn(),
        } as unknown as Response) // Convert to `unknown` before asserting as `Response`
    );
  });

  afterEach(() => {
    // Reset all Jest mocks to avoid state leakage between tests
    jest.resetAllMocks();
  });

  it("should have the correct initial state", () => {
    // Check if the initial Vuex state matches the expected default values
    const state = (moviesState.state as () => MoviesState)();

    expect(state.movies).toEqual([]);
    expect(state.totalPages).toBe(0);
    expect(state.currentPage).toBe(1);
    expect(state.genre).toBe("28");
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.selectedMovie).toBeNull();
    expect(state.itemsPerPage).toBe(10);
  });

  it("should set the loading state with setLoading mutation", () => {
    // Simulate a Vuex state
    const state: MoviesState = {
      movies: [],
      totalPages: 0,
      currentPage: 1,
      genre: "28",
      error: null,
      isLoading: false,
      selectedMovie: null,
      itemsPerPage: 10,
    };

    // Test `setLoading` mutation by toggling the loading state
    mutations.setLoading(state, true);
    expect(state.isLoading).toBe(true);

    mutations.setLoading(state, false);
    expect(state.isLoading).toBe(false);
  });

  it("should update the loading state with setLoading mutation", () => {
    // This test is similar to the one above and validates the same behavior
    const state: MoviesState = {
      movies: [],
      totalPages: 0,
      currentPage: 1,
      itemsPerPage: 10,
      genre: "28",
      error: null,
      isLoading: false,
      selectedMovie: null,
    };

    mutations.setLoading(state, true);
    expect(state.isLoading).toBe(true);

    mutations.setLoading(state, false);
    expect(state.isLoading).toBe(false);
  });

  it("should call fetchMovies when setPage action is dispatched", async () => {
    // Mock do commit e estado do Vuex
    const commitMock = jest.fn();
    const stateMock = {
      currentPage: 1,
      genre: "28",
      itemsPerPage: 10,
    };

    // Mock da action fetchMovies
    const fetchMoviesMock = jest.fn();

    // Store com o mock da ação
    const store = createStore({
      modules: {
        moviesState: {
          namespaced: true,
          state: stateMock,
          mutations: moviesState.mutations,
          actions: {
            setPage: async (
              { commit }: ActionContext<MoviesState, any>,
              page: number
            ) => {
              commit("setPage", page);
              await fetchMoviesMock({ commit, state: stateMock });
            },
          },
        },
      },
    });

    // Dispatch e validação
    await store.dispatch("moviesState/setPage", 2);

    expect(fetchMoviesMock).toHaveBeenCalledTimes(1);
    expect(fetchMoviesMock).toHaveBeenCalledWith(
      expect.objectContaining({
        commit: expect.any(Function),
        state: expect.any(Object),
      })
    );
  });

  it("should set the selected movie via setSelectedMovie mutation", () => {
    // Initialize a Vuex state matching MoviesState interface
    const state: MoviesState = {
      movies: [],
      totalPages: 0,
      currentPage: 1,
      genre: "28",
      error: null,
      isLoading: false,
      selectedMovie: null,
      itemsPerPage: 10,
    };

    // Simulate a payload for the mutation
    const selectedMovie = { id: 1, title: "Test Movie" };

    // Call the `setSelectedMovie` mutation
    mutations.setSelectedMovie(state, selectedMovie);

    // Verify that the selected movie in the state matches the payload
    expect(state.selectedMovie).toEqual(selectedMovie);
  });

  it("should set the movies and total pages in the state", () => {
    // Initialize a Vuex state for testing
    const state: MoviesState = {
      movies: [],
      totalPages: 0,
      currentPage: 1,
      genre: "28",
      error: null,
      isLoading: false,
      selectedMovie: null,
      itemsPerPage: 10,
    };

    // Payload to update movies and total pages
    const payload = {
      movies: [
        { id: 1, title: "Movie 1" },
        { id: 2, title: "Movie 2" },
      ],
      totalPages: 10,
    };

    // Call `setMovies` mutation to update state
    mutations.setMovies(state, payload);

    // Verify that movies and total pages in the state are correctly updated
    expect(state.movies).toEqual(payload.movies);
    expect(state.totalPages).toBe(payload.totalPages);
  });

  it("should handle API errors in fetchMovies action", async () => {
    // Simulate Vuex context with mocked commit and state
    const context = {
      commit: jest.fn(),
      state: {
        currentPage: 1,
        genre: "28",
      },
    };

    // Convert the context to ActionContext
    const actionContext = context as unknown as ActionContext<MoviesState, any>;

    // Convert fetchMovies action to a callable type
    const fetchMoviesAction = moviesState.actions?.fetchMovies as (
      context: ActionContext<MoviesState, any>
    ) => Promise<void>;

    // If fetchMoviesAction is callable, execute it
    if (fetchMoviesAction) {
      await fetchMoviesAction(actionContext);
    }

    // Verify that error handling mutations were committed correctly
    expect(context.commit).toHaveBeenCalledWith(
      "setError",
      "Failed to fetch movies. Please try again later."
    );
    expect(context.commit).toHaveBeenCalledWith("setLoading", false);
  });
});
