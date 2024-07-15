<script setup lang="ts">

defineProps(['select', 'name', 'label', 'value', 'type', 'modelValue'])
const emit = defineEmits(['update:modelValue']);



// Fonction pour émettre l'événement
const emitInput = (value:any) => {
  console.log(value.target.value)
  emit('update:modelValue', value.target.value);
};

</script>

<template>

  
  <!-- <input v-if="select?.length != 0" :value="isValue" class="px-2 py-2 border-[1px] border-gray-300/80 rounded-lg" :list="'list-' + name"
    :id="name" :name="name" :placeholder="label" />

  <datalist :id="'list-' + name"  >
    <option  v-for="ins in select" :key="ins?.id" :value="ins?.id"> {{ ins.title || ins.label || ins.name ||
      ins.libelle_salaire || ins.nom || ins.categorie
      || ins.libelle
      }}</option>
  </datalist> -->


  <!-- <div class="">

    <input type="text" class="w-full py-2 border-[1px]" >
    <div class="bg-white shadow-sm flex w-full flex-col p-2">
      
      <div v-for="ins in select" :key="ins?.id" :value="ins?.id" class="" >
        {{ ins.title || ins.label || ins.name || ins.libelle_salaire || ins.nom || ins.libelle || ins.categorie
        }}
      </div>

    </div>
  </div> -->

  <div class="flex flex-col gap-1" v-if="select?.length != 0 && type == 'select'" >
    <label for="ice-cream-choice" v-if="label" > {{ label }} </label>
    <select :id="name" :name="name"  :value="modelValue"
      class="px-2 py-2 border-[1px] border-gray-300/80 bg-gray-100 rounded-lg w-full"  @change="emitInput($event)" >
      <option v-for="ins in select" :key="ins?.id" :value="ins?.id">
        {{ ins.title || ins.label || ins.name || ins.libelle_salaire || ins.numero_compte || ins.nom || ins.libelle || ins.categorie || ins.nom_devise || ins.numero_proforma 
        }}</option>
    </select>
  </div>
  

 

  <div class="" v-if="select?.length == 0  && type == 'select'">
    <select :id="name" :name="name" class="px-2 py-2 border-[1px] border-gray-300/80 rounded-lg w-full">
      <option> Aucune donnée </option>
    </select>
  </div>


</template>