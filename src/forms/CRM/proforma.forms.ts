export const ProformaBCForms = [
  {
    label: "Numéro BC",
    type: "text",
    placeholder: "Numéro BC",
    name: "numero_bon_de_commande",
    value: "",
    select: [],
  },
  {
    label: "Montant BC",
    type: "text",
    placeholder: "Momant BC",
    name: "montant",
    value: "",
    select: [],
  },
];

export const ProformaChangeStateForms = [
  // {
  //   label: "Numéro BC",
  //   type: "text",
  //   placeholder: "Numéro BC",
  //   name: "proformaId",
  //   value: "",
  //   select: [],
  // },
  {
    label: "Status proforma",
    type: "select",
    placeholder: "Momant BC",
    name: "etat",
    value: "",
    select: [
      {
        id: "1",
        name: "En cours",
      },
      {
        id: "4",
        name: "Perdu",
      },
    ],
  },
];
