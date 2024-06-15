import Parametre_systemPage from "@/pages/systeme/parametre_system.page.vue";
import Marques_systemPage from "@/pages/systeme/marques_system.page.vue";
import Categorie_systemPage from "@/pages/systeme/categorie_system.page.vue";
import Devises_systemPage from "@/pages/systeme/devises_system.page.vue";
import User_systemPage from "@/pages/systeme/user_system.page.vue"
import Role_systemPage from "@/pages/systeme/role_system.page.vue";

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
    {
      path: "users",
      name: "SETTING_USER",
      component: User_systemPage,
      children: [],
    },
    {
      path: "roles",
      name: "SETTING_ROLES",
      component: Role_systemPage,
      children: [],
    },

  ],
};
