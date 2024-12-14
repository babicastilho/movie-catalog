<template>
  <div
    class="container mx-auto p-4 text-gray-900 dark:text-gray-100 flex flex-col space-y-6"
    data-testid="movie-details-container"
    data-cy="movie-details-container"
  >
    <!-- Back button -->
    <div class="flex justify-start w-full">
      <button
        @click="goBack"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
        data-testid="back-button"
        data-cy="back-button"
      >
        Back
      </button>
    </div>

    <!-- Loading state -->
    <Spinner v-if="isLoading" />

    <!-- Error state -->
    <div v-else-if="error" class="text-center text-red-500 text-lg">
      Failed to load movie details. Please try again later.
    </div>

    <!-- Main content -->
    <MovieDetails v-else-if="movie" :movie="movie" :cast="cast" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Spinner from "@/components/commom/Spinner.vue";
import MovieDetails from "@/components/movies/MovieDetails.vue";

export default defineComponent({
  name: "MovieDetailsView",
  components: { Spinner, MovieDetails },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const movie = ref(null); // Movie details object
    const cast = ref([]); // Movie cast array
    const isLoading = ref(true); // Loading state
    const error = ref<string | null>(null); // Error message

    onMounted(async () => {
      const movieId = route.params.id;
      try {
        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
        );
        if (!movieResponse.ok) {
          throw new Error("Failed to fetch movie details");
        }
        movie.value = await movieResponse.json();

        // Fetch movie cast
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.VUE_APP_TMDB_API_KEY}`
        );
        if (!creditsResponse.ok) {
          throw new Error("Failed to fetch movie credits");
        }
        const creditsData = await creditsResponse.json();
        cast.value = creditsData.cast.slice(0, 10); // Limit cast to top 10 actors
      } catch (err) {
        error.value = (err as Error).message;
      } finally {
        isLoading.value = false; // Stop loading after data fetch
      }
    });

    const goBack = () => {
      router.push("/movielist"); // Redirect to movie list page
    };

    return { movie, cast, isLoading, error, goBack };
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
