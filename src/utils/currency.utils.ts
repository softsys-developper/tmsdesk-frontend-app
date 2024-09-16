export const Currency = (montant: any) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "GNF",
  }).format(montant);
};
