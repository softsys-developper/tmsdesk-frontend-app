import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useProspectHook = () => {
  const { readData } = useApiServices();
  const setProspect = reactive({ loading: false, loadingCreate: false });
  const stateProspects = ref<any[]>([]);
  stateProspects.value = useDataStore().Prospects;

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
    setService(
      setProspect,
      useDataStore(),
      'DAs',
      formatProspectData
    ).SetCreate(API_URL.PROSPECT_CREATE, values);
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
