import { reactive } from "vue";

export const StepProspectForms = reactive([
  {
    label: "Nom de l'étape",
    type: "text",
    placeholder: "Nom du role",
    name: "nom",
    value: "",
    select: [],
  },
  {
    label: "Couleur de l'étape",
    type: "color",
    placeholder: "Nom du role",
    name: "couleur",
    value: "",
    select: [],
  },
])
  