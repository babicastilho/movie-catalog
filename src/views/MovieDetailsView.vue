<template>
  <div class="container mx-auto p-4">
    <MovieDetails :id="id" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MovieDetails from "@/components/movies/MovieDetails.vue";

export default defineComponent({
  name: "MovieDetailsView",
  components: { MovieDetails },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
});
</script>
