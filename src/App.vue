<template>
  <div id="app">
    <!-- App Header -->
    <AppHeader />

    <!-- App Content -->
    <main class="p-4">
      <router-view />
    </main>

    <!-- App Footer -->
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "@/components/layout/Header.vue";
import AppFooter from "@/components/layout/Footer.vue";

export default defineComponent({
  components: {
    AppHeader,
    AppFooter,
  },
});
</script>

<style scoped>
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
