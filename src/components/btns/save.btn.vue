<template>
    <button
      :disabled="loading"
      class="px-4 py-1 rounded-md"
      type="submit"
      :class="!loading ? 'bg-gray-800' : 'bg-gray-800/50'"
    >
      <span v-if="!loading" class="text-white font-bold text-sm">Enregistre</span>
      <!-- <SpinnerLoading v-else /> -->
    </button>
  </template>
  <script lang="ts" setup>
  // import SpinnerLoading from "@/components/";
  
  defineProps(["loading"]);
  </script>
  <style lang="scss" scoped></style>
  