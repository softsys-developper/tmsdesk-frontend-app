import Bc_client_logiscPage from '@/pages/logistiques/bc_client_logisc.page.vue';
import Bc_fourniseur_logiscPage from '@/pages/logistiques/bc_fourniseur_logisc.page.vue';
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
               path: 'partenaires',
               name: 'LOGISC_BC_PARTENAIRES',
               component: Bc_fourniseur_logiscPage,
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
   ],
};
