// Header.vue
<template>
  <header
    class="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
  >
    <!-- Title -->
    <h1 class="text-2xl font-bold">Movie Catalog</h1>

    <!-- Desktop: Dark/Light Mode Toggle -->
    <button
      @click="toggleTheme"
      class="p-2 hidden lg:block"
      aria-label="Toggle Theme"
    >
      <font-awesome-icon
        :icon="theme === 'dark' ? 'sun' : 'moon'"
        class="w-6 h-6"
      />
    </button>

    <!-- Mobile: Menu Button -->
    <button
      @click="toggleSidebar"
      class="p-2 lg:hidden"
      aria-label="Toggle Sidebar"
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
    ...mapState("uiState", ["isSidebarOpen"]),
    ...mapState("themeState", ["theme"]),
  },
  methods: {
    ...mapMutations("uiState", ["toggleSidebar"]),
    ...mapActions("themeState", ["toggleTheme"]),
  },
});
</script>

<style scoped>
/* Additional styling for header */
</style>
