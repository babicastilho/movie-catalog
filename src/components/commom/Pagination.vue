<template>
  <div class="flex items-center justify-center space-x-2 my-4">
    <!-- Previous Button -->
    <button
      class="px-3 py-1 border rounded disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
      data-testid="prev-button"
      data-cy="prev-button"
    >
      Previous
    </button>

    <!-- Page Buttons -->
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

    <!-- Next Button -->
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
    // Current page number
    currentPage: {
      type: Number,
      required: true,
    },
    // Total number of pages
    totalPages: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    // Computed property to calculate the visible page numbers
    const visiblePages = computed(() => {
      const range = [];
      const maxPagesToShow = 5; // Maximum number of pages to display at once
      let start = Math.max(
        1,
        props.currentPage - Math.floor(maxPagesToShow / 2)
      );
      let end = Math.min(props.totalPages, start + maxPagesToShow - 1);

      // Adjust the range if there are fewer pages than the maximum to show
      if (end - start < maxPagesToShow - 1) {
        start = Math.max(1, end - maxPagesToShow + 1);
      }

      // Populate the range array with page numbers
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    });

    // Emit an event to change the page
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
/* Base button styles */
button {
  transition: background-color 0.3s, color 0.3s; /* Smooth transition for hover effects */
}

/* Hover styles for buttons */
button:hover:not(:disabled) {
  background-color: #2c3e50; /* Darker background on hover */
  color: #ecf0f1; /* Lighter text on hover */
}
</style>
