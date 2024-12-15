/* eslint-disable */
// Allows TypeScript to recognize Vue components
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// Importing the Vuex Store type
import { Store } from "vuex";
import { State } from "@/store"; // Ensure this path matches your Vuex store structure

// Extending Vue's ComponentCustomProperties to include the Vuex Store
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    // Adds type definitions for $store, with the global Vuex State type
    $store: Store<State>;
  }
}
