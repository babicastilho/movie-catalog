<template>
  <div class="container mx-auto p-4 text-gray-900 dark:text-gray-100">
    <!-- Verificar estado de carregamento -->
    <div v-if="isLoading" class="flex items-center justify-center h-64">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"
      ></div>
    </div>

    <!-- Exibir mensagem de erro -->
    <div v-else-if="error" class="text-center text-red-500 text-lg">
      {{ error }}
    </div>

    <!-- Exibir detalhes do filme -->
    <div
      v-else
      class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6"
    >
      <!-- Imagem do filme -->
      <div class="flex-shrink-0 w-full md:w-1/3">
        <img
          v-if="movie?.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie?.title || 'Movie Poster'"
          class="rounded shadow-md w-full"
        />
      </div>

      <!-- Informações do filme -->
      <div class="flex flex-col space-y-4">
        <h1 class="text-3xl font-bold">{{ movie?.title }}</h1>
        <p class="text-lg text-gray-700 dark:text-gray-300">
          {{ movie?.overview }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          <strong>Release Date:</strong> {{ movie?.release_date }}
        </p>
        <div
          v-if="movie?.genres?.length"
          class="text-sm text-gray-700 dark:text-gray-300"
        >
          <strong>Genres:</strong>
          <span>{{ movie.genres.map((genre) => genre.name).join(", ") }}</span>
        </div>
      </div>
    </div>

    <!-- Exibir elenco -->
    <div
      v-if="cast.length"
      class="mt-6 text-sm text-gray-700 dark:text-gray-300"
    >
      <h2 class="text-lg font-semibold mb-2">Cast:</h2>
      <ul class="list-disc ml-5 space-y-1">
        <li v-for="actor in cast" :key="actor.id">
          {{ actor.name }} as <span class="italic">{{ actor.character }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MovieDetailsView",
  setup() {
    const store = useStore();

    // Computed properties para acessar o Vuex
    const movie = computed(() => store.state.movieDetails.movie);
    const cast = computed(() => store.state.movieDetails.cast);
    const isLoading = computed(() => store.state.movieDetails.isLoading);
    const error = computed(() => store.state.movieDetails.error);

    const route = useRoute();

    // Buscar detalhes do filme ao montar o componente
    onMounted(() => {
      const movieId = parseInt(route.params.id as string, 10);
      store.dispatch("movieDetails/fetchMovieDetails", movieId);
    });

    return { movie, cast, isLoading, error };
  },
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* Animação do spinner */
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
