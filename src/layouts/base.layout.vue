<template>
   <section class="flex flex-col w-full ">
      <BaseHeader />

      <div class="flex gap-2 w-11/12 m-auto mt-44">
         <!-- Content -->

         <slot name="content" />
      </div>
   </section>
</template>
<script lang="ts" setup>
import BaseHeader from '@/components/headers/base.header.vue';
</script>
<style lang="scss" scoped></style>
