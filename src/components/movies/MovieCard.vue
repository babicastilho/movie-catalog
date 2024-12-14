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
    class="movie-card bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-4"
    :data-testid="`movie-card-${movie.id}`"
    :data-cy="`movie-card-${movie.id}`"
  >
    <img
      class="movie-poster w-full rounded-lg mb-4"
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
  </div>
</template>

<style scoped>
/* Escopo local para o card */
.movie-card {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
