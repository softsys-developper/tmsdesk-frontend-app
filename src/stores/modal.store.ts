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
      IsValidate: null
   }),
});
