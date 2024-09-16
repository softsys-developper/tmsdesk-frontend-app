// interface ProduitServicePivot {
//     proforma_id: number;
//     produit_service_id: number;
//     quantite: number;
//     prix_unitaire: string;
//     montant: string;
// }

// interface ProduitService {
//     id: number;
//     libelle: string;
//     type: string;
//     quantite: number;
//     prix_unitaire: string;
//     description: string | null;
//     image: string | null;
//     created_at: string;
//     updated_at: string;
//     pivot: ProduitServicePivot;
// }

interface Pivot {
  proforma_id: number;
  produit_service_id: number;
  quantite: number;
  prix_unitaire: string;
  montant: string;
}

interface Item {
  id: number;
  reference: string;
  type: string;
  unite: string;
  quantite: number;
  prix_unitaire: string;
  montant: string;
  description: string;
  disponibilite: string;
  remarques: string;
  image: string | null;
  proforma_id: number;
  produit_service_id: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
  marge_commerciale: string | null;
  devise_id: number | string;
}

interface User {
  id: number;
  matricule: string | null;
  cni: string | null;
  anciennete: string | null;
  name: string;
  nom: string | null;
  prenoms: string | null;
  email: string;
  telephone: string | null;
  email_verified_at: string | null;
  situation_matrimoniale: string | null;
  date_naissance: string | null;
  lieu_naissance: string | null;
  type_contrat: string | null;
  fonction: string | null;
  nom_personne_a_contacter: string | null;
  telephone_personne_a_contacter: string | null;
  utype: string;
  date_debut: string | null;
  date_fin: string | null;
  photo_employe: string | null;
  fichier_contrat: string | null;
  fiche_poste: string | null;
  sexe: string;
  numero_compte_bancaire: string | null;
  numero_cnps: string | null;
  salaire_id: string | null;
  created_at: string;
  updated_at: string;
}

interface Client {
  id: number;
  prospect_id: string;
  type: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  nom_interlocuteur: string | null;
  proposition: string;
  domaine_activite_id: string | null;
  etape: string;
  observation: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface Ligne {
  disponibilite: string;
}

interface interlocuteur {
  nom: string;
  prenoms: string;
}

export interface PROFORMA {
  id: number;
  numero_proforma: string;
  titre: string;
  etat: string;
  montant_ht: string;
  montant_ttc: string;
  montant_en_lettre: string | null;
  date_creation: string;
  TVA: string;
  remise_forfaitaire: string;
  date_validite: string;
  description: string | null;
  client_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  produit_services: Item[];
  ligne_proformas: Ligne[];
  user: User;
  client: Client;
  ref_client: string;
  marge_commerciale: string | null;
  interlocuteur: interlocuteur;
  interlocuteur_id: number | string;
  remise_pourcentage: number;
}
