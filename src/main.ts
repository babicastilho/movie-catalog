/**
 * main.ts
 * Entry point for the Vue application.
 *
 * This file initializes the Vue application by setting up essential configurations,
 * such as the Vue Router, Vuex store, global components, and styles. It also applies
 * the initial theme based on user preferences or system settings using the `initializeTheme`
 * utility function.
 *
 * @imports App - The root component of the application.
 * @imports router - Vue Router instance for managing routes.
 * @imports store - Vuex store for state management.
 * @imports initializeTheme - Utility function to initialize the theme.
 */

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/main.scss";

// Font Awesome Imports
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./icons"; // Import the icons library setup

// Import theme utilities
import { initializeTheme } from "./utils/themeUtils";

/**
 * Initialize the theme before creating the app.
 * Ensures the correct theme is applied on application startup.
 */
initializeTheme();

const app = createApp(App);

// Register FontAwesomeIcon globally
app.component("font-awesome-icon", FontAwesomeIcon);

// Attach Vuex store and Vue Router to the app
app.use(store);
app.use(router);

// Mount the application to the DOM
app.mount("#app");
