import Conge_rhPage from "@/pages/rh/conge_rh.page.vue";
import Salaire_paid_rhPage from "@/pages/rh/salaire_paid_rh.page.vue";
import Salaire_rhPage from "@/pages/rh/salaire_rh.page.vue";
import Parametre_systemPage from "@/pages/systeme/parametre_system.page.vue";
import Chats_systemPage from "@/pages/systeme/chat_system.page.vue";

export const routeSystem = {
  path: "/system",
  children: [
    {
      path: "parametres",
      name: "SYSTEM_PARAMETRE",
      component: Parametre_systemPage,
      children: [],
    },
    {
      path: "chats",
      name: "SYSTEM_CHATS",
      component: Chats_systemPage,
      children: [],
    },
    {
      path: "salaires",
      name: "RH_SALAIRE",
      component: Salaire_rhPage,
      children: [],
    },
    {
      path: "salaire-paid",
      name: "RH_SALAIRE_PAID",
      component: Salaire_paid_rhPage,
      children: [],
    },
    {
      path: "conge",
      name: "RH_SALAIRE_CONGE",
      component: Conge_rhPage,
      children: [],
    },
  ],
};
