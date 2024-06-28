import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/salaire.type';
import { useUtilHook } from "@/hooks/utils.hook";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useSalaireHook = () => {
  const { readData } = useApiServices();
  const {  } = useUtilHook();
  const setSalaire = reactive({ loading: false, loadingCreate: false });
  const stateSalaires = ref<any[]>([]);
  stateSalaires.value = useDataStore().Salary;


  const formatSalaireData = (salaires: any) => {
    return salaires.map((salaire: any) => ({
      id: salaire.id,
      categorie: salaire.categorie,
      montant: salaire.montant,
      date_creation: moment(salaire.created_at).format("l") ,
    }));
  };

  const storeSalaires = computed(() => {
    return useDataStore().Salary;
  });

  //
  const FindSalaireAll = () => {
    setSalaire.loading = true;
    readData(API_URL.SALAIRE_LIST)
      .then((data: any) => {
        useDataStore().Salary = formatSalaireData(data.datas);
        setSalaire.loading = false;
      })
      .catch(() => {
        setSalaire.loading = false;
      });
  };

  //
  const FindSalaireOne = () => {};

  //
  const CreateSalaire = async (values: any) => {
    setService(
      setSalaire,
      useDataStore(),
      'Salaires',
      formatSalaireData
    ).SetCreate(API_URL.SALAIRE_CREATE, values);
  };

  const SalaireUpdate = (id: any, values: any) => {
    setService(
      setSalaire,
      useDataStore(),
      'Salaires',
      formatSalaireData
    ).SetUpdate(API_URL.SALAIRE_UPDATE, id, values);
  };

  //
  const SalaireDelete = (id: any) => {
    setService(
      setSalaire,
      useDataStore(),
      'Salaires',
      formatSalaireData
    ).SetDelete(API_URL.SALAIRE_REMOVE, id);
  };

  return {
    FindSalaireAll,
    FindSalaireOne,
    CreateSalaire,
    SalaireUpdate,
    SalaireDelete,
    stateSalaires,
    setSalaire,
    storeSalaires,
  };
};
