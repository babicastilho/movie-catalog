import { createStore } from "vuex";

export default createStore({
  state: {
    message: "Welcome to Vuex Store!",
  },
  getters: {
    getMessage: (state) => state.message,
  },
  mutations: {},
  actions: {},
  modules: {},
});
