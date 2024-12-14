<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MovieDetailsView",
  setup() {
    const store = useStore();
    const route = useRoute();

    // Acessar estados do Vuex
    const movie = computed(() => store.state.movieDetails.movie);
    const cast = computed(() => store.state.movieDetails.cast);
    const isLoading = computed(() => store.state.movieDetails.isLoading);
    const error = computed(() => store.state.movieDetails.error);

    // Buscar detalhes do filme ao montar o componente
    onMounted(() => {
      const movieId = parseInt(route.params.id as string, 10);
      store.dispatch("movieDetails/fetchMovieDetails", movieId);
    });

    return { movie, cast, isLoading, error };
  },
});
</script>
