<template>
  <header
    class="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
  >
    <!-- Title -->
    <h1
      class="text-2xl font-bold"
      data-testid="header-title"
      data-cy="header-title"
    >
      Movie Catalog
    </h1>

    <div class="flex">
      <!-- Desktop: Dark/Light Mode Toggle -->
      <button
        @click="toggleTheme"
        class="p-2 hidden lg:block"
        aria-label="Toggle Theme"
        data-testid="toggle-theme-button"
        data-cy="toggle-theme-button"
      >
        <font-awesome-icon
          :icon="theme === 'dark' ? 'sun' : 'moon'"
          class="w-6 h-6"
        />
      </button>

      <!-- Desktop: Search Button -->
      <button
        @click="toggleSearchOverlay"
        class="p-2 hidden lg:block"
        aria-label="Open Search"
        data-testid="toggle-search-button"
        data-cy="toggle-search-button"
      >
        <font-awesome-icon icon="search" class="w-6 h-6" />
      </button>
    </div>
    <!-- Mobile: Menu Button -->
    <button
      @click="toggleSidebar"
      class="p-2 lg:hidden"
      aria-label="Toggle Sidebar"
      data-testid="toggle-sidebar-button"
      data-cy="toggle-sidebar-button"
    >
      <font-awesome-icon v-if="!isSidebarOpen" icon="bars" class="w-6 h-6" />
      <font-awesome-icon v-else icon="times" class="w-6 h-6" />
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default defineComponent({
  name: "AppHeader",
  computed: {
    ...mapState("uiState", ["isSidebarOpen"]), // Access sidebar state from Vuex
    ...mapState("themeState", ["theme"]), // Access theme state from Vuex
  },
  methods: {
    ...mapMutations("uiState", ["toggleSidebar"]), // Mutation to toggle sidebar
    ...mapActions("themeState", ["toggleTheme"]), // Action to toggle theme
    toggleSearchOverlay() {
      // Emit an event to toggle the search overlay
      this.$emit("toggle-search-overlay");
      console.log("Search button clicked");
    },
  },
});
</script>

<style scoped>
/* Additional styling for header */
</style>
