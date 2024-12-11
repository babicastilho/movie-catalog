<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-green-500">Hello, Vue!</h1>
    <!-- Font Awesome Icons -->
    <font-awesome-icon icon="home" class="w-6 h-6 text-blue-500 mx-auto my-4" />
    <font-awesome-icon
      :icon="['fab', 'github']"
      class="w-6 h-6 text-black mx-auto my-4"
    />
    <p class="text-gray-500">Powered by Font Awesome</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>
