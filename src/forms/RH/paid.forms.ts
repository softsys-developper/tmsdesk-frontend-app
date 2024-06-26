export const PaidForms = [
    {
        label: "Banques",
        type: "select",
        placeholder: "Banck Ci",
        name: "banque",
        value: "",
        select: [],
    },
    {
        label: "Désignation",
        type: "text",
        placeholder: "",
        name: "designation",
        value: "",
        select: [],
    },
    {
        label: "Employé",
        type: "select",
        placeholder: "Employé à payer",
        name: "employe",
        value: "",
        select: [],
    },
    {
        label: "Mode de paiement",
        type: "select",
        placeholder: "Mode de paiement",
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
        label: "Periode de depart",
        type: "date",
        placeholder: "Nom du role",
        name: "periode_1",
        value: "",
        select: [],
    },
    // {
    //     label: "Periode de fin",
    //     type: "date",
    //     placeholder: "Nom du role",
    //     name: "periode_2",
    //     value: "",
    //     select: [],
    // },
];
