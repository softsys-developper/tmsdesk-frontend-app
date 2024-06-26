import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/facturePaid.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import { setService } from "@/services/set.services";

export const useFacturePaidHook = () => {
  const { readData, createData, showData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setFacturePaid = reactive({ loading: false, loadingCreate: false, facture: <any>{} });
  const stateFacturePaids = ref<any[]>([]);
  stateFacturePaids.value = useDataStore().FacturePaids;
  const { toast } = useToast();

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
    setFacturePaid.loadingCreate = true;
    const DataCreated = await createData(API_URL.FACTURE_PAID_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setFacturePaid.loadingCreate = false;
          let FacturePaids = useDataStore().FacturePaids;

          //
          const toAdd: [] = formatFacturePaidData([data.data]);
          FacturePaids.unshift(...toAdd);
          useDataStore().FacturePaids = FacturePaids;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setFacturePaid.loadingCreate = false;
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
      });

    return { data: DataCreated };
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
