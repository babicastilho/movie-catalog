/**
 * store/themeState.ts
 * Manages the state of the application's theme using Vuex.
 *
 * This module centralizes theme state management and provides actions to toggle the theme.
 * The theme state is persisted in `localStorage` and synchronized with the DOM's `classList`.
 *
 * @exports - Vuex module for theme state management.
 */

import { Module } from "vuex";
import { toggleTheme as utilToggleTheme } from "@/utils/themeUtils";

interface ThemeState {
  theme: string;
}

// Initial state
const state: ThemeState = {
  theme:
    localStorage.getItem("theme") ||
    (document.documentElement.classList.contains("dark") ? "dark" : "light"),
};

// Mutations
const mutations = {
  setTheme(state: ThemeState, newTheme: string) {
    state.theme = newTheme;
    localStorage.setItem("theme", newTheme);

    // Update the DOM class
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
};

// Actions
const actions = {
  toggleTheme({ commit, state }: any) {
    const newTheme = utilToggleTheme(state.theme);
    commit("setTheme", newTheme);
  },
};

// Getters
const getters = {
  currentTheme: (state: ThemeState) => state.theme,
};

const themeState: Module<ThemeState, unknown> = {
  namespaced: true, // Enable namespace
  state,
  mutations,
  actions,
  getters,
};

export default themeState;
