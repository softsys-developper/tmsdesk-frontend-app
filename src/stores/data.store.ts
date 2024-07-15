// stores/counter.js
import { defineStore } from 'pinia';
import { ref } from 'vue';




export const useDataStore = defineStore('counter',() => {

   const Clients = ref([]);
   const Prospects = ref([]);
   const Partners = ref([]);
   const Personals = ref([]);
   const Salary = ref([]);
   const Products = ref([]);
   const Fournisseurs = ref([]);
   const Conges = ref([]);
   const Paids = ref(<any>[]);
   const Proforma = ref(<any>[]);
   const BC = ref(<any>[]);
   const Caisses = ref({});
   const Depenses = ref([]);
   const Comptes = ref([]);
   const Bilans = ref([]);
   const Livres = ref([]);
   const Livraisons = ref(<any>[]);
   const Transactions = ref([]);
   const BCs = ref([]);
   const Heures = ref([]);
   const Primes = ref(<any>[]);
   const Services = ref([]);
   const Marques = ref([]);
   const Categories = ref([]);
   const Devises = ref([]);
   const Factures = ref([]);
   const Roles = ref([]);
   const Permissions = ref(<any>[]);
   const Users =  ref(<any>[]);
   const DAs =  ref(<any>[]);
   const Rapports = ref(<any>[]);
   const Echanges = ref(<any>[]);
   const Proformas = ref(<any>[]);
   const NBCs = ref(<any>[]);
   const Compte_transactions = ref(<any>[]);
   const BCFournisseurs  = ref(<any>[]);
   const FacturePaids = ref(<any>[]);
   const StepProspects = ref(<any>[]);
   const Stocks = ref(<any>[]);
   const Holiday = ref(<any>[]);
   const Interlocuteurs = ref(<any>[]);
   const BCFournisseurDetails = ref(<any>[]);
   const BCLivraisonDetails = ref(<any>[])


   const Update = ref({
   Clients : [],
   Prospects : [],
   Partners : [],
   Personals : [],
   Salary : [],
   Products : [],
   Fournisseurs : [],
   Conges : [],
   Paids : [],
   Proforma : [],
   BC : [],
   Caisses : [],
   Depenses : [],
   Comptes : [],
   Bilans : [],
   Livres : [],
   Livraisons : [],
   Transactions : [],
   BCs : [],
   Heures : [],
   Primes : [],
   Services : [],
   Marques : [],
   Categories : [],
   Devises : [],
   Factures : [],
   Roles : [],
   Permissions : [],
   Users : [],
   DAs  : [],
   Rapports : [],
   Echanges: [],
   Proformas : [],
   NBCs : [],
   Compte_transactions : [],
   BCFournisseurs : [],
   FacturePaids : [],
   StepProspects : [],
   Stocks : [],
   Holiday : [],
   Interlocuteurs: [],
   });
   
   // Vous pouvez maintenant retourner les valeurs comme suit
   return {
      Clients,
       Prospects,
       Partners,
       Personals,
       Salary,
       Products,
       Fournisseurs,
       Conges,
       Paids,
       Proforma,
       BC,
       Caisses,
       Depenses,
       Comptes,
       Bilans,
       Livres,
       Livraisons,
       Transactions,
       BCs,
       Heures,
       Primes,
       Services,
       Marques,
       Categories,
       Devises,
       Factures,
       Roles,
       Permissions,
       Users,
       DAs,
       Rapports,
       Echanges,
       Proformas,
       NBCs,
       Compte_transactions,
       BCFournisseurs,
       FacturePaids,
       StepProspects,
       Stocks,
       Holiday,
       Update,
       Interlocuteurs,
       BCFournisseurDetails,
       BCLivraisonDetails
   };
  
});
