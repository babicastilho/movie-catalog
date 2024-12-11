// Footer.vue
<template>
  <footer
    class="text-center p-4 mt-4"
    :class="{
      'bg-gray-200 text-gray-700': theme === 'light',
      'bg-gray-800 text-gray-300': theme === 'dark',
    }"
  >
    <p>© 2024 Movie Catalog</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { theme } from "@/store/themeState"; // Import the shared theme state

export default defineComponent({
  name: "AppFooter",
  setup() {
    return { theme };
  },
});
</script>
