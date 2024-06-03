// stores/counter.js
import { defineStore } from 'pinia';

type CAISSES  = {
   solde: any;
}


export const useDataStore = defineStore('counter', {
   state: () => ({
      Clients: [],
      Prospects: [],
      Partners: [],
      Personals: [],
      Salary: [],
      Products: [],
      Fournisseurs: [],
      Conges: [],
      Paid: [],
      Proforma: [],
      BC:[],
      Caisses: <CAISSES>{},
      Depenses: [],
      Comptes: [],
      Bilans: [],
      Livres: [],
      Livraisons: [],
      Transactions: [],
      BCs: []
   }),
});
