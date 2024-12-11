import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/main.scss";

// Font Awesome Imports
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./icons"; // Import the icons library setup

const app = createApp(App);

app.use(store);
app.use(router);

// Register FontAwesomeIcon globally
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
