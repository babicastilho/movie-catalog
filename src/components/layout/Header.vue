// Header.vue
<template>
  <header
    class="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
  >
    <h1 class="text-2xl font-bold">Movie Catalog</h1>
    <!-- Button to toggle the theme -->
    <button @click="toggleTheme" class="p-2">
      <font-awesome-icon
        :icon="theme === 'dark' ? 'sun' : 'moon'"
        class="w-6 h-6"
      />
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { theme, toggleTheme } from "@/store/themeState"; // Use shared theme state

export default defineComponent({
  name: "AppHeader",
  setup() {
    return { theme, toggleTheme };
  },
});
</script>
