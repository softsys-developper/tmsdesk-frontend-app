<template>
    <Button
      :disabled="loading || rule"
      class="px-4 py-1 rounded-md"
      type="submit"
      :class="!loading ? 'bg-gray-800' : 'bg-gray-800/50'"
    >
      <span v-if="!loading" class="text-white font-bold text-sm">Enregistre</span>
      <!-- <SpinnerLoading v-else /> -->
    </Button>
  </template>
  <script lang="ts" setup>
  // import SpinnerLoading from "@/components/";
import { Button } from '@/components/ui/button';
  
  defineProps(["loading", "rule", 'color']);
  </script>
  <style lang="scss" scoped></style>
  