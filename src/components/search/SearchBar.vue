<template>
  <div
    class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-96 relative"
    data-testid="search-bar"
    data-cy="search-bar"
  >
    <!-- Input de busca -->
    <div class="flex items-center space-x-2">
      <input
        type="text"
        v-model="query"
        placeholder="Search movies..."
        class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search movies"
        data-testid="search-input"
        data-cy="search-input"
        @input="handleInput"
      />
      <button
        @click="handleSearch"
        class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Submit search"
        data-testid="search-submit-button"
        data-cy="search-submit-button"
      >
        <font-awesome-icon icon="search" class="w-5 h-5" />
      </button>
    </div>

    <!-- Resultados da busca -->
    <div
      class="mt-4 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md w-96 h-48"
      data-testid="search-results"
      data-cy="search-results"
    >
      <template v-if="query.trim() === ''">
        <p class="text-gray-500 dark:text-gray-300 text-center">
          No ideas? Try typing "<strong>{{ suggestion }}</strong
          >"!
        </p>
      </template>
      <template v-else-if="results.length">
        <ul class="overflow-y-auto h-full">
          <li
            v-for="movie in results"
            :key="movie.id"
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer rounded"
            @click="selectMovie(movie)"
          >
            {{ movie.title }}
          </li>
        </ul>
      </template>
      <template v-else>
        <p class="text-gray-500 dark:text-gray-300 text-center">
          No results found. Try another search term!
        </p>
      </template>
    </div>
  </div>
  <!-- Botão de fechar -->
  <button
    @click="handleClose"
    class="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
    aria-label="Close search overlay"
    data-testid="close-overlay-button"
    data-cy="close-overlay-button"
  >
    <font-awesome-icon icon="times" class="w-5 h-5" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

interface Movie {
  id: number;
  title: string;
}

export default defineComponent({
  name: "SearchBar",
  emits: ["close-overlay", "search"],
  data() {
    return {
      query: "",
      results: [] as Movie[],
      suggestion: "",
    };
  },
  mounted() {
    const suggestions = [
      "Avengers",
      "Matrix",
      "Inception",
      "Avatar",
      "Titanic",
    ];
    this.suggestion =
      suggestions[Math.floor(Math.random() * suggestions.length)];
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleInput() {
      if (this.query.trim() === "") {
        this.results = [];
        return;
      }
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            process.env.VUE_APP_TMDB_API_KEY
          }&query=${encodeURIComponent(this.query)}&language=en-US`
        );
        const data = await response.json();
        this.results = data.results as Movie[];
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    handleSearch() {
      this.$emit("search", this.query);
    },
    handleClose() {
      this.query = "";
      this.results = [];
      this.$emit("close-overlay");
    },
    selectMovie(movie: Movie) {
      this.router.push(`/movielist/${movie.id}`);
      this.query = "";
      this.results = [];
      this.$emit("close-overlay");
    },
  },
});
</script>

<style scoped>
.w-96 {
  width: 480px;
}
.h-48 {
  height: 192px;
}
</style>
