// stores/counter.js
import { defineStore } from 'pinia';

export const useModalStore = defineStore('Modal', {
   state: () => ({
      open: false,
      delete: false,
      isOpenSetting: 'Generale' ,
      isOpenMenu: '',
      isOpenSubMenu: '',
      isMenu: false,
      IsValidate: null,
      Password: {
         email: null,
         token: null
      },



      ProspectStep: false,
      ProspectStepID: null,

      Stocks: false,
      StocksID: null,


      MenuSideBar: <any>[],
      Permissions: <any>[]
   }),
});
