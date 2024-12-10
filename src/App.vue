<template>
  <div class="text-center">
    <!-- Display Vuex message -->
    <h1 class="text-4xl font-bold text-blue-500">{{ message }}</h1>

    <!-- Router link to navigate to Home -->
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex"; // Import Vuex store hook

export default defineComponent({
  setup() {
    const store = useStore(); // Access Vuex store
    const message = computed(() => store.getters.getMessage); // Compute message from Vuex store
    return { message };
  },
});
</script>
