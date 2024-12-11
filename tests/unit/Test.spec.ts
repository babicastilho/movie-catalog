import { shallowMount } from "@vue/test-utils";
import TestView from "@/views/TestView.vue";
import { createStore } from "vuex";

describe("TestView.vue", () => {
  let storeMock: any;

  beforeEach(() => {
    // Mock Vuex store
    storeMock = createStore({
      getters: {
        getMessage: () => "Test Message",
      },
    });
  });

  it("renders Vuex message correctly", () => {
    const wrapper = shallowMount(TestView, {
      global: {
        plugins: [storeMock],
      },
    });

    expect(wrapper.text()).toContain("Test Message");
  });

  it("contains a router link", () => {
    const wrapper = shallowMount(TestView, {
      global: {
        plugins: [storeMock],
        stubs: {
          "router-link": {
            template: "<a><slot /></a>", // Mock router-link as a simple <a>
          },
        },
      },
    });

    const link = wrapper.find("a");
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe("Go to Home");
  });
});
