<template>
   <section class="flex flex-col w-full ">
     
      <Sidebar>

         <template v-slot:content >
            <BaseHeader />
            <div class="object-cover w-full h-full -z-40 fixed inset-0 opacity">
         <div class="h-full w-full bg-gray-500/90 absolute"></div>
         <img class="w-full h-full object-cover" src="https://img.freepik.com/vecteurs-libre/paysage-forestier-design-plat_23-2149155031.jpg?size=626&ext=jpg&ga=GA1.1.570627327.1707375469&semt=sph" alt="">
      </div>

      <div class="flex gap-2 w-11/12 m-auto mt-6 pb-24 lg:mb-0 mb-24">
         <!-- Content -->

         <slot name="content" />
      </div>
         </template>

      </Sidebar>  

      
   </section>
</template>
<script lang="ts" setup>
import BaseHeader from '@/components/headers/base.header.vue';
import Sidebar from '@/components/sidebar/sidebar.vue';
</script>
<style lang="scss" scoped></style>
