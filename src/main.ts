import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import Vue Router
import store from "./store"; // Import Vuex Store
import "./assets/styles/main.scss"; // Import global styles (Tailwind + SASS)

const app = createApp(App);

// Attach Vuex Store to the application
app.use(store);

// Attach Vue Router to the application
app.use(router);

// Mount the application to the DOM
app.mount("#app");
