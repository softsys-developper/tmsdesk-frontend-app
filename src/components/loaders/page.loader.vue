<template>
   <div class="h-fill flex justify-center items-center h-[50vh] w-8/12 m-auto" v-if="data.length == 0 || loading" >
      <SpinnerLoading size="w-12 h-12" v-if="loading" />


      <div class="flex flex-col justify-center items-center " v-if="data.length == 0 && loading == false">

         <img src="/images/empty/empty_pj.svg" class="h-48 w-48" alt="" srcset="">

<span class="text-2xl font-ligth " > Aucune information disponible...</span>



      </div>


   </div>
</template>
<script lang="ts" setup>
import SpinnerLoading from './spinner.loading.vue';
defineProps(['data', 'loading', 'name']);
</script>
<style lang="scss" scoped></style>
