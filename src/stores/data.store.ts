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
   const Paid = ref([]);
   const Proforma = ref([]);
   const BC = ref([]);
   const Caisses = ref({});
   const Depenses = ref([]);
   const Comptes = ref([]);
   const Bilans = ref([]);
   const Livres = ref([]);
   const Livraisons = ref([]);
   const Transactions = ref([]);
   const BCs = ref([]);
   const Heures = ref([]);
   const Primes = ref([]);
   const Services = ref([]);
   const Marques = ref([]);
   const Categories = ref([]);
   const Devises = ref([]);
   const Factures = ref([]);
   const Roles = ref([]);
   
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
       Paid,
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
       Roles
   };
  
});
