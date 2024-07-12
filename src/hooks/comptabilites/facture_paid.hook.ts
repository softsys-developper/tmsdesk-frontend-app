import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/facturePaid.type';
import { setService } from "@/services/set.services";

export const useFacturePaidHook = () => {
  const { readData, showData } = useApiServices();
  const setFacturePaid = reactive({ loading: false, loadingCreate: false, facture: <any>{} });
  const stateFacturePaids = ref<any[]>([]);
  stateFacturePaids.value = useDataStore().FacturePaids;

  const formatFacturePaidData = (facturePaids: any) => {
    return facturePaids.map((facturePaid: any) => ({
      id: facturePaid.id,
      recepteur: facturePaid.recepteur,
      montant: facturePaid.montant,
      type_transaction: `<p class="' py-1  capitalize max-w-min rounded-md px-4 flex justify-center font-bold text-xs text-white ' ${
        facturePaid.type_transaction !== "entrée" ? "bg-red-500" : "bg-green-500"
      }">${facturePaid.type_transaction}</p>`,
      banque: facturePaid.banque.nom,
      date_transaction: facturePaid.date_transaction,
    }));
  };

  const storeFacturePaids = computed(() => {
    return useDataStore().FacturePaids;
  });

  //
  const FindFacturePaidAll = () => {
    setFacturePaid.loading = true;
    readData(API_URL.FACTURE_PAID_LIST)
      .then((data: any) => {
        useDataStore().FacturePaids = formatFacturePaidData(data.datas);
        setFacturePaid.loading = false;
      })
      .catch(() => {
        setFacturePaid.loading = false;
      });
  };

  //
  const FindFacturePaidOne = (id: any) => {
    setFacturePaid.loading = true;
    showData(API_URL.FACTURE_PAID_DETAIL, id)
      .then((data: any) => {
        setFacturePaid.facture = data.facture
        useDataStore().FacturePaids = formatFacturePaidData(data.datas);
        setFacturePaid.loading = false;
      })
      .catch(() => {
        setFacturePaid.loading = false;
      });
  };

  //
  const CreateFacturePaid = async (values: any) => {
    setService(
      setFacturePaid,
      useDataStore(),
      'FacturePaids',
      formatFacturePaidData
    ).SetCreate(API_URL.FACTURE_PAID_CREATE, values);
  };
 

  //
  const FacturePaidUpdate = (id: any, values: any) => {
    setService(
      setFacturePaid,
      useDataStore(),
      "FacturePaids",
      formatFacturePaidData
    ).SetUpdate(API_URL.FACTURE_PAID_UPDATE, id, values);
  };

  //
  const FacturePaidDelete = (id: any) => {
    setService(
      setFacturePaid,
      useDataStore(),
      "FacturePaids",
      formatFacturePaidData
    ).SetDelete(API_URL.FACTURE_PAID_REMOVE, id);
  };

  return {
    FindFacturePaidAll,
    FindFacturePaidOne,
    CreateFacturePaid,
    FacturePaidUpdate,
    FacturePaidDelete,
    stateFacturePaids,
    setFacturePaid,
    storeFacturePaids,
  };
};
