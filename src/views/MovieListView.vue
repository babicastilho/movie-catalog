<script lang="ts">
import { defineComponent } from "vue";
import MovieList from "@/components/movies/MoviesList.vue";

export default defineComponent({
  name: "MovieListView",
  components: { MovieList },
});
</script>

<template>
  <div>
    <h1>Movie List</h1>
    <MovieList />
  </div>
</template>
