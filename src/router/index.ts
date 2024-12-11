import { createRouter, createWebHistory } from "vue-router";
import TestView from "@/views/TestView.vue";

// Define application routes
const routes = [
  {
    path: "/", // Home route
    name: "Home",
    component: () => import("../views/HomeView.vue"), // Lazy load the Home view
  },
  {
    path: "/test",
    name: "Test",
    component: TestView, // Add the Test route
  },
];

// Create Vue Router instance
const router = createRouter({
  history: createWebHistory(), // Use history mode for clean URLs
  routes,
});

export default router;
