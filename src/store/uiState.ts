interface UIState {
  isSidebarOpen: boolean;
  isSearchOverlayOpen: boolean; // Adicionado para o overlay de busca
}

const state: UIState = {
  isSidebarOpen: false,
  isSearchOverlayOpen: false, // Inicialmente fechado
};

const mutations = {
  toggleSidebar(state: UIState) {
    state.isSidebarOpen = !state.isSidebarOpen;
  },
  setSidebarState(state: UIState, isOpen: boolean) {
    state.isSidebarOpen = isOpen;
  },
  setSearchOverlay(state: UIState, isOpen: boolean) {
    state.isSearchOverlayOpen = isOpen; // Mutation para alterar o estado do overlay de busca
  },
};

const getters = {
  isSidebarOpen: (state: UIState) => state.isSidebarOpen,
  isSearchOverlayOpen: (state: UIState) => state.isSearchOverlayOpen, // Getter para acessar o estado do overlay
};

export default {
  state,
  mutations,
  getters,
};
