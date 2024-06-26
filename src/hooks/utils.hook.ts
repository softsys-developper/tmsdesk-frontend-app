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


  const ServerError = (err:any, toast:any) => {
   if (err) {
      const isErr = Object.keys(err.response.data.errors);
      if (isErr) {
        toast({
          title: isErr[0],
          variant: "destructive",
          description: err.response.data.errors[isErr[0]][0],
        });
      } else {
        toast({
          title: "error",
          variant: "destructive",
          description: err.response.data.message,
        });
      }
    }
  }


   return {
      EmptyFields,
      remplacerObjetDansTableau,
      ServerError
   };
};
