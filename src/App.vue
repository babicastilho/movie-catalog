<template>
  <div id="app" class="flex flex-col h-screen">
    <!-- Header -->
    <AppHeader @toggle-search-overlay="toggleSearchOverlay" />

    <div class="flex flex-1 relative">
      <!-- Sidebar -->
      <AppSidebar class="absolute lg:relative lg:translate-x-0 z-50" />

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-4">
        <router-view />
      </main>

      <!-- Floating Action Button (FAB) for Search -->
      <button
        v-if="!isSearchOverlayOpen"
        @click="toggleSearchOverlay"
        class="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 z-50 lg:hidden"
        aria-label="Open Search"
        data-testid="fab-search-button"
        data-cy="fab-search-button"
      >
        <font-awesome-icon icon="search" class="w-6 h-6" />
      </button>
    </div>

    <!-- Footer -->
    <AppFooter />

    <!-- Search Overlay -->
    <div
      v-if="isSearchOverlayOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-testid="search-overlay"
      data-cy="search-overlay"
    >
      <!-- SearchBar component with event listeners -->
      <SearchBar @close-overlay="toggleSearchOverlay" @search="handleSearch" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { mapState, mapMutations } from "vuex";
import { Store } from "vuex"; // Import Store type from Vuex
import AppHeader from "@/components/layout/Header.vue";
import AppFooter from "@/components/layout/Footer.vue";
import AppSidebar from "@/components/layout/Sidebar.vue";
import SearchBar from "@/components/search/SearchBar.vue";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    AppSidebar,
    SearchBar,
  },
  computed: {
    ...mapState("uiState", ["isSidebarOpen"]), // Access sidebar state from Vuex
    isSearchOverlayOpen(): boolean {
      // Explicitly type the return as boolean
      return (this.$store as Store<any>).state.uiState.isSearchOverlayOpen;
    },
  },
  methods: {
    ...mapMutations("uiState", ["toggleSidebar", "setSearchOverlay"]), // Mutations for UI state
    toggleSearchOverlay() {
      // Toggle the search overlay state
      const store = this.$store as Store<any>;
      store.commit(
        "uiState/setSearchOverlay",
        !store.state.uiState.isSearchOverlayOpen
      );
      console.log(
        store.state.uiState.isSearchOverlayOpen
          ? "Search overlay opened"
          : "Search overlay closed"
      );
    },
    handleSearch(query: string) {
      // Handle the search query
      console.log("Search query received:", query);
      this.toggleSearchOverlay(); // Close the overlay after the search
    },
  },
});
</script>

<style scoped>
/* Styles for the Floating Action Button (FAB) */
.fixed {
  position: fixed;
}
.bottom-8 {
  bottom: 2rem;
}
.right-8 {
  right: 2rem;
}
.bg-blue-500 {
  background-color: #3b82f6;
}
.text-white {
  color: #ffffff;
}
.p-4 {
  padding: 1rem;
}
.rounded-full {
  border-radius: 9999px;
}
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.hover\:bg-blue-600:hover {
  background-color: #2563eb;
}
.focus\:ring-4:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5);
}
/* Styles for the Search Overlay */
.bg-opacity-50 {
  background-opacity: 0.5;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.z-50 {
  z-index: 50;
}
</style>
