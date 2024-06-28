export const CongeForms = [
  {
    label: "Liste des employés",
    type: "select",
    placeholder: "Liste des employés",
    name: "employe",
    value: "",
    select: [],
  },
  {
    label: "Remarque",
    type: "text",
    placeholder: "Entrez une remarque",
    name: "remarques",
    value: "",
    select: [],
  },
  {
    label: "Type",
    type: "select",
    placeholder: "Type",
    name: "type",
    value: "",
    select: [
      {
        id: "conge",
        label: "Congé",
      },
      {
        id: "permission",
        label: "Permission",
      },
    ],
  },
  {
    label: "Motif",
    type: "text",
    placeholder: "Motif",
    name: "motif",
    value: "",
    select: [],
  },
  {
    label: "Date de départ",
    type: "date",
    placeholder: "Date de départ",
    name: "date_depart",
    value: "",
    select: [],
  },
  {
    label: "Date de retour",
    type: "date",
    placeholder: "Date de retour",
    name: "date_retour",
    value: "",
    select: [],
  },
];
