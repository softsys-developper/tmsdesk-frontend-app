import { reactive } from 'vue';

export const useSideBar = () => {
   const stateSideBar = reactive({
      menu: [
         {
            name: 'Generale',
            route: 'HOME',
            ref: 'general',
            actived: true,
         },
         
         // {
         //    name: 'Headers',
         //    route: 'HEADERS',
         //    actived: false,
         // },
         // {
         //    name: 'Entreprise',
         //    route: 'PARTNER',
         //    ref: 'general',
         //    actived: false,
         // },
         // {
         //    name: 'Taux de cotisation',
         //    route: 'BANNERS',
         //    ref: 'general',
         //    actived: false,
         // },
         // {
         //    name: 'Grille salariale',
         //    route: 'ABOUTS',
         //    ref: 'general',
         //    actived: false,
         // },
         {
            name: 'Heures supplémentaires',
            route: 'CONTACTS',
            ref: 'general',
            actived: false,
         },
         // {
         //    name: 'Nomenclatures',
         //    route: 'PARTNER',
         //    ref: 'general',
         //    actived: false,
         // },
        
      
      ],
   });

   return {
      stateSideBar,
   };
};
