<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "MovieCard",
  props: {
    movie: {
      type: Object as PropType<{
        id: number;
        title: string;
        poster_path: string;
        overview: string;
      }>,
      required: true,
    },
  },
  computed: {
    // Truncar a sinopse em 100 caracteres
    truncatedOverview(): string {
      return this.movie.overview.length > 100
        ? this.movie.overview.substring(0, 100) + "..."
        : this.movie.overview;
    },
  },
});
</script>

<template>
  <div
    class="movie-card bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg p-4 shadow-sm dark:shadow-gray-800 transition-transform transform hover:scale-105 flex flex-col justify-between group"
    :data-testid="`movie-card-${movie.id}`"
    :data-cy="`movie-card-${movie.id}`"
  >
    <img
      class="movie-poster w-full rounded-lg mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      :alt="movie.title"
      :data-testid="`movie-poster-${movie.id}`"
      :data-cy="`movie-poster-${movie.id}`"
    />
    <h2
      class="movie-title text-xl font-bold mb-2"
      :data-testid="`movie-title-${movie.id}`"
      :data-cy="`movie-title-${movie.id}`"
    >
      {{ movie.title }}
    </h2>
    <p
      class="movie-overview text-sm text-gray-700 dark:text-gray-300"
      :data-testid="`movie-overview-${movie.id}`"
      :data-cy="`movie-overview-${movie.id}`"
    >
      {{ truncatedOverview }}
    </p>
    <!-- View More Button -->
    <router-link
      :to="`/movielist/${movie.id}`"
      class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors mt-2 inline-block text-center"
      :data-testid="`movie-details-link-${movie.id}`"
      :data-cy="`movie-details-link-${movie.id}`"
    >
      View More
    </router-link>
  </div>
</template>

<style scoped>
/* Escopo local para o card */
.movie-card {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
