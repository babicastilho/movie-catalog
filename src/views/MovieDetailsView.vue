<template>
  <div
    class="container mx-auto p-4 text-gray-900 dark:text-gray-100"
    data-testid="movie-details-container"
    data-cy="movie-details-container"
  >
    <!-- Check loading state -->
    <div
      v-if="isLoading"
      class="flex items-center justify-center h-64"
      data-testid="loading-spinner"
      data-cy="loading-spinner"
    >
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"
      ></div>
    </div>

    <!-- Display error message -->
    <div
      v-else-if="error"
      class="text-center text-red-500 text-lg"
      data-testid="error-message"
      data-cy="error-message"
    >
      {{ error }}
    </div>

    <!-- Display movie details -->
    <div
      v-else
      class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6"
      data-testid="movie-details-content"
      data-cy="movie-details-content"
    >
      <!-- Movie image -->
      <div
        class="flex-shrink-0 w-full md:w-1/3"
        data-testid="movie-poster-container"
        data-cy="movie-poster-container"
      >
        <img
          v-if="movie?.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie?.title || 'Movie Poster'"
          class="rounded shadow-md w-full"
          data-testid="movie-poster"
          data-cy="movie-poster"
        />
      </div>

      <!-- Movie information -->
      <div
        class="flex flex-col space-y-4"
        data-testid="movie-info"
        data-cy="movie-info"
      >
        <h1
          class="text-3xl font-bold"
          data-testid="movie-title"
          data-cy="movie-title"
        >
          {{ movie?.title }}
        </h1>
        <p
          class="text-lg text-gray-700 dark:text-gray-300"
          data-testid="movie-overview"
          data-cy="movie-overview"
        >
          {{ movie?.overview }}
        </p>
        <p
          class="text-sm text-gray-500 dark:text-gray-400"
          data-testid="release-date"
          data-cy="release-date"
        >
          <strong>Release Date:</strong> {{ movie?.release_date }}
        </p>
        <div
          v-if="movie?.genres?.length"
          class="text-sm text-gray-700 dark:text-gray-300"
          data-testid="movie-genres"
          data-cy="movie-genres"
        >
          <strong>Genres: </strong>
          <span data-testid="genres-list" data-cy="genres-list">{{
            movie.genres.map((genre) => genre.name).join(", ")
          }}</span>
        </div>

        <!-- Display cast -->
        <div
          v-if="cast.length"
          class="mt-6 text-sm text-gray-700 dark:text-gray-300"
          data-testid="cast-container"
          data-cy="cast-container"
        >
          <h2
            class="text-lg font-semibold mb-2"
            data-testid="cast-title"
            data-cy="cast-title"
          >
            Cast:
          </h2>
          <ul
            class="list-disc ml-5 space-y-1"
            data-testid="cast-list"
            data-cy="cast-list"
          >
            <li
              v-for="actor in cast"
              :key="actor.id"
              data-testid="cast-item"
              data-cy="cast-item"
            >
              {{ actor.name }} as
              <span
                class="italic"
                data-testid="actor-character"
                data-cy="actor-character"
              >
                {{ actor.character }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Back Button -->
    <router-link
      to="/movielist"
      class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors inline-block mb-4"
      data-testid="back-button"
      data-cy="back-button"
    >
      « Back to Movie List
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MovieDetailsView",
  setup() {
    const store = useStore();
    const route = useRoute();

    // Computed properties to access Vuex state
    const movie = computed(() => store.state.movieDetails.movie);
    const cast = computed(() => store.state.movieDetails.cast);
    const isLoading = computed(() => store.state.movieDetails.isLoading);
    const error = computed(() => store.state.movieDetails.error);

    const fetchMovieDetails = (id: number) => {
      store.dispatch("movieDetails/fetchMovieDetails", id);
    };

    // Watch for route changes to update movie details
    watch(
      () => route.params.id,
      (newId) => {
        if (newId) fetchMovieDetails(parseInt(newId as string, 10));
      },
      { immediate: true }
    );

    return { movie, cast, isLoading, error };
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Spinner animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
