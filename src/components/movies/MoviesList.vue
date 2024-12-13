<template>
  <div class="p-4">
    <!-- Loader -->
    <p v-if="isLoading" class="text-center">Loading...</p>

    <!-- Error Message -->
    <p v-if="error" class="text-center text-red-500">{{ error }}</p>

    <!-- Movies List -->
    <div
      v-if="movies.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="bg-gray-200 p-4 rounded shadow"
      >
        <img
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          alt="Movie Poster"
          class="w-full h-auto rounded"
        />
        <h2 class="text-lg font-bold mt-2">{{ movie.title }}</h2>
        <p>{{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MoviesList",
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
