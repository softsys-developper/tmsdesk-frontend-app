import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/NBC.type';
import moment from "moment";
import { setService } from "@/services/set.services";

export const useNBCHook = () => {
  const { readData } = useApiServices();
  const setNBC = reactive({ loading: false, loadingCreate: false });
  const stateNBCs = ref<any[]>([]);
  stateNBCs.value = useDataStore().NBCs;

  const formatNBCData = (NBCs: any) => {
    return NBCs.map((NBC: any) => ({
      id: NBC.id,
      numero_bon_de_commande: NBC.numero_bon_de_commande,
      montant: NBC.montant,
      numero_proforma: NBC.proforma?.numero_proforma,
      date_creation: moment(NBC.created_at).format("DD/MM/YYYY"),
    }));
  };

  const storeNBCs = computed(() => {
    return useDataStore().NBCs;
  });

  //
  const FindNBCAll = () => {
    setNBC.loading = true;
    readData(API_URL.NBC_LIST)
      .then((data: any) => {
        console.log('IKL : ', data)
        useDataStore().NBCs = formatNBCData(data.datas);
        setNBC.loading = false;
      })
      .catch(() => {
        setNBC.loading = false;
      });
  };

  //
  const FindNBCOne = () => {};

  //
  const CreateNBC = async (values: any, callback?:any) => {
    setService(
      setNBC,
      useDataStore(),
      'storeNBCs',
      formatNBCData,
      callback
    ).SetCreate(API_URL.NBC_CREATE, values);
  };

  //
  const NBCUpdate = (id: any, values: any) => {
    setService(setNBC, useDataStore(), "NBCs", formatNBCData).SetUpdate(
      API_URL.NBC_UPDATE,
      id,
      values
    );
  };

  //
  const NBCDelete = (id: any) => {
    setService(setNBC, useDataStore(), "NBCs", formatNBCData).SetDelete(
      API_URL.NBC_REMOVE,
      id
    );
  };

  return {
    FindNBCAll,
    FindNBCOne,
    CreateNBC,
    NBCUpdate,
    NBCDelete,
    stateNBCs,
    setNBC,
    storeNBCs,
  };
};
