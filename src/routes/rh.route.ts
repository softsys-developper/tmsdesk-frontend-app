import Conge_rhPage from '@/pages/rh/conge_rh.page.vue';
import Personal_rhPage from '@/pages/rh/personal_rh.page.vue';
import Salaire_paid_rhPage from '@/pages/rh/salaire_paid_rh.page.vue';
import Salaire_rhPage from '@/pages/rh/salaire_rh.page.vue';
import Heure_supp_rhPage from '@/pages/rh/heure_supp_rh.page.vue';
import Prime_rhPage from "@/pages/rh/prime_rh.page.vue"
import Service_rhPage from '@/pages/rh/service_rh.page.vue';

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
      }
   ],
};
