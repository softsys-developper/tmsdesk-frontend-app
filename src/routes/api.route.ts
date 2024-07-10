import { AppService } from "@/services/app.services";

const MODE_APP: string = "dev";
export const DEFINED_APP = (dev: any, prod: any) => {
  return MODE_APP == "dev" ? dev : prod;
};

export const BASE_URL = DEFINED_APP(
  AppService().api,
  "https://apps.tmsdesk.com/api"
);

export const API_URL = {
  // Auth
  AUTH_SIGNIN: `${BASE_URL}/login`,
  AUTH_SIGNUP: `${BASE_URL}/register`,
  AUTH_SIGNOUT: `${BASE_URL}/logout`,
  AUTH_SEND_MAIL: `${BASE_URL}/password/email`,
  AUTH_GHANGE_PASSWORD: `${BASE_URL}/password/reset`,

  // Gestion utilisateur (entreprise)
  PROFILE_SHOW: `${BASE_URL}/login`,
  PROFILE_UPDATE: `${BASE_URL}/login`,

  // Gestion utilisateur (employé)
  USER_LIST: `${BASE_URL}/employes`,
  USER_SHOW: `${BASE_URL}/employes`,
  USER_CREATE: `${BASE_URL}/employes/add`,
  USER_UPDATE: `${BASE_URL}/employes/update`,
  USER_REMOVE: `${BASE_URL}/employes/delete`,

  // Gestion utilisateur (employé)
  USER_SYSTEM_LIST: `${BASE_URL}/users`,
  USER_SYSTEM_SHOW: `${BASE_URL}/users/show`,
  USER_SYSTEM_CREATE: `${BASE_URL}/users/add`,
  USER_SYSTEM_UPDATE: `${BASE_URL}/users/update`,
  USER_SYSTEM_REMOVE: `${BASE_URL}/users/delete`,

  // Gestion utilisateur (employé)
  CLIENT_LIST: `${BASE_URL}/clients/all`,
  CLIENT_CREATE: `${BASE_URL}/clients/add`,
  CLIENT_UPDATE: `${BASE_URL}/clients/update`,
  CLIENT_REMOVE: `${BASE_URL}/clients/delete`,

  // Gestion utilisateur (employé)
  PROSPECT_LIST: `${BASE_URL}/prospects/all`,
  PROSPECT_CREATE: `${BASE_URL}/prospects/add`,
  PROSPECT_UPDATE: `${BASE_URL}/prospects/update`,
  PROSPECT_REMOVE: `${BASE_URL}/prospects/delete`,
  PROSPECT_COMMERCIAL_LIST: `${BASE_URL}/mes-prospects`,
  PROSPECT_COMMERCIAL_BY_USER_LIST: `${BASE_URL}/prospects/by-user/`,

  

  CLIENT_PROSPECT_LIST: `${BASE_URL}/client-prospects`,
  CLIENT_PROSPECT_CREATE: `${BASE_URL}/client-prospects/add`,
  CLIENT_PROSPECT_UPDATE: `${BASE_URL}/client-prospects/update`,
  CLIENT_PROSPECT_REMOVE: `${BASE_URL}/client-prospects/delete`,

  COMMERCIAL_LIST: `${BASE_URL}/commerciaux`,

  // Gestion utilisateur (employé)
  PARTNER_LIST: `${BASE_URL}/partenaires`,
  PARTNER_CREATE: `${BASE_URL}/partenaires/add`,
  PARTNER_UPDATE: `${BASE_URL}/partenaires/update`,
  PARTNER_REMOVE: `${BASE_URL}/partenaires/delete`,

  PROFORMA_LIST: `${BASE_URL}/proformas`,
  PROFORMA_CREATE: `${BASE_URL}/proformas/add`,
  PROFORMA_UPDATE: `${BASE_URL}/proformas/update`,
  PROFORMA_REMOVE: `${BASE_URL}/proformas/delete`,
  PROFORMA_DETAILS: `${BASE_URL}/proformas`,
  PROFORMA_VALIDATE: `${BASE_URL}/proformas/valider-proforma`,
  PROFORMA_REJETE: `${BASE_URL}/proformas/rejeter-proforma`,
  PROFORMA_COMMERCIAL_LIST: `${BASE_URL}/mes-proformas`,
  PROFORMA_CHANGE_STATE: `${BASE_URL}/proformas/changer-etat`,
  PROFORMA_COMMERCIAL_BY_USER_LIST: `${BASE_URL}/proformas/by-user/`,

  // Gestion roles
  ROLE_LIST: `${BASE_URL}/roles`,
  ROLE_CREATE: `${BASE_URL}/roles/add`,
  ROLE_UPDATE: `${BASE_URL}/roles/update`,
  ROLE_REMOVE: `${BASE_URL}/roles/delete`,

  // Gestion salaires
  SALAIRE_LIST: `${BASE_URL}/salaires`,
  SALAIRE_CREATE: `${BASE_URL}/salaires/add`,
  SALAIRE_UPDATE: `${BASE_URL}/salaires/update`,
  SALAIRE_REMOVE: `${BASE_URL}/salaires/delete`,

  SALAIRE_PAYMENT_LIST: `${BASE_URL}/paiement-salaires`,
  SALAIRE_PAYMENT_CREATE: `${BASE_URL}/paiement-salaires/add`,
  SALAIRE_PAYMENT_UPDATE: `${BASE_URL}/paiement-salaires/update`,
  SALAIRE_PAYMENT_REMOVE: `${BASE_URL}/paiement-salaires/delete`,

  CONGE_LIST: `${BASE_URL}/conges`,
  CONGE_CREATE: `${BASE_URL}/conges/add`,
  CONGE_UPDATE: `${BASE_URL}/conges/update`,
  CONGE_REMOVE: `${BASE_URL}/conges/delete`,

  // Gestion produits & services
  PRODUCT_LIST: `${BASE_URL}/produits`,
  PRODUCT_CREATE: `${BASE_URL}/produits/add`,
  PRODUCT_UPDATE: `${BASE_URL}/produits/update`,
  PRODUCT_REMOVE: `${BASE_URL}/produits/delete`,

  PRODUCT_PROFORMA_LIST: `${BASE_URL}/proformas/produit-services/`,

  BC_LIST: `${BASE_URL}/bon-de-commandes`,
  BC_CREATE: `${BASE_URL}/bon-de-commandes/add`,
  BC_UPDATE: `${BASE_URL}/bon-de-commandes/update`,
  BC_REMOVE: `${BASE_URL}/bon-de-commandes/delete`,
  BC_DETAILS: `${BASE_URL}/bon-de-commandes/details`,

  NBC_LIST: `${BASE_URL}/bon-de-commandes`,
  NBC_CREATE: `${BASE_URL}/bon-de-commandes/add`,
  NBC_UPDATE: `${BASE_URL}/bon-de-commandes/update`,
  NBC_REMOVE: `${BASE_URL}/bon-de-commandes/delete`,
  NBC_DETAILS: `${BASE_URL}/bon-de-commandes/details`,

  INTERLOCUTEUR_LIST: `${BASE_URL}/interlocuteurs`,
  INTERLOCUTEUR_CLIENT_LIST: `${BASE_URL}/interlocuteurs/prospect/`,
  INTERLOCUTEUR_FOURNISSUER_LIST: `${BASE_URL}/interlocuteurs/fournisseur/`,
  INTERLOCUTEUR_CLIENT_CREATE: `${BASE_URL}/interlocuteurs/client/add`,
  INTERLOCUTEUR_FOURNISSUER_CREATE: `${BASE_URL}/interlocuteurs/fournisseur/add`,
  INTERLOCUTEUR_UPDATE: `${BASE_URL}/interlocuteurs/update`,
  INTERLOCUTEUR_REMOVE: `${BASE_URL}/interlocuteurs/delete`,
  INTERLOCUTEUR_DETAILS: `${BASE_URL}/interlocuteurs/edit`,

  BC_FOURNISSEUR_LIST: `${BASE_URL}/fournisseurs/bdc`,
  BC_FOURNISSEUR_CREATE: `${BASE_URL}/fournisseurs/bdc/add`,
  BC_FOURNISSEUR_UPDATE: `${BASE_URL}/fournisseurs/bdc/update`,
  BC_FOURNISSEUR_REMOVE: `${BASE_URL}/fournisseurs/bdc/delete`,
  BC_FOURNISSEUR_DETAILS: `${BASE_URL}/fournisseurs/bdc/edit`,

  CAISSE_TRANSACTION_LIST: `${BASE_URL}/caisse/transactions`,
  CAISSE_TRANSACTION_CREATE: `${BASE_URL}/caisse/transaction/add`,
  CAISSE_TRANSACTION_UPDATE: `${BASE_URL}/caisse/transaction/update`,
  CAISSE_TRANSACTION_REMOVE: `${BASE_URL}/caisse/transaction/delete`,
  CAISSE_TRANSACTION_DETAILS: `${BASE_URL}/caisse/transaction/details`,

  CAISSE_LIST: `${BASE_URL}/caisse`,
  CAISSE_CREATE: `${BASE_URL}/caisse/add`,
  CAISSE_UPDATE: `${BASE_URL}/caisse/update`,
  CAISSE_REMOVE: `${BASE_URL}/caisse/delete`,
  CAISSE_DETAILS: `${BASE_URL}/caisse/details`,

  BANQUE_LIST: `${BASE_URL}/banques`,
  BANQUE_CREATE: `${BASE_URL}/banque/add`,
  BANQUE_UPDATE: `${BASE_URL}/banque/update`,
  BANQUE_REMOVE: `${BASE_URL}/banque/delete`,
  BANQUE_DETAILS: `${BASE_URL}/banque/details`,

  BANQUE_TRANSACTION_LIST: `${BASE_URL}/transactions-bancaires`,
  BANQUE_TRANSACTION_CREATE: `${BASE_URL}/banque/transactions/add`,
  BANQUE_TRANSACTION_UPDATE: `${BASE_URL}/banque/transactions/update`,
  BANQUE_TRANSACTION_REMOVE: `${BASE_URL}/banque/transactions/delete`,
  BANQUE_TRANSACTION_DETAILS: `${BASE_URL}/banque/transactions/details`,

  LIVRE_LIST: `${BASE_URL}/grand-livre/all-banques`,
  LIVRE_CREATE: `${BASE_URL}/grand-livre/banque/add`,
  LIVRE_UPDATE: `${BASE_URL}/grand-livre/banque/update`,
  LIVRE_REMOVE: `${BASE_URL}/grand-livre/banque/delete`,
  LIVRE_DETAILS: `${BASE_URL}/grand-livre/banque/details`,

  BILAN_LIST: `${BASE_URL}/bilan`,
  BILAN_CREATE: `${BASE_URL}/bilans/add`,
  BILAN_UPDATE: `${BASE_URL}/bilans/update`,
  BILAN_REMOVE: `${BASE_URL}/bilans/delete`,
  BILAN_DETAILS: `${BASE_URL}/bilans`,

  SETTING_LIST: `${BASE_URL}/parametres`,
  SETTING_UPDATE: `${BASE_URL}/parametres/update`,

  HEURE_LIST: `${BASE_URL}/heure-supplementaires`,
  HEURE_CREATE: `${BASE_URL}/heure-supplementaires/add`,
  HEURE_UPDATE: `${BASE_URL}/heure-supplementaires/update`,
  HEURE_REMOVE: `${BASE_URL}/heure-supplementaires/delete`,
  HEURE_DETAILS: `${BASE_URL}/heure-supplementaires`,

  PRIME_LIST: `${BASE_URL}/indemnite-primes`,
  PRIME_CREATE: `${BASE_URL}/indemnite-primes/add`,
  PRIME_UPDATE: `${BASE_URL}/indemnite-primes/update`,
  PRIME_REMOVE: `${BASE_URL}/indemnite-primes/delete`,
  PRIME_DETAILS: `${BASE_URL}/indemnite-primes`,

  SERVICE_LIST: `${BASE_URL}/services`,
  SERVICE_CREATE: `${BASE_URL}/services/add`,
  SERVICE_UPDATE: `${BASE_URL}/services/update`,
  SERVICE_REMOVE: `${BASE_URL}/services/delete`,
  SERVICE_DETAILS: `${BASE_URL}/services`,

  MARQUE_LIST: `${BASE_URL}/marques`,
  MARQUE_CREATE: `${BASE_URL}/marques/add`,
  MARQUE_UPDATE: `${BASE_URL}/marques/update`,
  MARQUE_REMOVE: `${BASE_URL}/marques/delete`,
  MARQUE_DETAILS: `${BASE_URL}/marques`,

  DEVISE_LIST: `${BASE_URL}/devises`,
  DEVISE_CREATE: `${BASE_URL}/devises/add`,
  DEVISE_UPDATE: `${BASE_URL}/devises/update`,
  DEVISE_REMOVE: `${BASE_URL}/devises/delete`,

  LIVRAISON_LIST: `${BASE_URL}/livraisons`,
  LIVRAISON_CREATE: `${BASE_URL}/livraisons/add`,
  LIVRAISON_UPDATE: `${BASE_URL}/livraisons/update`,
  LIVRAISON_DETAIL: `${BASE_URL}/livraisons/`,
  LIVRAISON_REMOVE: `${BASE_URL}/livraisons/delete`,

  CATEGORIE_LIST: `${BASE_URL}/categories`,
  CATEGORIE_CREATE: `${BASE_URL}/categories/add`,
  CATEGORIE_UPDATE: `${BASE_URL}/categories/update`,
  CATEGORIE_REMOVE: `${BASE_URL}/categories/delete`,

  FACTURE_LIST: `${BASE_URL}/facture/client`,
  FACTURE_DETAIL: `${BASE_URL}/facture/client/detail`,
  FACTURE_CREATE: `${BASE_URL}/facture/client/add`,
  FACTURE_UPDATE: `${BASE_URL}/facture/client/update`,
  FACTURE_REMOVE: `${BASE_URL}/facture/client/delete`,

  FACTURE_PAID_LIST: `${BASE_URL}/paiement/facture/client`,
  FACTURE_PAID_DETAIL: `${BASE_URL}/paiement/facture/client/`,
  FACTURE_PAID_CREATE: `${BASE_URL}/paiement/facture/client/add`,
  FACTURE_PAID_UPDATE: `${BASE_URL}/paiement/facture/client/update`,
  FACTURE_PAID_REMOVE: `${BASE_URL}/paiement/facture/client/delete`,

  // Gestion fournisseurs
  FOURNISSEURS_LIST: `${BASE_URL}/fournisseurs`,
  FOURNISSEURS_CREATE: `${BASE_URL}/fournisseurs/add`,
  FOURNISSEURS_UPDATE: `${BASE_URL}/fournisseurs/update`,
  FOURNISSEURS_REMOVE: `${BASE_URL}/fournisseurs/delete`,

  // Domaine d'activite
  DA_LIST: `${BASE_URL}/domaine-activites`,
  DA_CREATE: `${BASE_URL}/domaine-activites/add`,
  DA_UPDATE: `${BASE_URL}/domaine-activites/update`,
  DA_REMOVE: `${BASE_URL}/domaine-activites/delete`,

  // Rapports
  // RAPPORT_LIST: `${BASE_URL}/prospects/rapports/commercial`,
  RAPPORT_LIST: `${BASE_URL}/prospects/rapports/`,
  RAPPORT_ECHANGE_LIST: `${BASE_URL}/prospects/rapports/`,
  RAPPORT_CREATE: `${BASE_URL}/prospects/rapports-select/add`,
  RAPPORT_UPDATE: `${BASE_URL}/prospects/rapports/update`,
  RAPPORT_REMOVE: `${BASE_URL}/rapport/delete`,

  // Gestion Permissions
  PERMISSIONS_LIST: `${BASE_URL}/permissions`,
  PERMISSIONS_CREATE: `${BASE_URL}/permissions/user/add`,
  PERMISSIONS_UPDATE: `${BASE_URL}/permissions/update`,
  PERMISSIONS_REMOVE: `${BASE_URL}/permissions/delete`,
  PERMISSIONS_ROLE: `${BASE_URL}/permissions/role/`,
  PERMISSIONS_ROLE_CREATE: `${BASE_URL}/roles/permissions/add`,
  PERMISSIONS_USER_CONNECTER: `${BASE_URL}/permissions/user-connecte`,
  PERMISSIONS_USER: `${BASE_URL}/permissions/user/`,

  //Etape
  STEP_LIST: `${BASE_URL}/etapes`,
  STEP_CREATE: `${BASE_URL}/etapes/add`,
  STEP_UPDATE: `${BASE_URL}/etapes/update`,
  STEP_REMOVE: `${BASE_URL}/etapes/delete`,

  //Jours Ferier
  HOLIDAY_LIST: `${BASE_URL}/jours-feriers`,
  HOLIDAY_CREATE: `${BASE_URL}/jours-feriers/add`,
  HOLIDAY_UPDATE: `${BASE_URL}/jours-feriers/update`,
  HOLIDAY_REMOVE: `${BASE_URL}/jours-feriers/delete`,

  //Stocks
  STOCK_LIST: `${BASE_URL}/produits/in-stock`,
  STOCK_CREATE: `${BASE_URL}/produits/in-stock/add`,
  STOCK_UPDATE: `${BASE_URL}/produits/in-stock/update`,
  STOCK_REMOVE: `${BASE_URL}/produits/in-stock/delete`,
  STOCK_REMOVE_STOCK: `${BASE_URL}/produits/out-stock/`,

  //Etape
  PROSPECT_STEP_CHANGE: `${BASE_URL}/prospects/change/etape`,
};
