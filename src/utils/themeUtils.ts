/**
 * utils/themeUtils.ts
 * Provides utility functions to manage theme initialization and toggling.
 *
 * This module contains functions to initialize the application's theme based on
 * user preference, system settings, or a previously saved theme. It also provides
 * a utility to toggle the theme and persist the user's choice in localStorage.
 *
 * @function initializeTheme - Initializes the theme on application startup.
 * @function toggleTheme - Toggles the current theme between "light" and "dark".
 *
 * @exports initializeTheme - Function to initialize the theme.
 * @exports toggleTheme - Function to toggle the theme and persist it.
 */

/**
 * Initializes the theme based on saved preference, system preference, or default.
 *
 * - Checks `localStorage` for a saved theme.
 * - Fallbacks to system preference if no theme is saved.
 * - Applies the theme to the `<html>` element.
 * - Persists the theme in `localStorage` if no preference is saved.
 */
export function initializeTheme() {
  const savedTheme = localStorage.getItem("theme"); // Check for saved theme in localStorage
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; // System preference
  const theme = savedTheme || (prefersDark ? "dark" : "light"); // Use saved theme or fallback to system preference

  // Apply the theme to the <html> element
  document.documentElement.classList.toggle("dark", theme === "dark");

  // Save the theme to localStorage if not already saved
  if (!savedTheme) {
    localStorage.setItem("theme", theme);
  }
}

/**
 * Toggles the current theme between "light" and "dark".
 *
 * @param {string} currentTheme - The current theme ("light" or "dark").
 * @returns {string} - The updated theme after toggling.
 */
export function toggleTheme(currentTheme: string): string {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.classList.toggle("dark", newTheme === "dark");
  localStorage.setItem("theme", newTheme); // Persist the new theme
  return newTheme;
}
