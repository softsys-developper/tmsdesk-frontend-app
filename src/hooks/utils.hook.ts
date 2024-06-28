export const useUtilHook = () => {
  // Fun : Pour vider les champs apres avoir valider
  const EmptyFields = (values: any) => {
    const DataKey = Object.keys(values);

    //       // Utilisez la méthode keys() pour obtenir toutes les clés (noms des champs)
    // const keys = formData.keys();

    // // Convertissez les clés en un tableau pour les manipuler
    // const keysArray = Array.from(keys);

    DataKey.forEach((el) => {
      const query: any = document.querySelector("#" + el);
      if (query) query.value = "";
    });
  };

  function remplacerObjetDansTableau(
    tableau: any,
    proprieteRecherche: any,
    valeurRecherche: any,
    nouvelObjet: any
  ) {
    const index = tableau.findIndex(
      (obj: any) => obj[proprieteRecherche] === valeurRecherche
    );
    if (index !== -1) {
      tableau[index].select = nouvelObjet;
    }
  }

  const ServerError = (err: any, toast: any) => {
    if (err.response) {
      const isErr = Object.keys(err.response?.data.errors);
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
  };

  const StatusHtml = (name: string, bg: string, color?:any) => {
    return `<span style='background-color: ${color}' class="text-xs font-bold flex text-white  min-w-max max-w-min px-2 py-1 rounded-md text-center ${bg}" >${name}</span>`;
  };


  const ImageHtml = (url: string) => {
    return `<img src="${url}" class="text-xs font-bold flex text-white  min-w-max max-w-min px-2 py-1 rounded-md text-center" />`;
  };

  // Send Value to DataBase
  const ExtractValue = (Forms: Array<any>, FD?: Boolean) => {
    const GetValueForm = Forms.map((el: any) => ({
      [el.name]: el.value,
    }));
    const values: any = GetValueForm.reduce((acc, current) => {
      return { ...acc, ...current };
    }, {});

    if (FD) {
      const FData = new FormData();
      const Keys = Object.keys(values);

      for (let i = 0; i < Keys.length; i++) {
        const fd = Keys[i];
        FData.append(`${[fd]}`, `${values[fd]}`);
      }
    }

    return values;
  };

  return {
    EmptyFields,
    remplacerObjetDansTableau,
    ServerError,
    StatusHtml,
    ExtractValue,
    ImageHtml
  };
};
