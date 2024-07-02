import { reactive } from "vue";

export const ProspectForms = reactive([
  {
    label: "Nom",
    type: "text",
    placeholder: "Nom du prospect",
    name: "nom",
    value: "",
    select: [],
  },
  {
    label: "Email",
    type: "email",
    placeholder: "Email du prospect",
    name: "email",
    value: "",
    select: [],
  },
  {
    label: "Téléphone",
    type: "tel",
    placeholder: "Téléphone du prospect",
    name: "telephone",
    value: "",
    select: [],
  },
  {
    label: "Adresse",
    type: "text",
    placeholder: "Adresse du prospect",
    name: "adresse",
    value: "",
    select: [],
  },
  // {
  //   label: "Nom de l'interlocuteur",
  //   type: "text",
  //   placeholder: "Nom de l'interlocuteur",
  //   name: "nom_interlocuteur",
  //   value: "",
  //   select: [],
  // },
  {
    label: "Proposition",
    type: "select",
    placeholder: "Proposition pour le prospect",
    name: "proposition",
    value: "",
    select: [
        {
            title: "Produit",
            id: "Produit",
        },
        {
            title: "Service",
            id: "Service",
        }
    ],
  },
  {
    label: "Choix de l'etape",
    type: "select",
    placeholder: "Etape",
    name: "etape",
    value: "",
    select: [],
  },

  {
    label: "Domaine d'activite",
    type: "select",
    placeholder: "Domaine d'activite",
    name: "domaine_activite_id",
    value: "",
    select: [
        
    ],
  },
  {
    label: "Observation",
    type: "text",
    placeholder: "Observation sur le prospect",
    name: "observation",
    value: "",
    select: [],
  },
]);



export const ProspectStepForms = reactive([
  {
    label: "Choix de l'etape",
    type: "select",
    placeholder: "Etape",
    name: "etape",
    value: "",
    select: [],
  },
]);

