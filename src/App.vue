<template>
  <div id="app">
    <!-- App Header -->
    <header class="bg-gray-200 p-4">
      <h1 class="text-2xl font-bold text-gray-700">Movie Catalog</h1>
    </header>

    <!-- App Content -->
    <main class="p-4">
      <!-- Vue Router will render the matched component here -->
      <router-view />
    </main>

    <!-- App Footer -->
    <footer class="text-center bg-gray-200 p-4 mt-4">
      <p>© 2024 Movie Catalog</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style scoped>
/* Optional basic styling for the App layout */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
