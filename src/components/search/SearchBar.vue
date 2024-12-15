<!--
  SearchBar.vue
  Implements a dynamic search bar component for filtering movies by title using the TMDb API.

  This component allows users to search for movies in real-time. The search results are
  filtered to only display movies matching a specific genre stored in Vuex state. It also
  handles user interaction events, such as closing the search overlay or navigating to 
  detailed movie pages.

  Features:
  - Real-time search with dynamic results.
  - Filters results based on the selected genre (managed in Vuex).
  - Random search suggestions when no query is entered.
  - Smooth navigation to movie details using Vue Router.

  @data query - Holds the user's input text for the search query.
  @data results - An array containing filtered movie objects from the TMDb API.
  @data suggestion - A randomly chosen search suggestion displayed to the user.

  @computed genre - Retrieves the active genre filter from Vuex state ("moviesState" namespace).

  @methods
    - handleInput: Fetches search results from the TMDb API and filters them by genre.
    - handleSearch: Emits the 'search' event with the current query input.
    - handleClose: Clears input data, resets results, and emits the 'close-overlay' event.
    - selectMovie: Navigates to a detailed movie page based on the selected movie's ID.

  @emits
    - close-overlay: Emitted when the search overlay is closed.
    - search: Emitted when a search is explicitly triggered.

  @example
  <SearchBar @close-overlay="handleOverlayClose" @search="onSearch" />

  @dependencies
  - Vuex: For genre filtering (stored in "moviesState").
  - Vue Router: For navigation to movie detail pages.
  - Font Awesome: For icons within the search bar.

  @param {Object} Movie - Represents a movie with 'id', 'title', and 'genre_ids'.
-->

<template>
  <div
    class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-96 relative"
    data-testid="search-bar"
    data-cy="search-bar"
  >
    <!-- Search input -->
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

    <!-- Search results -->
    <div
      class="mt-4 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 shadow-md w-full h-48"
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
  <!-- Close button -->
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
import { mapState } from "vuex";

// Interface for movie structure
interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
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
  computed: {
    /**
     * Access genre state from Vuex using the correct namespace.
     */
    ...mapState("moviesState", ["genre"]),
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    /**
     * Handles input changes and fetches search results.
     * Filters movies by genre stored in Vuex state.
     */
    async handleInput() {
      if (this.query.trim() === "") {
        this.results = [];
        return;
      }
      try {
        console.log("Fetching results for query:", this.query);
        console.log("Current genre in Vuex:", this.genre);

        // Fetch search results from the TMDb API
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${
            process.env.VUE_APP_TMDB_API_KEY
          }&query=${encodeURIComponent(this.query)}&language=en-US`
        );

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Strictly filter movies by genre ID
        this.results = data.results.filter((movie: any) => {
          return (
            movie.genre_ids && // Ensure genre_ids exists
            Array.isArray(movie.genre_ids) && // Ensure genre_ids is an array
            movie.genre_ids.includes(Number(this.genre)) // Check for matching genre ID
          );
        });

        console.log("Filtered Results:", this.results);
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
