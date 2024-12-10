import { createStore } from "vuex";

// Create Vuex Store
const store = createStore({
  state: {
    message: "Vuex is successfully connected!", // State message for testing
  },
  getters: {
    getMessage: (state) => state.message, // Getter to access the message state
  },
});

export default store;
