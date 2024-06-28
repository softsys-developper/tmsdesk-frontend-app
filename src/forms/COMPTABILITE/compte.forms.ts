import { reactive } from "vue";

export const CompteForms = reactive([
  {
    label: "Numéro du compte",
    type: "text",
    placeholder: "Numéro du compte",
    name: "numero_compte",
    value: "",
    select: [],
  },
    {
      label: "Libelle du compte",
      type: "text",
      placeholder: "Libelle du compte",
      name: "nom",
      value: "",
      select: [],
    },
  ])
  

export const CompteTransactionTables = [
  {
    label: "Libelle du compte",
    type: "text",
    placeholder: "Libelle du compte",
    name: "nom",
    value: "",
    select: [],
  },
];