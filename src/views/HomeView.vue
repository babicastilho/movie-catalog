<template>
  <div
    class="flex flex-col items-center justify-center h-full text-center space-y-6"
    data-testid="welcome-section"
    data-cy="welcome-section"
  >
    <!-- Main Title -->
    <h1
      class="text-4xl font-bold text-gray-900 dark:text-gray-100"
      data-testid="project-title"
    >
      Welcome to Movie Catalog!
    </h1>

    <!-- Project Description -->
    <p
      class="text-lg text-gray-700 dark:text-gray-300 max-w-2xl"
      data-testid="project-description"
    >
      Explore your favorite movies, learn about their cast, genres, and details.
      Enjoy a seamless experience with a modern design and dark/light mode
      support.
    </p>

    <!-- Feature List -->
    <ul
      class="text-left space-y-2 text-gray-800 dark:text-gray-400"
      data-testid="feature-list"
    >
      <li>🔍 Search for movies with ease.</li>
      <li>🎥 View detailed information about each movie.</li>
      <li>🌗 Switch between Light and Dark mode.</li>
      <li>⭐ Discover cast members and genres.</li>
    </ul>

    <!-- Call-to-Action Button -->
    <router-link
      to="/movielist"
      class="inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition duration-300"
      data-testid="cta-movie-list"
      data-cy="cta-movie-list"
    >
      Explore Movie List
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>
