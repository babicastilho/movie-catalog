import { ActionContext } from "vuex";
import { MoviesState } from "@/store/moviesState";

export function createMockActionContext(): Partial<
  ActionContext<MoviesState, any>
> {
  return {
    commit: jest.fn(),
    dispatch: jest.fn(),
    state: {
      movies: [],
      totalPages: 0,
      currentPage: 1,
      genre: "28",
      error: null,
      isLoading: false,
      selectedMovie: null,
      itemsPerPage: 10,
    },
    getters: {},
    rootState: {},
    rootGetters: {},
  };
}
