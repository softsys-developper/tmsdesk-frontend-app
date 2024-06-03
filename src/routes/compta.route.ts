import Depense_comptaPage from '@/pages/comptabilites/depense_compta.page.vue';


export const routeCompta = {
   path: '/comptabilites',
   children: [
      {
         path: 'depense',
         name: 'COMPTA_DEPENSE',
         component: Depense_comptaPage,
         children: [],
      },
   {
      path: 'facture',
      name: 'COMPTA_FACTURE',
      component: () => import('@/pages/comptabilites/facture_compta.page.vue'),
      children: [],
   },
   {
      path: 'compte',
      name: 'COMPTA_COMPTE',
      component: () => import('@/pages/comptabilites/compte_compta.page.vue'),
      children: [],
   },
   {
      path: 'transaction',
      name: 'COMPTA_TRANSACTION',
      component: () => import('@/pages/comptabilites/transaction_compta.page.vue'),
      children: [],
   },
   {
      path: 'livre',
      name: 'COMPTA_LIVRE',
      component: () => import('@/pages/comptabilites/livre_compta.page.vue'),
      children: [],
   },

   {
      path: 'bilan',
      name: 'COMPTA_BILAN',
      component: () => import('@/pages/comptabilites/bilan_compta.page.vue'),
      children: [],
   },
      
   ],
};
