<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 transform transition-transform duration-200 ease-in-out',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <hr class="bg-gray-300 dark:bg-gray-600 border-none" />
    <!-- Sidebar Header -->
    <div class="p-4">
      <p>conteúdo da sidebar</p>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AppSidebar",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["toggle-sidebar"],
  setup(props, { emit }) {
    // State for task submenu visibility
    const isTasksOpen = ref(false);

    const toggleTasks = () => {
      isTasksOpen.value = !isTasksOpen.value;
    };

    return {
      isTasksOpen,
      toggleTasks,
    };
  },
});
</script>

<style scoped>
hr {
  height: 1px;
}
</style>
