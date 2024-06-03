// stores/counter.js
import { defineStore } from 'pinia';

export const useModalStore = defineStore('Modal', {
   state: () => ({
      open: false,
   }),
});
