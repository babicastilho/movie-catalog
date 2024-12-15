/**
 * uiState.ts
 * Vuex module for managing UI state, including the sidebar and search overlay visibility.
 *
 * This file handles:
 * - State management for sidebar and search overlay visibility.
 * - Mutations to toggle or set the state of the sidebar and search overlay.
 * - Getters to access the current visibility states in components.
 *
 * **Key Functionalities**:
 * - **State Management**:
 *   - Tracks the open/closed state of the sidebar (`isSidebarOpen`).
 *   - Tracks the visibility of the search overlay (`isSearchOverlayOpen`).
 *
 * - **Mutations**:
 *   - `toggleSidebar`: Toggles the sidebar's open/closed state.
 *   - `setSidebarState`: Sets the sidebar's state explicitly (open or closed).
 *   - `setSearchOverlay`: Sets the search overlay's state explicitly (open or closed).
 *
 * - **Getters**:
 *   - `isSidebarOpen`: Returns the current state of the sidebar.
 *   - `isSearchOverlayOpen`: Returns the current state of the search overlay.
 *
 * @interface UIState - Defines the Vuex state structure for the module.
 * @property {boolean} isSidebarOpen - Tracks whether the sidebar is open or closed.
 * @property {boolean} isSearchOverlayOpen - Tracks whether the search overlay is visible or not.
 *
 * @exports - The Vuex module setup is exported for use in the application.
 */

// Vuex state interface for UI management
export interface UIState {
  isSidebarOpen: boolean; // Tracks the sidebar's visibility
  isSearchOverlayOpen: boolean; // Tracks the search overlay's visibility
}

// Initial state definition
const state: UIState = {
  isSidebarOpen: false, // Sidebar starts closed
  isSearchOverlayOpen: false, // Search overlay starts hidden
};

// Vuex mutations to modify the state
const mutations = {
  // Toggles the sidebar's visibility
  toggleSidebar(state: UIState) {
    state.isSidebarOpen = !state.isSidebarOpen;
  },
  // Sets the sidebar's state explicitly
  setSidebarState(state: UIState, isOpen: boolean) {
    state.isSidebarOpen = isOpen;
  },
  // Sets the search overlay's state explicitly
  setSearchOverlay(state: UIState, isOpen: boolean) {
    state.isSearchOverlayOpen = isOpen;
  },
};

// Vuex getters to access the state
const getters = {
  // Returns whether the sidebar is open
  isSidebarOpen: (state: UIState) => state.isSidebarOpen,
  // Returns whether the search overlay is visible
  isSearchOverlayOpen: (state: UIState) => state.isSearchOverlayOpen,
};

// Exporting the Vuex module
export default {
  state,
  mutations,
  getters,
};
