<template>
   <div class="h-fill flex justify-center items-center h-[50vh] w-8/12 m-auto" v-if="data.length == 0 || loading" >
      <SpinnerLoading size="w-12 h-12" v-if="loading" />
      <span class="text-4xl font-ligth " v-if="data.length == 0 && loading == false">{{name}}, ajouter dès maintenant... </span>
   </div>
</template>
<script lang="ts" setup>
import SpinnerLoading from './spinner.loading.vue';
defineProps(['data', 'loading', 'name']);
</script>
<style lang="scss" scoped></style>
