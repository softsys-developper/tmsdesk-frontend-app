import { AppService } from "@/services/app.services"

export const MenuApp = [
   {
      name: 'CRM',
      icon: `https://${AppService().url}/images/icons/crm.png`,
      list: 'Clients, prospects, partenaires',
      route: '',
      children: [
         {
            icon: 'ri-user-star-line',
            id: 'CRM_CLIENTS',
            name: 'Clients',
            route: 'CRM_CLIENTS'
         },
         {
            icon: 'ri-user-search-line',
            id: 'CRM_PROSPECTS',
            name: 'Prospects',
            route: 'CRM_PROSPECTS'
         },
         {
            icon: 'ri-user-search-line',
            id: 'CRM_FOURNISSEURS',
            name: 'Fournisseurs',
            route: 'CRM_FOURNISSEURS'
         },
         {
            icon: 'ri-user-heart-line',
            id: 'CRM_PARTNERS',
            name: 'Partenaires',
            route: 'CRM_PARTNERS'
         },
      ],
   },
   {
      name: 'R. HUMAINES',
      icon: `https://${AppService().url}/images/icons/customer-service.png`,
      list: 'Employés, salaires, heure sup et permissions',
      route: '',
      children: [
         {
            icon: 'ri-user-2-line',
            id: 'HUMAINES_PERSONEL',
            name: 'Employés',
            route: 'RH_PERSONAL'
         },
         {
            icon: 'ri-user-shared-2-line',
            id: 'HUMAINES_CONGES',
            name: 'Congés',
            route: 'RH_SALAIRE_CONGE'
         },
         {
            icon: 'ri-currency-line',
            id: 'HUMAINES_SALAIRE',
            name: 'Salaires',
            route: 'RH_SALAIRE'
         },
         {
            icon: 'ri-cash-line',
            id: 'HUMAINES_PAID',
            name: 'Paiement de salaire',
            route: 'RH_SALAIRE_PAID'
         },
         {
            icon: 'ri-calendar-schedule-line',
            id: 'HUMAINES_PAID',
            name: 'Heure supplémentaire ',
            route: 'RH_HEURE_SUPPLEMANTAIRE'
         },
         {
            icon: 'ri-building-line',
            id: 'HUMAINES_DEPARTEMENT',
            name: 'Departements',
            route: 'RH_DEPARTEMENT'
         },
         {
            icon: 'ri-scan-line',
            id: 'HUMAINES_INDEMNITE_PRIME',
            name: 'Indemnité & Prime',
            route: 'RH_INDEMNITE_PRIME'
         },
         // {
         //    icon: 'ri-user-follow-line',
         //    id: 'HUMAINES_PERMISSIONS',
         //    name: 'Permissions',
         //    route: 'HOME'
         // },
      ],
   },
   {
      name: 'Proforma',
      icon: `https://${AppService().url}/images/icons/receipt.png`,
      list: 'Prospects, clients, fourniseurs',
      route: '',
      children: [
         {
            icon: 'ri-user-2-line',
            id: 'PROFORMA_PROSPECTS',
            name: 'Liste des proformas',
            route: 'PROFORMA_LIST'
         },
         {
            icon: 'ri-user-2-line',
            id: 'PROFORMA_PROSPECTS_ADD',
            name: 'Ajouter des proformas',
            route: 'PROFORMA_ADD'
         },
         // {
         //    icon: 'ri-user-2-line',
         //    id: 'PROFORMA_CLIENTS',
         //    name: 'Clients',
         //    route: 'HOME'
         // },
         // {
         //    icon: 'ri-store-line',
         //    id: 'PROFORMA_FOURNISEURS',
         //    name: 'Fourniseurs',
         //    route: 'HOME'
         // },
      ],
   },
   {
      name: 'Comptabilités',
      icon: `https://${AppService().url}/images/icons/budget.png`,
      list: 'Factures, Porformas, Dépenses, caisse, Banque, Grand livre, Bilan',
      route: '',
      children: [
         {
            icon: 'ri-file-list-3-line',
            id: 'COMPTABILITE_PROFORMA',
            name: 'Factures',
            route: 'HOME'
         },


         
         {
            icon: 'ri-bank-card-line',
            id: 'COMPTABILITE_DEPENSE',
            name: 'Transactions caisse',
            route: 'COMPTA_DEPENSE'
         },
         {
            icon: 'ri-safe-line',
            id: 'COMPTABILITE_COMPTE',
            name: 'Banques',
            route: 'COMPTA_COMPTE'
         },
         // {
         //    icon: 'ri-safe-line',
         //    id: 'COMPTABILITE_TRANSACTION_BANK',
         //    name: 'Transactions bancaire',
         //    route: 'COMPTA_TRANSACTION'
         // },
         {
            icon: 'ri-git-branch-line',
            id: 'COMPTABILITE_GRAND_LIVRE',
            name: 'Grand livre',
            route: 'COMPTA_LIVRE'
         },
         {
            icon: 'ri-funds-box-line',
            id: 'COMPTABILITE_DEVIS',
            name: 'Bilan',
            route: 'COMPTA_BILAN'
         },
      ],
   },
   {
      name: 'logistiques',
      icon: `https://${AppService().url}/images/icons/logistics.png`,
      list: 'Bon de commande, livraisons, Services & produits',
      route: '',
      children: [
         {
            icon: 'ri-home-smile-2-line',
            id: 'LOGISTIC_SERVICES_PRODUITS',
            name: 'Services & produits',
            route: 'LOGISC_PRODUCTS'
         },
         // {
         //    icon: 'ri-coupon-line',
         //    id: 'LOGISTIC_BON_COMMANDE_CLIENT',
         //    name: 'Bon de commande',
         //    route: 'LOGISC_BC_CLIENTS'
         // },
         {
            icon: 'ri-store-3-line',
            id: 'LOGISTIC_BON_COMMANDE_FOURNISSEUR',
            name: 'Bon de commande fournisseur',
            route: 'LOGISC_BC_PARTENAIRES'
         },
         {
            icon: 'ri-store-3-line',
            id: 'LOGISTIC_BON_COMMANDE',
            name: 'Livraisons',
            route: 'LOGISC_LIVRAISONS'
         },
        
      ],
   },
   {
      name: 'Système',
      icon: `https://${AppService().url}/images/icons/content-management-system.png`,
      list: 'Messagerie, Parametres, Mails, Notes, Gestions des Documments',
      route: '',
      children: [
         {
            icon: 'ri-chat-3-line',
            id: 'SYSTEM_MESSAGERIE',
            name: 'Messageries',
            route: 'SYSTEM_CHATS'
         },
         {
            icon: 'ri-settings-line',
            id: 'SYSTEM_PARAMETRES',
            name: 'Parametres',
            route: 'SYSTEM_PARAMETRE'
         },
         {
            icon: 'ri-mail-line',
            id: 'SYSTEM_MAILS',
            name: 'Mails',
            route: 'HOME'
         },
         {
            icon: 'ri-bill-line',
            id: 'SYSTEM_NOTE',
            name: 'Notes',
            route: 'HOME'
         },
         {
            icon: 'ri-article-line',
            id: 'SYSTEM_GESTION_DOC',
            name: 'Gestions de documents',
            route: 'HOME'
         },
      ],
   },
];

export const MenuPersonal = [
   {
      id: 'MENU_MAIL',
      name: 'Envoyer Mail',
      icon: 'ri-mail-star-line',
      route: 'HOME'
   },
   {
      id: 'MENU_MAIL',
      name: 'Note',
      icon: 'ri-booklet-line',
      route: 'HOME'
   },
   {
      id: 'MENU_MAIL',
      name: 'Rapport',
      icon: 'ri-folder-chart-line',
      route: 'HOME'
   },
];

export const MenuProfile = [
   {
      id: 'MENU_profile',
      name: 'Mon Profile',
      icon: 'ri-user-2-line',
      route: 'HOME'
   },
   {
      id: 'SYSTEM_PARAMETRES',
      name: 'Parametre',
      icon: 'ri-settings-line',
      route: 'SYSTEM_PARAMETRE'
   },
   {
      id: 'MENU_SIGNOUT',
      name: 'Se deconnecté',
      icon: 'ri-logout-box-line',
      route: 'HOME'
   },
];


