<script setup lang="ts">
import SpinnerLoading from "@/components/loaders/spinner.loading.vue";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modal.store";
import { useUpdateStore } from "@/stores/update.store";
import { computed } from "vue";

defineProps([
  "name",
  "title",
  "description",
  "isUpdated",
  "loading",
  "Func",
  "isCloseBtn",
  "permissions"
]);

const open = computed(() => {
  return useModalStore().open;
});

const emit = defineEmits(["open"]);
const setOpen = () => {
  emit("open", useModalStore().open);
  if (useModalStore().open) {
    useModalStore().open = false;
    useUpdateStore().isUpdate.is = false;
  } else {
    useModalStore().open = true;
  }
  useUpdateStore().isUpdate.is = false;
};

// const is = computed(() => {
//   const Keys = Object.keys(useUpdateStore().isUpdate.data)
//   Keys.forEach((el: any) => {
//     let doc: any = document.querySelector(`#${el}`)
//     console.log(doc)
//     if (doc) doc.value = useUpdateStore().isUpdate.data[el]

//     // for (let option of doc.options) {
//     //    if (option.value === doc.value) {
//     //       option.selected = true;
//     //       break;
//     //    }
//     // }
//   });
// })


</script>

<template>

  <!-- {{ useModalStore().Permissions }} -->
  <!-- {{ is }} -->
  
  <div class="flex"> 
    <Button class="bg-orange-400 font-bold text-base flex items-center jus gap-2" v-if="!isCloseBtn && useModalStore().Permissions.map((el:any) => el.name).includes(permissions)" @click="setOpen">
      <i class="ri-add-line"></i>
      <span class="truncate lg:w-full md:w-32 w-24 font-bold hidden lg:flex">{{
        name
      }}</span>
    </Button>

    <form v-if="open" @submit.prevent="Func"
      class="w-full grid-rows-[auto_minmax(0,1fr)_auto] p-0 fixed z-50 inset-0 flex flex-col items-center justify-center">
      <div  class="bg-gray-800/30 w-full fixed inset-0 h-full overflow-auto -z-40">
      </div>
      <section class="bg-white lg:w-4/12 md:w-8/12 w-11/12 rounded-lg">
        <header class="flex justify-between p-4 pb-2 border-b-[1px]">
          <div class="flex flex-col ">
            <span class="text-lg font-bold"> {{ title }} </span>
            <span class="text-sm">
              {{ description }}
            </span>
          </div>

          <!-- Close Modal -->
          <div class="cursor-pointer" @click="setOpen">
            <i class="ri-close-large-line"></i>
          </div>
        </header>
        <div class="fle flex-col gap-4 pt-2 pb-4  overflow-y-auto px-6">
          <div class="flex flex-col justify-between max-h-[50dvh]">
            <slot name="form" />
          </div>
        </div>
        <footer class="py-3 px-4 flex justify-between w-full border-t-[1px] shadow-lg shadow-top">
          <span class=""></span>
          <Button type="submit">
            <SpinnerLoading size="w-4 h-4" v-if="loading" />
            <span class="font-bold text-base" v-else>{{
              !isUpdated ? "Enregisté" : "Modifier"
            }}</span>
          </Button>
        </footer>
      </section>
    </form>
  </div>
</template>
