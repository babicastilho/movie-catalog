<template>
  <div id="app" class="flex flex-col h-screen">
    <!-- Header -->
    <AppHeader :isSidebarOpen="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <div class="flex flex-1 relative">
      <!-- Sidebar -->
      <AppSidebar
        :isOpen="isSidebarOpen"
        @toggle-sidebar="toggleSidebar"
        class="absolute lg:relative lg:translate-x-0 z-50"
      />

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-4">
        <router-view />
      </main>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppHeader from "@/components/layout/Header.vue";
import AppFooter from "@/components/layout/Footer.vue";
import AppSidebar from "@/components/layout/Sidebar.vue";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    AppSidebar,
  },
  setup() {
    const isSidebarOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    return { isSidebarOpen, toggleSidebar };
  },
});
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Occupies the full viewport height */
}

header {
  flex-shrink: 0;
  height: 90px; /* Fixed height for the header */
}

footer {
  flex-shrink: 0;
  height: 60px; /* Fixed height for the footer */
}

main {
  flex: 1;
  overflow-y: auto;
}

.AppSidebar {
  height: calc(100vh - 90px); /* Full height minus header height */
  top: 90px; /* Starts below the header */
  transform: translateX(-100%); /* Hidden by default for small screens */
  transition: transform 0.3s ease-in-out;
  position: absolute;
}

.AppSidebar.is-open {
  transform: translateX(0); /* Visible when open */
}

@media (min-width: 1024px) {
  .AppSidebar {
    transform: translateX(0); /* Always visible on large screens */
    position: relative;
    top: 0; /* No offset needed on large screens */
    height: calc(100vh - 90px); /* Full height minus header */
  }
}
</style>
