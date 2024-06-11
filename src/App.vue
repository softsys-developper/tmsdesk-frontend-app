<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { onMounted } from "vue";

onMounted(() => {
  // Définir le défilement à 0
  window.scrollTo(0, 0);
});
</script>

<template>
  <Toaster />
  <RouterView></RouterView>
</template>

<style>
* {
  font-family: "Lato", sans-serif;
}
</style>
