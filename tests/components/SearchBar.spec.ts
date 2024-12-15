import { shallowMount } from "@vue/test-utils";
import SearchBar from "@/components/search/SearchBar.vue";

// Mock do router para simular navegação
jest.mock("vue-router", () => ({
  useRouter: () => ({
    push: jest.fn(), // Simula o redirecionamento
  }),
}));

describe("SearchBar.vue", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(SearchBar, {
      data() {
        return {
          query: "",
          results: [],
          suggestion: "Matrix", // Sugestão mockada
        };
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render the input field correctly", () => {
    const input = wrapper.find("input[data-testid='search-input']");
    expect(input.exists()).toBe(true);
  });

  it("should update query when user types", async () => {
    const input = wrapper.find("input[data-testid='search-input']");
    await input.setValue("Avengers");
    expect(wrapper.vm.query).toBe("Avengers");
  });

  it("should display suggestions when query is empty", () => {
    wrapper.setData({ query: "" }); // Simula query vazia
    expect(wrapper.text()).toContain('No ideas? Try typing "Matrix"!');
  });

  it("should show search results when query is provided", async () => {
    const mockResults = [
      { id: 1, title: "The Matrix" },
      { id: 2, title: "Inception" },
    ];
    wrapper.setData({ results: mockResults });
    await wrapper.vm.$nextTick();

    const resultItems = wrapper.findAll("li");
    expect(resultItems.length).toBe(2);
    expect(resultItems[0].text()).toBe("The Matrix");
    expect(resultItems[1].text()).toBe("Inception");
  });

  it("should emit search event when search button is clicked", async () => {
    const searchButton = wrapper.find(
      "button[data-testid='search-submit-button']"
    );
    await searchButton.trigger("click");
    expect(wrapper.emitted("search")).toBeTruthy();
  });

  it("should clear query and results after selecting a movie", async () => {
    const mockMovie = { id: 1, title: "The Matrix" };
    wrapper.vm.selectMovie(mockMovie); // Simula a seleção de um filme

    expect(wrapper.vm.query).toBe(""); // Query deve ser limpa
    expect(wrapper.vm.results.length).toBe(0); // Resultados devem ser limpos
  });

  it("should redirect to movie details when a movie is selected", async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useRouter } = require("vue-router");
    const router = useRouter();

    const mockMovie = { id: 1, title: "The Matrix" };
    wrapper.vm.selectMovie(mockMovie);

    expect(router.push).toHaveBeenCalledWith("/movielist/1");
  });
});
