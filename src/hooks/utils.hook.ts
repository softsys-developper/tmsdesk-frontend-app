export const useUtilHook = () => {

    // Fun : Pour vider les champs apres avoir valider
   const EmptyFields = (values:any) => {
      const DataKey = Object.keys(values);
      DataKey.forEach((el) => {
         const query: any = document.querySelector('#' + el);
         if (query) query.value = '';
      });
   };


   return {
      EmptyFields,
   };
};
