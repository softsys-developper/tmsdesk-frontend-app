import Marques_systemPage from "@/pages/systeme/marques_system.page.vue";
import Categorie_systemPage from "@/pages/systeme/categorie_system.page.vue";
import Devises_systemPage from "@/pages/systeme/devises_system.page.vue";
import User_systemPage from "@/pages/systeme/user_system.page.vue"
import Role_systemPage from "@/pages/systeme/role_system.page.vue";
import Permisson_systemPage from "@/pages/systeme/permission_system.page.vue";
import DA_systemPage from "@/pages/systeme/DA_system.page.vue";
import Parametre_systemPage from "@/pages/systeme/parametre_system.page.vue";
import Step_systemPage from "@/pages/systeme/step_system.page.vue";
import Holiday_systemPage from "@/pages/systeme/holiday_system.page.vue";

export const routeSystem = {
  path: "/system",
  children: [
    
    {
      path: "parametre",
      name: "SYSTEM_PARAMETRE",
      component: Parametre_systemPage,
      children: [],
    },
    {
      path: "domaine-activite",
      name: "SYSTEM_DA",
      component: DA_systemPage,
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
    {
      path: "permissions",
      name: "SETTING_PERMISSION",
      component: Permisson_systemPage,
      children: [],
    },

    {
      path: "step-prospect",
      name: "SYSTEM_STEP_PROSPECT",
      component: Step_systemPage,
      children: [],
    },
    {
      path: "jour-ferier",
      name: "SYSTEM_HOLIDAY",
      component: Holiday_systemPage,
      children: [],
    },

  ],
};
