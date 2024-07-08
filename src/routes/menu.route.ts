import { AppService } from "@/services/app.services"

export const MenuApp = [
   {
      name: 'Tableau de bord',
      icon: `https://${AppService().url}/images/icons/dashboard.png`,
      list: '',
      route: 'HOME',
      children: [],
      
   },
   {
      name: 'CRM',
      icon: `https://${AppService().url}/images/icons/crm.png`,
      list: 'Prospects, Proforma, Clients, fournisseur',
      route: 'CRM_CLIENTS',
      children: [
         {
            icon: 'ri-user-search-line',
            id: 'CRM_PROSPECTS',
            name: 'Prospects',
            route: 'CRM_PROSPECTS',
            permission: 'liste-prospects'
         },
         {
            icon: 'ri-user-2-line',
            id: 'PROFORMA_PROSPECTS',
            name: 'Proformas',
            route: 'PROFORMA_LIST',
            permission: 'liste-proformas'
         },

          // Commerciale

          {
            icon: 'ri-user-search-line',
            id: 'CRM_COMMERCIAL_PROSPECTS',
            name: 'COM/Prospects',
            route: 'CRM_COMMERCIAL_PROSPECTS',
            permission: 'liste-prospects-commercial'
         },
         {
            icon: 'ri-user-2-line',
            id: 'PROFORMA_COMMERCIAL_LISTE',
            name: 'COM/Proformas',
            route: 'PROFORMA_COMMERCIAL_LISTE',
            permission: 'liste-proformas-commercial'
         },
        

         // End Commercial

         {
            icon: 'ri-user-star-line',
            id: 'CRM_CLIENTS',
            name: 'Clients',
            route: 'CRM_CLIENTS',
            permission: 'liste-clients'
         },
         {
            icon: 'ri-user-search-line',
            id: 'CRM_FOURNISSEURS',
            name: 'Fournisseurs',
            route: 'CRM_FOURNISSEURS',
            permission: 'liste-fournisseur'
         },


         
         {
            icon: 'ri-home-smile-2-line',
            id: 'LOGISTIC_SERVICES_PRODUITS',
            name: 'Produits',
            route: 'LOGISC_PRODUCTS',
            permission: 'liste-produits-services'
         },

        
         // {
         //    icon: 'ri-user-search-line',
         //    id: 'CRM_FOURNISSEURS',
         //    name: 'Fournisseurs',
         //    route: 'CRM_FOURNISSEURS'
         // },
         // {
         //    icon: 'ri-user-heart-line',
         //    id: 'CRM_RAPPORTS',
         //    name: 'Rapports',
         //    route: 'CRM_RAPPORTS'
         // },
      ],
   },
 
   {
      name: 'R. HUMAINES',
      icon: `https://${AppService().url}/images/icons/customer-service.png`,
      list: 'Employés, congés, salaires, heure sup et permissions, département ',
      route: 'RH_PERSONAL',
      children: [
         {
            icon: 'ri-user-2-line',
            id: 'HUMAINES_PERSONEL',
            name: 'Employés',
            route: 'RH_PERSONAL',
            permission: 'liste-employes'
         },
         {
            icon: 'ri-user-shared-2-line',
            id: 'HUMAINES_CONGES',
            name: 'Congés',
            route: 'RH_SALAIRE_CONGE',
            permission: 'liste-conge'
         },
         {
            icon: 'ri-currency-line',
            id: 'HUMAINES_SALAIRE',
            name: 'Salaires',
            route: 'RH_SALAIRE',
            permission: 'liste-salaires'
         },
         {
            icon: 'ri-cash-line',
            id: 'HUMAINES_PAID',
            name: 'Paiement de salaire',
            route: 'RH_SALAIRE_PAID',
            permission: 'liste-paiement-salaire'
         },
         // {
         //    icon: 'ri-calendar-schedule-line',
         //    id: 'HUMAINES_PAID',
         //    name: 'Heure supplémentaire ',
         //    route: 'RH_HEURE_SUPPLEMANTAIRE'
         // },
         {
            icon: 'ri-building-line',
            id: 'HUMAINES_DEPARTEMENT',
            name: 'Départements',
            route: 'RH_DEPARTEMENT',
            permission: 'liste-service'
         },
         {
            icon: 'ri-scan-line',
            id: 'HUMAINES_INDEMNITE_PRIME',
            name: 'Indemnité & Prime',
            route: 'RH_INDEMNITE_PRIME',
            permission: 'liste-indemnite-primes'
         },
         // {
         //    icon: 'ri-user-follow-line',
         //    id: 'HUMAINES_PERMISSIONS',
         //    name: 'Permissions',
         //    route: 'HOME'
         // },
      ],
   },
   // {
   //    name: 'Proforma',
   //    icon: `https://${AppService().url}/images/icons/receipt.png`,
   //    list: 'Prospects, clients, fourniseurs',
   //    route: '',
   //    children: [
   //       {
   //          icon: 'ri-user-2-line',
   //          id: 'PROFORMA_PROSPECTS',
   //          name: 'Liste des proformas',
   //          route: 'PROFORMA_LIST'
   //       },
   //       {
   //          icon: 'ri-user-2-line',
   //          id: 'PROFORMA_PROSPECTS_ADD',
   //          name: 'Ajouter des proformas',
   //          route: 'PROFORMA_ADD'
   //       },
   //       // {
   //       //    icon: 'ri-user-2-line',
   //       //    id: 'PROFORMA_CLIENTS',
   //       //    name: 'Clients',
   //       //    route: 'HOME'
   //       // },
   //       // {
   //       //    icon: 'ri-store-line',
   //       //    id: 'PROFORMA_FOURNISEURS',
   //       //    name: 'Fourniseurs',
   //       //    route: 'HOME'
   //       // },
   //    ],
   // },
   {
      name: 'Comptabilités',
      icon: `https://${AppService().url}/images/icons/budget.png`,
      list: 'Factures, Dépenses, caisse, banque, grand livre, bilan',
      route: '',
      children: [
         {
            icon: 'ri-file-list-3-line',
            id: 'COMPTABILITE_PROFORMA',
            name: 'Factures',
            route: 'COMPTA_FACTURE',
            permission: 'liste-facture-client'
         },
         {
            icon: 'ri-bank-card-line',
            id: 'COMPTABILITE_DEPENSE',
            name: 'Transaction Caisse',
            route: 'COMPTA_DEPENSE',
            permission: 'liste-transaction-caisse'
         },
         {
            icon: 'ri-safe-line',
            id: 'COMPTABILITE_COMPTE',
            name: 'Banques',
            route: 'COMPTA_COMPTE',
            permission: 'liste-banque'
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
            route: 'COMPTA_LIVRE',
            permission: 'grand-livre-banque'
         },
         {
            icon: 'ri-funds-box-line',
            id: 'COMPTABILITE_DEVIS',
            name: 'Bilan',
            route: 'COMPTA_BILAN',
            permission: 'bilan'
         },
      ],
   },
   {
      name: 'logistiques',
      icon: `https://${AppService().url}/images/icons/logistics.png`,
      list: 'Bon de commande, livraisons, Services & produits',
      route: 'LOGISC_PRODUCTS',
      children: [
         // {
         //    icon: 'ri-home-smile-2-line',
         //    id: 'LOGISTIC_SERVICES_PRODUITS',
         //    name: 'Services & produits',
         //    route: 'LOGISC_PRODUCTS'
         // },
         // {
         //    icon: 'ri-coupon-line',
         //    id: 'LOGISTIC_BON_COMMANDE_CLIENT',
         //    name: 'Bon de commande',
         //    route: 'LOGISC_BC_CLIENTS'
         // },
         {
            icon: 'ri-store-3-line',
            id: 'LOGISTIC_BON_COMMANDE_FOURNISSEUR',
            name: 'BC fournisseur',
            route: 'LOGISC_BC_PARTENAIRES',
            permission: 'liste-bdc-fournisseur'
         },
         {
            icon: 'ri-store-3-line',
            id: 'LOGISTIC_BON_COMMANDE',
            name: 'Livraisons',
            route: 'LOGISC_LIVRAISONS',
            permission: 'liste-livraison'
         },
         {
            icon: 'ri-store-3-line',
            id: 'LOGISC_STOCK',
            name: 'Stocks',
            route: 'LOGISC_STOCK',
            permission: 'liste-stock'
         },
        
      ],
   },
   {
      name: 'Parametres',
      icon: `https://${AppService().url}/images/icons/parametre.png`,
      list: 'Parametre géneral, utilisateurs, roles, permissions',
      route: '',
      children: [
         {
            icon: 'ri-mail-line',
            id: 'SYSTEM_MAILS',
            name: 'Parametre',
            route: 'SYSTEM_PARAMETRE',
            permission: 'liste-parametres'
         },
         {
            icon: 'ri-mail-line',
            id: 'SYSTEM_MAILS',
            name: 'Utilisateurs',
            route: 'SETTING_USER',
            permission: 'liste-utilisateur'
         },
         {
            icon: 'ri-mail-line',
            id: 'SETTING_ROLES',
            name: 'Roles',
            route: 'SETTING_ROLES',
            permission: 'liste-role'
         },
         {
            icon: 'ri-bill-line',
            id: 'SETTING_PERMISSION',
            name: 'Permissions',
            route: 'SETTING_PERMISSION',
            permission: 'liste-permission'
         },
      ],
   },
   // {
   //    name: 'Systèmes',
   //    icon: `https://${AppService().url}/images/icons/content-management-system.png`,
   //    list: "Domaine d'activités, categories, devises, marques",
   //    route: '',
   //    children: [
   //       {
   //          icon: 'ri-bill-line',
   //          id: 'SYSTEM_DA',
   //          name: 'Domaine d\'activité',
   //          route: 'SYSTEM_DA',
   //          permission: 'liste-domaine-activite'
   //       },
   //       // {
   //       //    icon: 'ri-bill-line',
   //       //    id: 'SYSTEM_NOTE',
   //       //    name: 'Gestion des documents',
   //       //    route: 'SYSTEM_MARQUE'
   //       // },
   //       {
   //          icon: 'ri-bill-line',
   //          id: 'SYSTEM_CATEGORY',
   //          name: 'Categories',
   //          route: 'SYSTEM_CATEGORY',
   //          permission: 'liste-categorie'
   //       },
   //       // {
   //       //    icon: 'ri-bill-line',
   //       //    id: 'SYSTEM_DEVISE',
   //       //    name: 'Domaine d\'activités',
   //       //    route: 'SYSTEM_DEVISE'
   //       // },
   //       {
   //          icon: 'ri-bill-line',
   //          id: 'SYSTEM_DEVISE',
   //          name: 'Devises',
   //          route: 'SYSTEM_DEVISE',
   //          permission: 'liste-devies'
   //       },
   //       {
   //          icon: 'ri-bill-line',
   //          id: 'SYSTEM_MARQUE',
   //          name: 'Marques',
   //          route: 'SYSTEM_MARQUE',
   //          permission: 'liste-marques'
   //       },
   //       {
   //          icon: 'ri-bill-line',
   //          id: 'SYSTEM_STEP_PROSPECT',
   //          name: 'Etapes Prospect',
   //          route: 'SYSTEM_STEP_PROSPECT',
   //          permission: 'liste-etapes'
   //       },
   //       // {
   //       //    icon: 'ri-bill-line',
   //       //    id: 'SYSTEM_HOLIDAY',
   //       //    name: 'Jour férier',
   //       //    route: 'SYSTEM_HOLIDAY'
   //       // },
   //    ],
   // },
   // {
   //    name: 'Mesageries',
   //    icon: `https://${AppService().url}/images/icons/messagerie.png`,
   //    list: 'Discutez avec les membres de votre équiqe.',
   //    route: 'SYSTEM_CHATS',
   //    children: [
        
   //    ],
   // },
   {
      name: 'Supports',
      icon: `https://${AppService().url}/images/icons/support.png`,
      list: 'Conctez softsys en cas de disfonctionnement de votre logicel',
      route: '',
      children: [
      ],
   }
];

export const MenuPersonal = [
   // {
   //    id: 'MENU_MAIL',
   //    name: 'Envoyer Mail',
   //    icon: 'ri-mail-star-fill',
   //    route: 'HOME'
   // },
   {
      id: 'MENU_MAIL',
      name: 'Rapport',
      icon: 'ri-folder-chart-fill',
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
      route: 'MENU_SIGNOUT'
   },
];


