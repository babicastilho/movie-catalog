/**
 * store/themeState.ts
 * Centralized state management for theme toggling.
 *
 * This file defines a shared theme state using Vue's Composition API.
 * It provides a `theme` reactive reference and a `toggleTheme` function.
 *
 * The `theme` state reflects the current theme ("light" or "dark") applied to the application.
 * The `toggleTheme` function switches the theme and persists the preference in localStorage.
 *
 * @exports theme - The reactive theme state.
 * @exports toggleTheme - Function to toggle the theme and persist the state.
 */

import { ref } from "vue";
import { toggleTheme as utilToggleTheme } from "@/utils/themeUtils";

// Shared theme state
const theme = ref(
  localStorage.getItem("theme") ||
    (document.documentElement.classList.contains("dark") ? "dark" : "light")
);

/**
 * Toggles the theme between "light" and "dark".
 * Updates the `theme` state and applies the new theme globally.
 */
const toggleTheme = () => {
  theme.value = utilToggleTheme(theme.value); // Use the utility function to toggle the theme
};

export { theme, toggleTheme };
