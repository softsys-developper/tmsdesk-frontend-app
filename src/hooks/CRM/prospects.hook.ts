import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Prospect.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useProspectHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setProspect = reactive({ loading: false, loadingCreate: false });
  const stateProspects = ref<any[]>([]);
  stateProspects.value = useDataStore().Prospects;
  const { toast } = useToast();

  const formatProspectData = (Prospects: any) => {
    return Prospects.map((Prospect: any) => ({
      id: Prospect.id,
      nom: Prospect.nom,
      email: Prospect.email,
      telephone: Prospect.telephone,
      adresse: Prospect.adresse,
      proposition: Prospect.proposition,
      etape: Prospect.etape,
      observation: Prospect.observation,
      date_creation: moment(Prospect.created_at).format("l"),
    }));
  };

  const storeProspects = computed(() => {
    return useDataStore().Prospects;
  });

  //
  const FindProspectAll = () => {
    setProspect.loading = true;
    readData(API_URL.PROSPECT_LIST)
      .then((data: any) => {
        useDataStore().Prospects = formatProspectData(data.datas);
        setProspect.loading = false;
      })
      .catch(() => {
        setProspect.loading = false;
      });
  };

  //
  const FindProspectOne = () => {};

  //
  const CreateProspect = async (values: any) => {
    setProspect.loadingCreate = true;
    const DataCreated = await createData(API_URL.PROSPECT_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setProspect.loadingCreate = false;
          let Prospects = useDataStore().Prospects;

          //
          const toAdd: [] = formatProspectData([data.data]);
          Prospects.unshift(...toAdd);
          useDataStore().Prospects = Prospects;
          useModalStore().open = false;

          

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setProspect.loadingCreate = false;
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
  const ProspectUpdate = (id: any, values: any) => {
    setService(
      setProspect,
      useDataStore(),
      'Prospects',
      formatProspectData
    ).SetUpdate(API_URL.PROSPECT_UPDATE, id, values);
  };

  //
  const ProspectDelete = (id: any) => {
    setService(
      setProspect,
      useDataStore(),
      'Prospects',
      formatProspectData
    ).SetDelete(API_URL.PROSPECT_REMOVE, id);
  };
   

  return {
    FindProspectAll,
    FindProspectOne,
    CreateProspect,
    ProspectUpdate,
    ProspectDelete,
    stateProspects,
    setProspect,
    storeProspects,
  };
};
