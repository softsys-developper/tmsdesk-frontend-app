<template>
   <div
      class="flex items-start bg-white py-8 px-6 gap-4 border-[1px] rounded-md h-[12rem]"
   >
      <!-- Icon Refrence -->
      <div class="h-20">
         <img :src="content.icon" alt="" class="h-full" />
      </div>

      <div class="flex gap-8 flex-col w-9/12">
         <div class="flex flex-col gap-2 h-16">
            <span class="text-xl font-bold"> {{ content.name }} </span>
            <span class="text-sm"> {{ content.list }} </span>
         </div>

         <div class="">
            <BtnMore name="Plus d'options" :title="content.name" :dataDropMenu="content.children" />
         </div>
      </div>
   </div>
</template>
<script lang="ts" setup>
import BtnMore from '@/components/mores/btn.more.vue';
defineProps(['content']);
</script>
<style lang="scss" scoped></style>
