export const FacturePaidForms =  [
    {
        label: "Numéro Facture",
        type: "select",
        placeholder: "Choisir le numéro de la facture",
        name: "factureId",
        value: "",
        select: [],
      },
      {
        label: "Montant à payer",
        type: "number",
        placeholder: "Choisir le numéro de la facture",
        name: "montant",
        value: "",
        select: [],
      },
      {
        label: "Type de versement",
        type: "text",
        placeholder: "Choisir le numéro de la facture",
        name: "mode_paiement",
        value: "",
        select: [{
            id: 'cash',
            name: 'Cash'
        },
        {
            id: 'virement',
            name: 'Virement'
        },
        {
            id: 'cheque',
            name: 'Cheque'
        }],
      },
      {
        label: "Banque",
        type: "select",
        placeholder: "Choisir la banque",
        name: "banque",
        value: "",
        select: [],
      },
      {
        label: "Désignation",
        type: "text",
        placeholder: "Choisir la banque",
        name: "designation",
        value: "",
        select: [],
      },
]