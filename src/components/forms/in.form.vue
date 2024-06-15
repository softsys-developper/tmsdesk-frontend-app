<template>
  <!-- Content -->
  <div class="flex w-full">
    <!--  -->
    <div class="flex flex-col w-full gap-2">
      <label for="" class="text-base font-bold"> {{ label }} </label>

      <Input
        v-if="select?.length == 0"
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
              {{ ins.title || ins.label || ins.name || ins.libelle_salaire }}
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
  'select'
]);
</script>
