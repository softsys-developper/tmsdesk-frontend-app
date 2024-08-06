import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Conge.type';
import moment from "moment";
import { setService } from "@/services/set.services";

export const useCongeHook = () => {
  const { readData } = useApiServices();
  const setConge = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
  });
  const stateConges = ref<any[]>([]);
  stateConges.value = useDataStore().Conges;


  const formatCongeData = (Conges: any) => {
    return Conges.map((Conge: any) => ({
      id: Conge.id,
      t_employe: Conge.employe?.nom,
      type: Conge.type,
      motif: Conge.motif,
      date_depart: Conge.date_depart,
      date_retour: Conge.date_retour,
      nombre_jour: Conge.nombre_jour,
      solde_conge_annuel: Conge.employe?.solde_conge_annuel,
      remarques: Conge.remarques,
      date_creation: moment(Conge.created_at).format("DD/MM/YYYY"),

      // Les champs select
      employe: Conge.employe_id || Conge.employe.id,
    }));
  };
  const storeConges = computed(() => {
    return useDataStore().Conges;
  });

  //
  const FindCongeAll = () => {
    setConge.loading = true;
    readData(API_URL.CONGE_LIST)
      .then((data: any) => {
        useDataStore().Conges = formatCongeData(data.datas);
        setConge.loading = false;
      })
      .catch(() => {
        setConge.loading = false;
      });
  };

  //
  const FindCongeOne = () => {};

  //
  const CreateConge = async (values: any) => {
    setService(setConge, useDataStore(), "Conges", formatCongeData).SetCreate(
      API_URL.CONGE_CREATE,
      values
    );
  };

  const CongeUpdate = (id: any, values: any) => {
    setService(setConge, useDataStore(), "Conges", formatCongeData).SetUpdate(
      API_URL.CONGE_UPDATE,
      id,
      values
    );
  };

  //
  const CongeDelete = (id: any) => {
    setService(setConge, useDataStore(), "Conges", formatCongeData).SetDelete(
      API_URL.CONGE_REMOVE,
      id
    );
  };

  return {
    FindCongeAll,
    FindCongeOne,
    CreateConge,
    CongeUpdate,
    CongeDelete,
    stateConges,
    setConge,
    storeConges,
  };
};
