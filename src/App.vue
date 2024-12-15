<template>
  <div id="app" class="flex flex-col h-screen">
    <!-- Header -->
    <AppHeader @toggle-search-overlay="toggleSearchOverlay" />

    <div class="flex flex-1 overflow-hidden relative">
      <!-- Sidebar -->
      <aside
        :class="[
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:transform-none z-10',
        ]"
        data-testid="sidebar"
        data-cy="sidebar"
      >
        <AppSidebar />
      </aside>

      <!-- Main Content -->
      <main
        class="flex-1 overflow-y-auto p-4 bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
        data-testid="main-content"
        data-cy="main-content"
      >
        <router-view />
      </main>
    </div>

    <!-- Footer -->
    <AppFooter class="p-4 text-center" />

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

    <!-- Search Overlay -->
    <div
      v-if="isSearchOverlayOpen"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      data-testid="search-overlay"
      data-cy="search-overlay"
    >
      <SearchBar @close-overlay="toggleSearchOverlay" @search="handleSearch" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { mapState, mapMutations } from "vuex";
import { Store } from "vuex";
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
    ...mapState("uiState", ["isSidebarOpen"]),
    isSearchOverlayOpen(): boolean {
      return (this.$store as Store<any>).state.uiState.isSearchOverlayOpen;
    },
  },
  methods: {
    ...mapMutations("uiState", ["toggleSidebar", "setSearchOverlay"]),
    toggleSearchOverlay() {
      const store = this.$store as Store<any>;
      store.commit(
        "uiState/setSearchOverlay",
        !store.state.uiState.isSearchOverlayOpen
      );
    },
    handleSearch(query: string) {
      console.log("Search query received:", query);
      this.toggleSearchOverlay();
    },
  },
});
</script>

<style scoped>
/* Scrollbar customization */
main::-webkit-scrollbar {
  width: 8px;
}

main::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

main::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
