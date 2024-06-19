export const ProspectForms = [
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
    type: "text",
    placeholder: "Proposition pour le prospect",
    name: "proposition",
    value: "",
    select: [
        {
            title: "Produit",
            id: "produit",
        },
        {
            title: "Service",
            id: "service",
        }
    ],
  },
  {
    label: "Étape",
    type: "text",
    placeholder: "Étape du prospect",
    name: "etape",
    value: "",
    select: [
        {
            label: "Prise de contact",
            id: "prise_contact",
        },
        {
            label: "Demande de RDV",
            id: "demande_rdv",
        },
        {
            label: "Attente de retour",
            id: "attente_retour",
        },
        {
            label: "Attente de bon de commande",
            id: "attente_bon_commande",
        },
    ],
  },
  {
    label: "Domaine d'activite",
    type: "text",
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
];
