import Proforma_addPage from "@/pages/proforma/proforma_add.page.vue";
import Proforma_listPage from "@/pages/proforma/proforma_list.page.vue";
import Proforma_nbcPage from "@/pages/proforma/proforma_nbc.page.vue";
import Proforma_nbc_listPage from "@/pages/proforma/profoma_nbc_list.page.vue";
import Proforma_showPage from "@/pages/proforma/proforma_show.page.vue";

export const routeProforma = {
  path: "/proforma",
  children: [
    {
      path: "",
      name: "PROFORMA_LIST",
      component: Proforma_listPage,
      children: [],
    },
    {
      path: "add",
      name: "PROFORMA_ADD",
      component: Proforma_addPage,
      children: [],
    },
    {
      path: "detail",
      name: "PROFORMA_DETAIL",
      component: Proforma_showPage,
      children: [],
    },
    {
      path: "nbc",
      name: "PROFORMA_NBC",
      component: Proforma_nbcPage,
      children: [],
    },
    {
      path: "nbc/list",
      name: "PROFORMA_NBC_LIST",
      component: Proforma_nbc_listPage,
      children: [],
    },
  ],
};
