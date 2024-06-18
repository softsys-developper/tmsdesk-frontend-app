<template>
   <div class="flex flex-col gap-2">
      <!--  -->
      <div class="flex justify-between px-4 py-4">
         <div class="">
            <span class="text-xl font-black"> {{ title }} </span>
         </div>
         <div class="">
            <slot name="created" />
         </div>
      </div>

     
   </div>
</template>
<script lang="ts" setup>



defineProps(['title'])
</script>
<style lang="scss" scoped></style>
