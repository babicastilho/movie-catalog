interface UIState {
  isSidebarOpen: boolean;
}

const state: UIState = {
  isSidebarOpen: false,
};

const mutations = {
  toggleSidebar(state: UIState) {
    state.isSidebarOpen = !state.isSidebarOpen;
  },
  setSidebarState(state: UIState, isOpen: boolean) {
    state.isSidebarOpen = isOpen;
  },
};

const getters = {
  isSidebarOpen: (state: UIState) => state.isSidebarOpen,
};

export default {
  state,
  mutations,
  getters,
};
