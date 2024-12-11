<template>
  <!-- Simple Home page -->
  <div class="text-center">
    <h1 class="text-4xl font-bold text-green-500">Hello, Vue!</h1>
    <HomeIcon class="w-6 h-6 text-blue-500 mx-auto my-4" />
    <p class="text-gray-500">Powered by Heroicons</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// Import the icon from the Heroicons library
import { HomeIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "HomeView",
  components: {
    HomeIcon,
  },
});
</script>
