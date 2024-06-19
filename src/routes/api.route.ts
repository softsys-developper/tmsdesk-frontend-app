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
  USER_SHOW: `${BASE_URL}/employes/show`,
  USER_CREATE: `${BASE_URL}/employes/add`,
  USER_UPDATE: `${BASE_URL}/employes/update`,
  USER_REMOVE: `${BASE_URL}/employes/delete`,

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

  CLIENT_PROSPECT_LIST: `${BASE_URL}/client-prospects`,
  CLIENT_PROSPECT_CREATE: `${BASE_URL}/client-prospects/add`,
  CLIENT_PROSPECT_UPDATE: `${BASE_URL}/client-prospects/update`,
  CLIENT_PROSPECT_REMOVE: `${BASE_URL}/client-prospects/delete`,

  // Gestion utilisateur (employé)
  PARTNER_LIST: `${BASE_URL}/partenaires`,
  PARTNER_CREATE: `${BASE_URL}/partenaires/add`,
  PARTNER_UPDATE: `${BASE_URL}/partenaires/update`,
  PARTNER_REMOVE: `${BASE_URL}/partenaires/delete`,

  PROFORMA_LIST: `${BASE_URL}/proformas`,
  PROFORMA_CREATE: `${BASE_URL}/proformas/add`,
  PROFORMA_UPDATE: `${BASE_URL}/proformas/update`,
  PROFORMA_REMOVE: `${BASE_URL}/proformas/delete`,
  PROFORMA_DETAILS: `${BASE_URL}/proformas/details`,
  PROFORMA_VALIDATE: `${BASE_URL}/proformas/valider-proforma`,

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

  BC_LIST: `${BASE_URL}/bon-de-commande`,
  BC_CREATE: `${BASE_URL}/bon-de-commande/add`,
  BC_UPDATE: `${BASE_URL}/bon-de-commande/update`,
  BC_REMOVE: `${BASE_URL}/bon-de-commande/delete`,
  BC_DETAILS: `${BASE_URL}/bon-de-commande/details`,

  CAISSE_TRANSACTION_LIST: `${BASE_URL}/caisse/transactions`,
  CAISSE_TRANSACTION_CREATE: `${BASE_URL}/caisse/transaction/add`,
  CAISSE_TRANSACTION_UPDATE: `${BASE_URL}/caisse/transactions/update`,
  CAISSE_TRANSACTION_REMOVE: `${BASE_URL}/caisse/transactions/delete`,
  CAISSE_TRANSACTION_DETAILS: `${BASE_URL}/caisse/transactions/details`,

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

  LIVRE_LIST: `${BASE_URL}/grand-livre/banque`,
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

  CATEGORIE_LIST: `${BASE_URL}/categories`,
  CATEGORIE_CREATE: `${BASE_URL}/categories/add`,
  CATEGORIE_UPDATE: `${BASE_URL}/categories/update`,
  CATEGORIE_REMOVE: `${BASE_URL}/categories/delete`,

  FACTURE_LIST: `${BASE_URL}/facture-client`,
  FACTURE_CREATE: `${BASE_URL}/factures/add`,
  FACTURE_UPDATE: `${BASE_URL}/factures/update`,
  FACTURE_REMOVE: `${BASE_URL}/factures/delete`,

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
  PERMISSIONS_CREATE: `${BASE_URL}/permissions/add`,
  PERMISSIONS_UPDATE: `${BASE_URL}/permissions/update`,
  PERMISSIONS_REMOVE: `${BASE_URL}/permissions/delete`,
};
