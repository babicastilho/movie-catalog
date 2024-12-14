<template>
  <div class="p-4">
    <!-- Loader -->
    <p v-if="isLoading" class="text-center">Loading...</p>

    <!-- Error Message -->
    <p v-if="error" class="text-center text-red-500">{{ error }}</p>

    <!-- Movies List -->
    <div
      v-if="movies.length"
      class="grid grid-cols-1 sd:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
      data-testid="movies-list"
      data-cy="movies-list"
    >
      <!-- Use the MovieCard component for each movie -->
      <MovieCard
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :data-testid="`movie-card-${movie.id}`"
        :data-cy="`movie-card-${movie.id}`"
      />
    </div>

    <!-- No movies found -->
    <p v-else-if="!isLoading && !error" class="text-center text-gray-500">
      No movies found.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import MovieCard from "@/components/movies/MovieCard.vue"; // Import the MovieCard component

export default defineComponent({
  name: "MoviesList",
  components: { MovieCard }, // Register MovieCard as a component
  setup() {
    // Initialize the Vuex store
    const store = useStore();

    // Computed properties to map Vuex state
    const movies = computed(() => store.state.moviesState.movies); // Fetch movies from the state
    const isLoading = computed(() => store.state.moviesState.isLoading); // Check if the data is loading
    const error = computed(() => store.state.moviesState.error); // Fetch error messages, if any

    // Dispatch fetchMovies action when the component is mounted
    onMounted(() => {
      store.dispatch("moviesState/fetchMovies");
    });

    console.log("Movies state in component:", movies.value);

    return {
      movies,
      isLoading,
      error,
    };
  },
});
</script>
