<script lang="ts">
import { defineComponent, computed, watch } from "vue";
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
      if (page >= 1 && page <= totalPages.value) {
        store.commit("moviesState/setPage", page); // Atualizar página atual no estado
        store.dispatch("moviesState/fetchMovies"); // Buscar filmes da nova página
      }
    };

    // Watch currentPage to trigger scroll to top
    watch(currentPage, () => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 50); // Adiciona um pequeno delay para garantir que a atualização do DOM seja completada
    });

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
    <h2
      class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6"
      data-testid="movie-list-title"
      data-cy="movie-list-title"
    >
      Movie List
    </h2>
    <MovieList />
    <div
      class="flex items-center justify-between border-t border-gray-300 dark:border-gray-700 mt-4 pt-2 mx-4"
      data-testid="pagination-container"
      data-cy="pagination-container"
    >
      <PaginationControl
        :current-page="currentPage"
        :total-pages="totalPages"
        @onPageChange="changePage"
        data-testid="pagination-control"
        data-cy="pagination-control"
      />
      <div
        class="text-sm font-medium"
        data-testid="page-info"
        data-cy="page-info"
      >
        Page {{ currentPage }} of {{ totalPages }}
      </div>
    </div>
  </div>
</template>
