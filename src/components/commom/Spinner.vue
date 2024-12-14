<template>
  <div
    class="flex items-center justify-center w-full h-64"
    data-testid="spinner"
    data-cy="spinner"
  >
    <div
      class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"
    ></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SpinnerLoader",
};
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
