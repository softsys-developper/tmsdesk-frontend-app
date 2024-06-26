export const DepenseForms = [
  {
    label: "Montant",
    type: "text",
    placeholder: "Ex: 50.000",
    name: "montant",
    value: "",
    select: [],
  },
  {
    label: "Désignation",
    type: "text",
    placeholder: "Dépense de la semaine",
    name: "designation",
    value: "",
    select: [],
  },
  {
    label: "Recepteur",
    type: "text",
    placeholder: "Recepteur",
    name: "recepteur",
    value: "",
    select: [],
  },
  {
    label: "Type de Transaction",
    type: "text",
    placeholder: "Entrée/Sortie",
    name: "type_transaction",
    value: "",
    select: [
      {
        id: "entree",
        name: "Entrée",
      },
      {
        id: "sortie",
        name: "Sortie",
      },
    ],
  },
];
