import { reactive } from "vue";

export const StagiaireForms = reactive([
    {
        label: "Photos",
        type: "file",
        placeholder: "Ajoutez une photo",
        name: "photo",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },
  
    {
        label: "Nom",
        type: "text",
        placeholder: "John Binaté",
        name: "nom",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },
    {
        label: "Prénoms",
        type: "text",
        placeholder: "Prénoms",
        name: "prenoms",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },
    {
        label: "Email",
        type: "text",
        placeholder: "Email",
        name: "email",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },
    {
        label: "Sexe",
        type: "select",
        placeholder: "Homme & Femme",
        name: "sexe",
        value: "",
        select: [
            {
                id: 'M', name: 'Homme',
            }, {
                id: 'F', name: 'Femme'
            }
        ], // Tableau vide pour les options de sélection
    },
    {
        label: "Téléphone",
        type: "text",
        placeholder: "Téléphone",
        name: "telephone",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },
    {
        label: "Fonction",
        type: "text",
        placeholder: "Fonction",
        name: "fonction",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },

    {
        label: "Date de naissance",
        type: "date",
        placeholder: "Date de naissance",
        name: "date_naissance",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },
    {
        label: "Lieu de naissance",
        type: "text",
        placeholder: "Lieu de naissance",
        name: "lieu_naissance",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },
    
    {
        label: "Situation matrimoniale",
        type: "select",
        placeholder: "Situation matrimoniale",
        name: "situation_matrimoniale",
        value: "",
        select: [
            { id: 'Célibataire', name: 'Célibataire' },
            { id: 'Marié(e)', name: 'Marié(e)' },
            { id: 'Veuf/Veuve', name: 'Veuf/Veuve' },
            { id: 'Divorcé(e)', name: 'Divorcé(e)' }
        ]
    },
    {
        label: "Numéro CNI / PASSPORT",
        type: "text",
        placeholder: "Numéro CNI",
        name: "cni",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },
   


    {
        label: "Personne à contacter",
        type: "text",
        placeholder: "Nom personne à contacter",
        name: "nom_personne_a_contacter",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },

    {
        label: "Téléphone personne à contacter",
        type: "text",
        placeholder: "Téléphone personne à contacter",
        name: "telephone_personne_a_contacter",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },
    // {
    //     label: "Type d'utilisateur ",
    //     type: "text",
    //     placeholder: "Type d'utilisateur",
    //     name: "role",
    //     value: "",
    //     select: [], // Tableau vide pour les options de sélection
    // },
    {
        label: "Type de contrat",
        type: "select",
        placeholder: "Type de contrat",
        name: "type_contrat",
        value: "",
        select: [
            { id: 'école', name: 'Ecole' },
            { id: 'perfectionnement', name: 'Perfectionnement' }
        ], // Tableau vide pour les options de sélection
    },
    {
        label: "Contrat (PDF) ",
        type: "file",
        placeholder: "contrat",
        name: "contrat",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },


    {
        label: "Date de début",
        type: "date",
        placeholder: "Date de début",
        name: "date_debut",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },
    {
        label: "Date de fin",
        type: "date",
        placeholder: "Date de fin",
        name: "date_fin",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    },
    {
        label: "Service",
        type: "select",
        placeholder: "Liste de services",
        name: "service",
        value: "",
        select: [], // Tableau vide pour les options de sélection
    }
]
)

