<template>
  <div
    class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 w-full"
    data-testid="movie-details"
    data-cy="movie-details"
  >
    <!-- Imagem do filme -->
    <div class="flex-shrink-0 w-full md:w-1/3">
      <img
        v-if="movie?.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie?.title || 'Movie Poster'"
        class="rounded shadow-md w-full"
        data-testid="movie-poster"
        data-cy="movie-poster"
      />
    </div>

    <!-- Detalhes do filme -->
    <div class="flex flex-col space-y-4 w-full">
      <h1
        v-if="movie?.title"
        class="text-3xl font-bold"
        data-testid="movie-title"
        data-cy="movie-title"
      >
        {{ movie.title }}
      </h1>
      <p
        v-if="movie?.overview"
        class="text-lg text-gray-700 dark:text-gray-300"
        data-testid="movie-overview"
        data-cy="movie-overview"
      >
        {{ movie.overview }}
      </p>

      <!-- Gêneros do filme -->
      <div
        v-if="movie?.genres?.length"
        class="text-sm text-gray-700 dark:text-gray-300"
        data-testid="movie-genres"
        data-cy="movie-genres"
      >
        <strong>Genres: </strong>
        <span>{{ movie.genres.map((genre) => genre.name).join(", ") }}</span>
      </div>

      <!-- Lista de Atores -->
      <div
        v-if="cast.length"
        class="text-sm text-gray-700 dark:text-gray-300"
        data-testid="movie-cast-container"
        data-cy="movie-cast-container"
      >
        <strong>Cast:</strong>
        <ul
          class="list-disc mt-2 ml-5 space-y-1"
          data-testid="movie-cast"
          data-cy="movie-cast"
        >
          <li v-for="actor in cast" :key="actor.id">
            {{ actor.name }} as
            <span class="italic">{{ actor.character }}</span>
          </li>
        </ul>
      </div>
      <p
        v-if="movie?.release_date"
        class="text-sm text-gray-500 dark:text-gray-400"
        data-testid="movie-release-date"
        data-cy="movie-release-date"
      >
        <strong>Release Date:</strong> {{ movie.release_date }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
}

interface Cast {
  id: number;
  name: string;
  character: string;
}

export default defineComponent({
  name: "MovieDetails",
  props: {
    movie: {
      type: Object as () => Movie,
      required: true,
    },
    cast: {
      type: Array as () => Cast[],
      required: true,
    },
  },
});
</script>

<style scoped>
/* Adicione estilos específicos se necessário */
</style>
