<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";
import { computed, onActivated, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useChatStore } from "./stores/notifications/notif.store";

const route = useRoute()
// const router = useRouter()

const inactivityTimeout = ref();
const inactivityDuration = 500000; // Durée d'inactivité (en millisecondes), ici 5 minutes

// Fonction pour réinitialiser le temporisateur
const resetTimer = () => {
  clearTimeout(inactivityTimeout.value);
  inactivityTimeout.value = setTimeout(logoutUser, inactivityDuration);
};

// Fonction pour déconnecter l'utilisateur ou déclencher une action en cas d'inactivité
const logoutUser = () => {
  console.log("Utilisateur inactif depuis trop longtemps. Déconnexion automatique...");
  // Exemple: router.push('/logout'); pour rediriger vers la page de déconnexion
  if (route.name != 'SignIn') {
    window.localStorage.clear()
    location.assign('/')
  }
};

// Ajouter des écouteurs d'événements lorsque le composant est monté
onMounted(() => {
  resetTimer();
  window.addEventListener('mousemove', resetTimer);
  window.addEventListener('keypress', resetTimer);
  window.addEventListener('scroll', resetTimer); // Ajoutez d'autres événements si nécessaire
});

// Nettoyer les écouteurs d'événements lorsque le composant est détruit
onUnmounted(() => {
  window.removeEventListener('mousemove', resetTimer);
  window.removeEventListener('keypress', resetTimer);
  window.removeEventListener('scroll', resetTimer); // Assurez-vous de supprimer tous les événements ajoutés
  clearTimeout(inactivityTimeout.value);
});


// const CHAT_ECHO = computed(() => {
//   useChatStore().created()
// })

const CHAT_ECHO_MESSAGE = computed(() => {
 console.log(useChatStore().messages)
})




onActivated(() => {
  window.scrollTo(0, 0);
})
onMounted(() => {
  useChatStore().created()
  // Définir le défilement à 0
  window.scrollTo(0, 0);
});


</script>

<template>
  <Toaster  />
  <!-- <ModalFormLayout v-if="open" /> -->
   <!-- {{CHAT_ECHO}} -->
    {{CHAT_ECHO_MESSAGE}}
  <RouterView>
  </RouterView>
</template>

<style>
* {
  font-family: "Lato", sans-serif;
}
</style>
