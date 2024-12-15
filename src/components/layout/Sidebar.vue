<template>
  <div
    :class="[
      'h-full absolute lg:relative inset-y-0 left-0 z-500 w-64 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200',
      'transition-transform duration-300 ease-in-out',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full', // Small screens
      'lg:translate-x-0 lg:transform-none',
    ]"
    data-testid="sidebar"
    data-cy="sidebar"
  >
    <hr
      class="bg-gray-300 dark:bg-gray-600 border-none"
      data-testid="sidebar-divider"
      data-cy="sidebar-divider"
    />
    <!-- Sidebar Header -->
    <div class="p-4" data-testid="sidebar-header" data-cy="sidebar-header">
      <!-- Navigation Links -->
      <!-- Home Link -->
      <router-link
        to="/"
        class="mt-2 p-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 rounded flex items-center space-x-2"
        data-testid="nav-home"
        data-cy="nav-home"
      >
        <font-awesome-icon :icon="['fas', 'home']" class="w-5 h-5" />
        <span>Home</span>
      </router-link>

      <!-- Movie List Link -->
      <router-link
        to="/movielist"
        class="mt-2 p-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 rounded flex items-center space-x-2"
        data-testid="nav-movie-list"
        data-cy="nav-movie-list"
      >
        <font-awesome-icon :icon="['fas', 'list']" class="w-5 h-5" />
        <span>Movie List</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "AppSidebar",
  computed: {
    ...mapState("uiState", ["isSidebarOpen"]),
  },
});
</script>

<style scoped>
hr {
  height: 1px;
}
</style>
