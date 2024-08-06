import ClientCrm from '@/pages/crm/client_crm.page.vue';
import Fournisseur_crmPage from '@/pages/crm/fournisseur_crm.page.vue';
import Partner_crmPage from '@/pages/crm/partner_crm.page.vue';
import Prospect_crmPage from '@/pages/crm/prospect_crm.page.vue';
import Rapport_crmPage from '@/pages/crm/rapport_crm.page.vue';
import Prospect_commercial_crmPage from '@/pages/crm/prospect_commercial_crm.page.vue'
import Interlocuteur_crmPage from '@/pages/crm/interlocuteur_crm.page.vue';

export const routeCrm = {
   path: '/crm',
   children: [
      {
         path: 'clients',
         name: 'CRM_CLIENTS',
         component: ClientCrm,
         children: [],
      },
      {
         path: 'prospects',
         name: 'CRM_PROSPECTS',
         component: Prospect_crmPage,
         children: [],
      },
      {
         path: 'prospects',
         name: 'CRM_COMMERCIAL_PROSPECTS',
         component: Prospect_commercial_crmPage,
         children: [],
      },
      {
         path: 'fournisseurs',
         name: 'CRM_FOURNISSEURS',
         component: Fournisseur_crmPage,
         children: [],
      },
      {
         path: 'partenaires',
         name: 'CRM_PARTNERS',
         component: Partner_crmPage,
         children: [],
      },
      {
         path: 'rapports',
         name: 'CRM_RAPPORTS',
         component: Rapport_crmPage,
         children: [],
      },
      {
         path: 'interlocuteur',
         name: 'CRM_INTERLOCUTEUR',
         component: Interlocuteur_crmPage,
         children: [],
      },
   ],
};
