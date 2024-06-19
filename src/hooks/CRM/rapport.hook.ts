import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Rapport.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useRapportHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setRapport = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
  });
  const stateRapports = ref<any[]>([]);
  stateRapports.value = useDataStore().Rapports;
  const { toast } = useToast();

  const formatRapportData = (Rapports: any) => {
    return Rapports.map((Rapport: any) => ({
      id: Rapport.id,
      message: Rapport.message,
      date_creation: moment(Rapport.created_at).format("DD/MM/YYYY"),
    }));
  };
  const storeRapports = computed(() => {
    return useDataStore().Rapports;
  });

  //
  const FindRapportAll = () => {
    setRapport.loading = true;
    readData(API_URL.RAPPORT_LIST)
      .then((data: any) => {
        useDataStore().Rapports = formatRapportData(data.datas);
        setRapport.loading = false;
      })
      .catch(() => {
        setRapport.loading = false;
      });
  };

  //
  const FindRapportOne = () => { };

  //
  const CreateRapport = async (values: any) => {
    setRapport.loadingCreate = true;
    const DataCreated = await createData(API_URL.RAPPORT_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setRapport.loadingCreate = false;
          let Rapports = useDataStore().Rapports;

          //
          const toAdd: [] = formatRapportData([data.data]);
          Rapports.unshift(...toAdd);
          useDataStore().Rapports = Rapports;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setRapport.loadingCreate = false;
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

  const RapportUpdate = (id: any, values: any) => {
    setService(
      setRapport,
      useDataStore(),
      'Rapports',
      formatRapportData
    ).SetUpdate(API_URL.RAPPORT_UPDATE, id, values);
  };

  //
  const RapportDelete = (id: any) => {
    setService(
      setRapport,
      useDataStore(),
      'Rapports',
      formatRapportData
    ).SetDelete(API_URL.RAPPORT_REMOVE, id);
  };

  return {
    FindRapportAll,
    FindRapportOne,
    CreateRapport,
    RapportUpdate,
    RapportDelete,
    stateRapports,
    setRapport,
    storeRapports,
  };
};
