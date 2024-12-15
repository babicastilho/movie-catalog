<template>
  <footer
    class="flex justify-between items-center p-6 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200 border-t border-gray-300 dark:border-gray-700"
    data-testid="footer"
    data-cy="footer"
  >
    <!-- Left section -->
    <p class="text-sm">
      © 2024 <span class="font-semibold">Movie Catalog</span>. All rights
      reserved.
    </p>

    <!-- Right section -->
    <p class="text-xs text-gray-600 dark:text-gray-400">
      Built with ❤️ using Vue.js, Vuex, and Tailwind CSS.
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "AppFooter",
  computed: {
    ...mapState("themeState", ["theme"]),
  },
});
</script>
