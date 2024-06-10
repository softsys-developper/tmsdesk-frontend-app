<template>
  <form class="bg-white ring-[1px] ring-gray-300 rounded-md w-full" @submit="SendSetting" >
    <div class="flex justify-between w-full items-center">
      <div class="flex flex-col py-4 px-8 gap-4 w-full">
        <!--  -->
        <div class="flex flex-col gap-4">
          <h1 class="text-xl font-black "> {{ title }} </h1>
          <p class="text-sm">{{ description }}</p>
        </div>

        <!-- Content -->
        <div>
          <slot name="default" />
        </div>
      </div>

      <div class="flex mr-4" v-if="isImage">
        <label for="in_logo" class="bg-gray-100 size-24 rounded-full flex flex-col items-center justify-center"
          v-if="!img">
          <i class="ri-image-add-line text-4xl"></i>
        </label>
        <div class="w-44 h-28 relative flex items-center group" v-else>
          <label for="in_logo"
            class="absolute text-xs uppercase font-black bg-white/90 hidden group-hover:flex w-full p-4 flex-col justify-center items-center">
            <i class="ri-image-add-line text-2xl opacity-90"></i>
            <span class="">Change le logo</span>
          </label>
          <img :src="ImagePreview ? ImagePreview : img" alt="" class="h-full w-full object-cover" />
        </div>
        <input @change="onChangeImage" id="in_logo" type="file" class="hidden" value="" />
      </div>
    </div>

    <!-- Handle -->
    <div class="bg-gray-100 flex justify-between px-4 py-2 border-t-[1px] rounded-b-md">
      <!-- Info  -->
      <div class="text-sm">
        {{ Input?.info }}
      </div>

      <div class="">
        <SaveBtn />
      </div>
    </div>
  </form>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
// import SpinnerLoading from "@/components/loadings/spinner.loading.vue";
import SaveBtn from "@/components/btns/save.btn.vue";

const props = defineProps([
  "title",
  "description",
  "Input",
  "hanldeSave",
  "isImage",
  "placeholder",
  "img",
  "value",
  "fields",
  "SendSetting"
]);

const state = ref({
  content: "",
});

const ImagePreview: any = ref("");

onMounted(() => {
  state.value.content = props.value;
});

const onChangeImage = (e: any) => {
  state.value.content = e.target.files[0];
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e: any) {
    ImagePreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};
</script>
<style lang="scss" scoped></style>