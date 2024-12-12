// Sidebar.vue
<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 transform transition-transform duration-200 ease-in-out',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <hr class="bg-gray-300 dark:bg-gray-600 border-none" />
    <!-- Sidebar Header -->
    <div class="p-4">
      <p>conteúdo da sidebar</p>

      <!-- Theme Toggle Button (only for small screens) -->
      <hr class="mt-4 bg-gray-300 dark:bg-gray-600 border-none" />
      <button
        v-if="isSidebarOpen && isSmallScreen"
        @click="toggleTheme"
        class="mt-4 p-2 w-full text-left text-gray-700 dark:text-gray-300"
        aria-label="Toggle Theme"
      >
        <font-awesome-icon
          :icon="theme === 'dark' ? 'sun' : 'moon'"
          class="w-5 h-5 mr-2"
        />
        <span>{{ theme === "dark" ? "Light Mode" : "Dark Mode" }}</span>
      </button>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";

export default defineComponent({
  name: "AppSidebar",
  computed: {
    ...mapState("uiState", ["isSidebarOpen"]),
    ...mapState("themeState", ["theme"]),
    isSmallScreen() {
      return window.innerWidth < 1024; // Check for small screens
    },
  },
  methods: {
    ...mapActions("themeState", ["toggleTheme"]),
  },
});
</script>

<style scoped>
hr {
  height: 1px;
}
</style>
