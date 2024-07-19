<template>
  <!-- Content -->
  <div class="flex w-full">
    <!--  -->
    <div class="flex flex-col w-full gap-1">
      <label :for="name" class="text-xs uppercase font-extrabold"> {{ label }} </label>


      <Input
        v-if=" (type == 'text' || type == 'email' || type == 'password' || type == 'number' || type == 'tel' || type == 'color' || type == 'date')"
        :id="name"
        :type="type"
        :name="name"
        @input="emitInput($event.target.value)"
        class="w-full h-full outline-none bg-gray-100 py-3"
        :placeholder="placeholder ? placeholder : 'Entrez l\'information correspondante'  "
        
      />

      <DatePicker
      v-if=" ( type == 'date')"
        :id="name"
        :type="type"
        :name="name"
        @input="emitInput($event.target.value)"
       showIcon :showOnFocus="false" />

      <Input
        v-if=" type == 'file'"
        :id="name"
        :type="type"
        :name="name"
        class="w-full h-full outline-none bg-gray-100 py-3"
        :placeholder="placeholder"
      />

      <Textarea
        v-if="type == 'textarea'"
        :id="name"
        :type="type"
        :name="name"
        class="w-full h-full  outline-none bg-gray-100 py-3"
        :placeholder="placeholder"
      />
      
      <SelectedForm
        :value="value"
        :select="select"
        :name="name"
        :label="label"
       :type="type"
      />
    </div>
  </div>

</template>
<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { computed, ref, watch } from 'vue';

defineProps([
  "label",
  "type",
  "placeholder",
  "name",
  "value",
  "placeholder",
  "error",
  "select",
  "isControl",
  "modelValue"
]);

// import Label from "../ui/label/Label.vue";
import SelectedForm from "@/components/forms/selected.form.vue";

const emit = defineEmits(['update:modelValue']);

// Fonction pour émettre l'événement
const emitInput = (value: any) => {
  emit('update:modelValue', value);
};
</script>
