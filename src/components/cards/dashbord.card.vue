<template>
   <div
      class="flex items-start bg-white py-8 px-6 gap-4 border-[1px] rounded-md min-h-full max-h-[16rem] "
   >
      <!-- Icon Refrence -->
      <div class="h-16 w-16">
         <img :src="content.icon" alt="" class="h-full w-full" />
      </div>

      <div class="flex gap-4 flex-col w-8/12">
         <div class="flex flex-col gap-2 ">
            <span class="text-xl font-bold"> {{ content.name }} </span>
            <span class="text-sm"> {{ content.list }} </span>
         </div>

         <div class="" v-if="content.children.length != 0" >
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
