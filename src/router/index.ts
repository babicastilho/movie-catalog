import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import MovieListView from "@/views/MovieListView.vue";
import MovieDetailsView from "@/views/MovieDetailsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/movielist",
    name: "movie-list",
    component: MovieListView,
  },
  {
    path: "/movielist/:id",
    name: "movie-details",
    component: MovieDetailsView,
    props: true, // Pass the `id` parameter as a prop to the component
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
