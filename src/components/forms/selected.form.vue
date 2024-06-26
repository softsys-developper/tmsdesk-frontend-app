<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps(['select', 'name', 'label', 'value'])

// Définir les événements que le composant enfant peut émettre
const emit = defineEmits(['update']);


// Charger les données lorsque le composant est monté
onMounted(() => {
  loadItemData();
});

// Fonction pour émettre l'événement
// const emitInput = (event: Event) => {
//   const input = event.target as HTMLInputElement;
//   emit('update', input.value);
// };




// Reactive property for the selected item ID
const selectedItemId = ref<number | null>(null);

// Function to load the selected item data (you can replace this with an API call)
const loadItemData = () => {
  // Précharger l'élément sélectionné, par exemple, l'élément avec l'ID 2
  console.log('...', props.value)
  const preloadedItemId = props.value;  // Remplacez cela par l'ID que vous voulez précharger
  selectedItemId.value = preloadedItemId;
};

// Charger les données lorsque le composant est monté
onMounted(() => {
  loadItemData();
});
</script>

<template>
    <select v-if="select?.length != 0" :id="name"  :name="name" 
        class="px-2 py-2 border-[1px] border-gray-300/80 rounded-lg">
        <option  v-for="ins in select" :key="ins?.id" :value="ins?.id">
            {{ ins.title || ins.label || ins.name || ins.libelle_salaire || ins.nom || ins.categorie || ins.libelle
            }}</option>
    </select>
</template>