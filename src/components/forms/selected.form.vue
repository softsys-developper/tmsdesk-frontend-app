<script setup lang="ts">

defineProps(['select', 'name', 'label', 'value'])

</script>

<template>

  <!-- <label for="ice-cream-choice" > {{ label }} </label> -->
  <!-- <input v-if="select?.length != 0" :value="isValue" class="px-2 py-2 border-[1px] border-gray-300/80 rounded-lg" :list="'list-' + name"
    :id="name" :name="name" :placeholder="label" />

  <datalist :id="'list-' + name"  >
    <option  v-for="ins in select" :key="ins?.id" :value="ins?.id"> {{ ins.title || ins.label || ins.name ||
      ins.libelle_salaire || ins.nom || ins.categorie
      || ins.libelle
      }}</option>
  </datalist> -->


  <select v-if="select?.length != 0" :id="name" :name="name"
    class="px-2 py-2 border-[1px] border-gray-300/80 rounded-lg">
    <option v-for="ins in select" :key="ins?.id" :value="ins?.id">
      {{ ins.title || ins.label || ins.name || ins.libelle_salaire || ins.nom  || ins.libelle || ins.categorie
      }}</option>
  </select>
</template>