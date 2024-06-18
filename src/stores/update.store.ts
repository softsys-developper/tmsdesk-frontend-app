// stores/counter.js
import { defineStore } from 'pinia';

export const useUpdateStore = defineStore('Update', {
   state: () => ({
    updateValue: null,
    isUpdate: {
      is: false,
      id: null,
      data: <any>{}
    }  ,
    isDelete: {
      is: false,
      id: null
    }   
   }),
   actions: {
      UpdateValue(value: any, FunData: any) {
         FunData(value)
      }
   }
});
