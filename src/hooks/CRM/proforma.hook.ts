import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Proforma.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import { setService } from "@/services/set.services";

export const useProformaHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setProforma = reactive({ loading: false, loadingCreate: false });
  const stateProformas = ref<any[]>([]);
  stateProformas.value = useDataStore().Proformas;
  const { toast } = useToast();

  const StatusHtml = (name: string, bg: string) => {
    return `<span class="text-sm font-bold flex text-white min-w-max max-w-min px-2 py-1 rounded-md text-center ${bg}" >${name}</span>`;
  };

  const formatProformaData = (Proformas: any) => {
    return Proformas.map((Proforma: any) => ({
      id: Proforma.id,
      numero_proforma: Proforma.numero_proforma,
      ref_client: Proforma.ref_client,
      client: Proforma.client?.nom,
      montant_ttc: Proforma.montant_ttc,
      status:
        Proforma.etat == 1
          ? StatusHtml("En cours", "bg-yellow-400")
          : Proforma.etat == 2
          ? StatusHtml("Gagné", "bg-green-500")
          : Proforma.etat == 3 ?
           StatusHtml("Perdu", "bg-red-500")
           : StatusHtml("Abandonné", "bg-gray-500"),
      date_creation: Proforma.date_creation,
      date_validite: Proforma.date_validite,
    }));
  };

  const storeProformas = computed(() => {
    return useDataStore().Proformas;
  });

  //
  const FindProformaAll = () => {
    setProforma.loading = true;
    readData(API_URL.PROFORMA_LIST)
      .then((data: any) => {
        useDataStore().Proformas = formatProformaData(data.datas);
        setProforma.loading = false;
      })
      .catch(() => {
        setProforma.loading = false;
      });
  };

  //
  const FindProformaOne = () => {};

  //
  const CreateProforma = async (values: any) => {
    setProforma.loadingCreate = true;
    const DataCreated = await createData(API_URL.PROFORMA_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setProforma.loadingCreate = false;
          let Proformas = useDataStore().Proformas;

          //
          const toAdd: [] = formatProformaData([data.data]);
          Proformas.unshift(...toAdd);
          useDataStore().Proformas = Proformas;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setProforma.loadingCreate = false;
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
  const ProformaUpdate = (id: any, values: any) => {
    setService(
      setProforma,
      useDataStore(),
      "Proformas",
      formatProformaData
    ).SetUpdate(API_URL.PROFORMA_UPDATE, id, values);
  };

  //
  const ProformaDelete = (id: any) => {
    setService(
      setProforma,
      useDataStore(),
      "Proformas",
      formatProformaData
    ).SetDelete(API_URL.PROFORMA_REMOVE, id);
  };

  return {
    FindProformaAll,
    FindProformaOne,
    CreateProforma,
    ProformaUpdate,
    ProformaDelete,
    stateProformas,
    setProforma,
    storeProformas,
    formatProformaData
  };
};
