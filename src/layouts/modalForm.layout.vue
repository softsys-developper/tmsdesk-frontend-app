

<script setup lang="ts">
import SpinnerLoading from "@/components/loaders/spinner.loading.vue";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores/modal.store";
import { useUpdateStore } from "@/stores/update.store";

defineProps([
  "name",
  "title",
  "description",
  "isUpdated",
  "loading",
  "Func",
]);0


const setOpen = () => {
  if (useModalStore().open) {
    useModalStore().open = false;
    useUpdateStore().isUpdate.is = false;
  } else {
    useModalStore().open = true;
  }
  useUpdateStore().isUpdate.is = false;
};


</script>

<template>
<form  @submit.prevent="Func"
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

</template>
