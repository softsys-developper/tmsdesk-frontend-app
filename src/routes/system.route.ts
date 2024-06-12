import Parametre_systemPage from "@/pages/systeme/parametre_system.page.vue";
import Marques_systemPage from "@/pages/systeme/marques_system.page.vue";
import Categorie_systemPage from "@/pages/systeme/categorie_system.page.vue";
import Devises_systemPage from "@/pages/systeme/devises_system.page.vue";

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
      path: "marques",
      name: "SYSTEM_MARQUE",
      component: Marques_systemPage,
      children: [],
    },
{
      path: "categories",
      name: "SYSTEM_CATEGORY",
      component: Categorie_systemPage,
      children: [],
    },
    {
      path: "devises",
      name: "SYSTEM_DEVISE",
      component: Devises_systemPage,
      children: [],
    },
    


  ],
};
