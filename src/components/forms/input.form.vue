<template>
  <!-- Content -->
  <div class="flex w-full" v-if="!isImage">
    <!--  -->
    <div class="flex flex-col w-full gap-2">
      <label for="" class="text-xs font-extrabold "> {{ title }} </label>
      <div
        class="flex ring-[1px] ring-gray-300 focus-within:ring-gray-700 w-full h-12 rounded-md px-4 text-sm bg-gray-100"
      >
        <input
          :type="Input?.type"
          :name="name"
          :value="value"
          class="w-full h-full outline-none bg-transparent py-2 "
          :placeholder="placeholder"
        />
      </div>
    </div>
    <!-- Error Input -->
    <span class="" v-if="Input?.error.path == ''">
      {{ Input?.error.message }}
    </span>
  </div>
</template>
<script setup lang="ts">
defineProps([
  "title",
  "description",
  "Input",
  "hanldeSave",
  "isImage",
  "placeholder",
  "img",
  "value",
  "fields",
  "name"
]);
</script>
