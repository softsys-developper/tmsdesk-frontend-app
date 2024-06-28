import Bc_client_logiscPage from '@/pages/logistiques/bc_client_logisc.page.vue';
import Bc_fourniseur_logiscPage from '@/pages/logistiques/bc_fourniseur_logisc.page.vue';
import Bc_fournisseur_add_logicPage from '@/pages/logistiques/bc_fournisseur_add_logic.page.vue';
import Product_logiscPage from '@/pages/logistiques/product_logisc.page.vue';

export const routeLogisc = {
   path: '/logistique',
   children: [
      {
         path: 'produits',
         name: 'LOGISC_PRODUCTS',
         component: Product_logiscPage,
         children: [],
      },
      {
         path: 'bon_de_commande',
         children: [
            {
               path: 'fourniseur',
               name: 'LOGISC_BC_PARTENAIRES',
               component: Bc_fourniseur_logiscPage,
            },
            {
               path: 'fourniseur/add',
               name: 'LOGISC_BC_PARTENAIRES_ADD',
               component: Bc_fournisseur_add_logicPage,
            },
            {
               path: 'clients',
               name: 'LOGISC_BC_CLIENTS',
               component: Bc_client_logiscPage,
            },
         ],
      },
   {
      path: 'livraisons',
      name: 'LOGISC_LIVRAISONS',
      component: () => import('@/pages/logistiques/livraison_logic.page.vue'),
      children: [],
   },
   {
      path: 'livraisons/add',
      name: 'LOGISC_LIVRAISONS_ADD',
      component: () => import('@/pages/logistiques/livraison_add_logic.page.vue'),
      children: [],
   },

   {
      path: 'livraisons/bon-de-livraison',
      name: 'LOGISC_LIVRAISONS_BL',
      component: () => import('@/pages/logistiques/livraison_bl_logic.page.vue'),
      children: [],
   },



   {
      path: 'stock',
      name: 'LOGISC_STOCK',
      component: () => import('@/pages/logistiques/stock_logic.page.vue'),
      children: [],
   },
   ],
};
