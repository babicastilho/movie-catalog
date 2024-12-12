// Footer.vue
<template>
  <footer
    class="text-center p-4"
    :class="{
      'bg-gray-200 text-gray-700': theme === 'light',
      'bg-gray-900 text-gray-200': theme === 'dark',
    }"
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
