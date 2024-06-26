import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/NBC.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useNBCHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setNBC = reactive({ loading: false, loadingCreate: false });
  const stateNBCs = ref<any[]>([]);
  stateNBCs.value = useDataStore().NBCs;
  const { toast } = useToast();

  const formatNBCData = (NBCs: any) => {
    return NBCs.map((NBC: any) => ({
      id: NBC.id,
      numero_bon_de_commande: NBC.numero_bon_de_commande,
      montant: NBC.montant,
      telephone: NBC.telephone,
      adresse: NBC.adresse,
      date_creation: moment(NBC.created_at).format("l"),
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
    setNBC.loadingCreate = true;
    const DataCreated = await createData(API_URL.NBC_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setNBC.loadingCreate = false;
          let NBCs = useDataStore().NBCs;

          //
          const toAdd: [] = formatNBCData([data.data]);
          NBCs.unshift(...toAdd);
          useDataStore().NBCs = NBCs;
          useModalStore().open = false;
          callback()

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setNBC.loadingCreate = false;
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
