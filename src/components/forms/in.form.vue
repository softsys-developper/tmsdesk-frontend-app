<template>
  <!-- Content -->
  <div class="flex w-full">
    <!--  -->
    <div class="flex flex-col w-full gap-1">
      <label for="" class="text-sm font-bold"> {{ label }} </label>

      <Input
        v-if="select?.length == 0 && isControl == true"
        :id="name"
        :type="type"
        @input="emitInput"
        class="w-full h-full outline-none bg-transparent py-3"
        :placeholder="placeholder"
      />

      <Input
        v-if="select?.length == 0 && isControl != true"
        :id="name"
        :type="type"
        :name="name"
        class="w-full h-full outline-none bg-transparent py-3"
        :placeholder="placeholder"
      />

      <Select
        :id="name"
        v-if="select?.length != 0"
        :type="type"
        :name="name"
        :value="value"
        selected
      >
        <SelectTrigger>
          <SelectValue :placeholder="label" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel> {{label}} </SelectLabel>
            <SelectItem
              v-for="ins in select"
              :key="ins?.id"
              :value="ins?.id"
            >
              {{ ins.title || ins.label || ins.name || ins.libelle_salaire || ins.nom || ins.categorie || ins.libelle }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

import { defineEmits } from 'vue';

// Définir les événements que le composant enfant peut émettre
const emit = defineEmits(['update']);

// Fonction pour émettre l'événement
const emitInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update', input.value);
};
</script>
