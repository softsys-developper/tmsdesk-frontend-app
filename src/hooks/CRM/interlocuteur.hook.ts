import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Interlocuteur.type';
import moment from "moment";
import { setService } from "@/services/set.services";

export const useInterlocuteurHook = () => {
  const { readData, showData } = useApiServices();
  const setInterlocuteur = reactive({ loading: false, loadingCreate: false });
  const stateInterlocuteurs = ref<any[]>([]);
  stateInterlocuteurs.value = useDataStore().Interlocuteurs;

  const formatInterlocuteurData = (Interlocuteurs: any) => {
    return Interlocuteurs.map((Interlocuteur: any) => ({
      id: Interlocuteur.id,
      nom: Interlocuteur.nom,
      prenoms: Interlocuteur.prenoms,
      email: Interlocuteur.email,
      telephone: Interlocuteur.telephone,
      poste: Interlocuteur.poste,
      date_creation: moment(Interlocuteur.created_at).format("DD/MM/YYYY"),

      nom_interlocuteur: Interlocuteur.client?.nom ?? Interlocuteur.fournisseur?.nom
    }));
  };

  const storeInterlocuteurs = computed(() => {
    return useDataStore().Interlocuteurs;
  });

  //
  const FindInterlocuteurAll = () => {
    setInterlocuteur.loading = true;
    readData(API_URL.INTERLOCUTEUR_LIST)
      .then((data: any) => {
        useDataStore().Interlocuteurs = formatInterlocuteurData(data.datas);
        setInterlocuteur.loading = false;
      })
      .catch(() => {
        setInterlocuteur.loading = false;
      });
  };

  //
  const FindInterlocuteurOne = (id:any) => {
    setInterlocuteur.loading = true;
    showData(API_URL.INTERLOCUTEUR_PROSPECTS_LIST, id)
      .then((data: any) => {
        useDataStore().Interlocuteurs = formatInterlocuteurData(data.datas);
        setInterlocuteur.loading = false;
      })
      .catch(() => {
        setInterlocuteur.loading = false;
      });
  };

  //
  const CreateInterlocuteur = async (URL:any, values: any) => {
    setService(
      setInterlocuteur,
      useDataStore(),
      'Interlocuteurs',
      formatInterlocuteurData,
    ).SetCreate(URL, values);
  };

  //
  const InterlocuteurUpdate = (id: any, values: any) => {
    setService(setInterlocuteur, useDataStore(), "Interlocuteurs", formatInterlocuteurData).SetUpdate(
      API_URL.INTERLOCUTEUR_UPDATE,
      id,
      values
    );
  };

  //
  const InterlocuteurDelete = (id: any) => {
    setService(setInterlocuteur, useDataStore(), "Interlocuteurs", formatInterlocuteurData).SetDelete(
      API_URL.INTERLOCUTEUR_REMOVE,
      id
    );
  };

  return {
    FindInterlocuteurAll,
    FindInterlocuteurOne,
    CreateInterlocuteur,
    InterlocuteurUpdate,
    InterlocuteurDelete,
    stateInterlocuteurs,
    setInterlocuteur,
    storeInterlocuteurs,
  };
};
