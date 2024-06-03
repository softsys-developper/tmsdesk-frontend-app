import Proforma_addPage from '@/pages/proforma/proforma_add.page.vue';
import Proforma_listPage from '@/pages/proforma/proforma_list.page.vue';


export const routeProforma = {
   path: '/proforma',
   children: [
      {
         path: '',
         name: 'PROFORMA_LIST',
         component: Proforma_listPage,
         children: [],
      },
      {
        path: 'add',
        name: 'PROFORMA_ADD',
        component: Proforma_addPage,
        children: [],
      },
      
   ],
};
