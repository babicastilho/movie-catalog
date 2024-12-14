<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import MovieList from "@/components/movies/MoviesList.vue";
import PaginationControl from "@/components/commom/Pagination.vue";

export default defineComponent({
  name: "MovieListView",
  components: { MovieList, PaginationControl },
  setup() {
    const store = useStore();

    // Computed properties to get current page and total pages from Vuex
    const currentPage = computed(() => store.state.moviesState.currentPage);
    const totalPages = computed(() => store.state.moviesState.totalPages);

    // Method to change the page
    const changePage = (page: number) => {
      store.dispatch("moviesState/setPage", page);
    };

    return {
      currentPage,
      totalPages,
      changePage,
    };
  },
});
</script>

<template>
  <div>
    <h1>Movie List</h1>
    <MovieList />
    <hr />
    <PaginationControl
      :current-page="currentPage"
      :total-pages="totalPages"
      @onPageChange="changePage"
    />
  </div>
</template>
