// PaginationControl.vue
<template>
  <div class="flex items-center justify-center space-x-2 my-4">
    <button
      class="px-3 py-1 border rounded disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
      data-testid="prev-button"
      data-cy="prev-button"
    >
      Previous
    </button>
    <button
      v-for="page in visiblePages"
      :key="page"
      class="px-3 py-1 border rounded"
      :class="{ 'bg-blue-500 text-white': page === currentPage }"
      @click="changePage(page)"
      :data-testid="'page-button-' + page"
      :data-cy="'page-button-' + page"
    >
      {{ page }}
    </button>
    <button
      class="px-3 py-1 border rounded disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
      data-testid="next-button"
      data-cy="next-button"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "PaginationControl",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const visiblePages = computed(() => {
      const range = [];
      const maxPagesToShow = 5;
      let start = Math.max(
        1,
        props.currentPage - Math.floor(maxPagesToShow / 2)
      );
      let end = Math.min(props.totalPages, start + maxPagesToShow - 1);

      if (end - start < maxPagesToShow - 1) {
        start = Math.max(1, end - maxPagesToShow + 1);
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    });

    const changePage = (page: number) => {
      if (page >= 1 && page <= props.totalPages) {
        emit("onPageChange", page);
      }
    };

    return {
      visiblePages,
      changePage,
    };
  },
});
</script>

<style scoped>
button {
  transition: background-color 0.3s, color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #2c3e50;
  color: #ecf0f1;
}
</style>
