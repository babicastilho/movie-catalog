<template>
  <div v-if="movie" class="movie-details">
    <h2 class="text-3xl font-bold">{{ movie.title }}</h2>
    <img :src="movie.poster_path" alt="Movie Poster" />
    <p>{{ movie.overview }}</p>
    <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "MovieDetails",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const movie = ref(null);

    onMounted(async () => {
      await store.dispatch("moviesState/fetchMovieDetails", props.id);
      movie.value = store.state.moviesState.selectedMovie;
    });

    return { movie };
  },
});
</script>
