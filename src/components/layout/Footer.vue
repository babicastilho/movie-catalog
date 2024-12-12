// Footer.vue
<template>
  <footer
    class="text-center p-4 bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200"
  >
    <p>© 2024 Movie Catalog</p>
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
