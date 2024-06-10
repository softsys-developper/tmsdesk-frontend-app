export type FOURNISSEUR = {
  created_at: string; // Date et heure de création, format string
  description: string; // Description de l'objet, chaîne de caractères
  id: number; // Identifiant unique de l'objet, entier
  libelle: string; // Libellé ou nom de l'objet, chaîne de caractères
  prix_unitaire: string; // Prix unitaire de l'objet, format string
  quantite: number | null; // Quantité de l'objet, entier ou null
  type: string; // Type de l'objet, chaîne de caractères
  updated_at: string; // Date et heure de la dernière mise à jour, format string
};
