export const useUtilHook = () => {

    // Fun : Pour vider les champs apres avoir valider
   const EmptyFields = (values:any) => {
      const DataKey = Object.keys(values);

//       // Utilisez la méthode keys() pour obtenir toutes les clés (noms des champs)
// const keys = formData.keys();

// // Convertissez les clés en un tableau pour les manipuler
// const keysArray = Array.from(keys);

      DataKey.forEach((el) => {
         const query: any = document.querySelector('#' + el);
         if (query) query.value = '';
      });
   };

   function remplacerObjetDansTableau(tableau: any, proprieteRecherche: any, valeurRecherche: any, nouvelObjet: any) {
      const index = tableau.findIndex((obj: any) => obj[proprieteRecherche] === valeurRecherche);
      if (index !== -1) {
          tableau[index].select = nouvelObjet;
      }
  }


   return {
      EmptyFields,
      remplacerObjetDansTableau
   };
};
