// Lógica e mock para testes da SearchBar
describe("SearchBar Logic", () => {
  // Função de fetch da lógica do SearchBar
  const fetchMovies = async (
    query: string
  ): Promise<{ id: number; title: string }[]> => {
    if (!query.trim()) {
      return [];
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.VUE_APP_TMDB_API_KEY
        }&query=${encodeURIComponent(query)}&language=en-US`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
      }));
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  it("returns an empty array for an empty query", async () => {
    const result = await fetchMovies("");
    expect(result).toEqual([]);
  });

  it("fetches movies from the API with a valid query", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [{ id: 1, title: "Matrix" }],
          }),
      })
    ) as jest.Mock;

    const result = await fetchMovies("Matrix");
    expect(result).toEqual([{ id: 1, title: "Matrix" }]);
  });

  it("returns an empty array when the API response is not ok", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    const result = await fetchMovies("ErrorQuery");
    expect(result).toEqual([]);
  });
});
