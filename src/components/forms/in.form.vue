<template>
  <!-- Content -->
  <div class="flex w-full">
    <!--  -->
    <div class="flex flex-col w-full gap-1">
      <label :for="name" class="text-sm font-bold"> {{ label }} </label>

      <Input v-if="select?.length == 0 && isControl == true && type != 'file'" :id="name" :type="type" @input="emitInput"
        class="w-full h-full outline-none bg-transparent py-3" :placeholder="placeholder" />

      <Input v-if="select?.length == 0 && isControl != true && type != 'file'" :id="name" :type="type" :name="name"
        class="w-full h-full outline-none bg-transparent py-3" :placeholder="placeholder" />

        <Input v-if="select?.length == 0 && isControl != true && type == 'file'" :id="name" :type="type" :name="name"
        class="w-full h-full outline-none bg-transparent py-3" :placeholder="placeholder" />

      <SelectedForm :value="value" :select="select" :name="name" :label="label" />


    </div>
  </div>
</template>
<script setup lang="ts">
import { Input } from "@/components/ui/input";

defineProps([
  "label",
  "type",
  "placeholder",
  "name",
  "value",
  "placeholder",
  "error",
  'select',
  'isControl'
]);

// import Label from "../ui/label/Label.vue";
import SelectedForm from '@/components/forms/selected.form.vue'

// Définir les événements que le composant enfant peut émettre
const emit = defineEmits(['update']);

// Fonction pour émettre l'événement
const emitInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update', input.value);
};




</script>
