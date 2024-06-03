<template>
  

   <div class="w-11/12 m-auto items-center flex gap-8 h-full text-black">
            <div v-for="menu in content" class="flex items-center">
         <img :src="menu.icon" class="h-5" alt="">
   <BtnMore :isNotBg="true" :name="menu.name" :title="menu.name" :dataDropMenu="menu.children" />
</div>
</div>
   
   <!-- <BtnMore  /> -->
</template>
<script lang="ts" setup>
import BtnMore from '@/components/mores/btn.more.vue';
    defineProps(['content'])
</script>
<style lang="scss" scoped></style>
