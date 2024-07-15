import Conge_rhPage from '@/pages/rh/conge_rh.page.vue';
import Personal_rhPage from '@/pages/rh/personal_rh.page.vue';
import Salaire_paid_rhPage from '@/pages/rh/salaire_paid_rh.page.vue';
import Salaire_rhPage from '@/pages/rh/salaire_rh.page.vue';
import Heure_supp_rhPage from '@/pages/rh/heure_supp_rh.page.vue';
import Prime_rhPage from "@/pages/rh/prime_rh.page.vue"
import Service_rhPage from '@/pages/rh/service_rh.page.vue';
import Personal_addPage from '@/pages/rh/__partials/personal_add.page.vue';
import Personal_showPage from '@/pages/rh/__partials/personal_show.page.vue';

import Stagiaire_addPage from '@/pages/rh/__partials/stagiaire_add.page.vue';
import Stagiaire_rhPage from '@/pages/rh/stage_rh.page.vue';

export const routeRh = {
   path: '/rh',
   children: [
      {
         path: 'personal',
         name: 'RH_PERSONAL',
         component: Personal_rhPage,
         children: [],
      },
      {
        path: 'personal/add',
        name: 'RH_PERSONAL_ADD',
        component: Personal_addPage,
        children: [],
     },
     {
      path: 'personal/show',
      name: 'RH_PERSONAL_SHOW',
      component: Personal_showPage,
      children: [],
   },
      {
        path: 'salaires',
        name: 'RH_SALAIRE',
        component: Salaire_rhPage,
        children: [],
      },
      {
        path: 'departement',
        name: 'RH_DEPARTEMENT',
        component: Service_rhPage,
        children: [],
      },
      {
         path: 'salaire-paid',
         name: 'RH_SALAIRE_PAID',
         component: Salaire_paid_rhPage,
         children: [],
       },
       {
         path: 'conge',
         name: 'RH_SALAIRE_CONGE',
         component: Conge_rhPage,
         children: [],
       },
       {
         path: 'heure_supplementaire',
         name: 'RH_HEURE_SUPPLEMANTAIRE',
         component: Heure_supp_rhPage,
         children: [],
       },
       {
        path: 'prime_et_indemnite',
        name: 'RH_INDEMNITE_PRIME',
        component: Prime_rhPage,
        children: [],
      },
      {
        path: 'stagiaire',
        name: 'RH_STAGIAIRE',
        component: Stagiaire_rhPage,
        children: [],
     },
     {
       path: 'stagiaire/add',
       name: 'RH_STAGIAIRE_ADD',
       component: Stagiaire_addPage,
       children: [],
    },
   ],
};
