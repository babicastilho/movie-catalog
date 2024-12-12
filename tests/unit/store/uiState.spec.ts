import uiState from "@/store/uiState";

describe("uiState Vuex module", () => {
  let state: any;

  beforeEach(() => {
    state = { ...uiState.state };
  });

  it("should have sidebar closed by default", () => {
    expect(state.isSidebarOpen).toBe(false);
  });

  it("should toggle sidebar state", () => {
    uiState.mutations.toggleSidebar(state);
    expect(state.isSidebarOpen).toBe(true);
  });

  it("should set sidebar state explicitly", () => {
    uiState.mutations.setSidebarState(state, false);
    expect(state.isSidebarOpen).toBe(false);
  });
});
