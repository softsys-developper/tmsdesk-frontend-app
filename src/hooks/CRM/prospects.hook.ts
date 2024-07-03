import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
import moment from "moment";
import { setService } from "@/services/set.services";
import { useUtilHook } from "../utils.hook";

export const useProspectHook = () => {
  const { readData } = useApiServices();
  const setProspect = reactive({ loading: false, loadingCreate: false });
  const stateProspects = ref<any[]>([]);
  stateProspects.value = useDataStore().Prospects;
  const { StatusHtml } = useUtilHook()

  const formatProspectData = (Prospects: any) => {
    return Prospects.map((Prospect: any) => ({
      id: Prospect.id,
      nom: Prospect.nom,
      email: Prospect.email,
      telephone: Prospect.telephone,
      adresse: Prospect.adresse,
      proposition: Prospect.proposition, 
      status: StatusHtml(Prospect.etape?.nom, `bg`, Prospect.etape?.couleur),
      observation: Prospect.observation,
      date_creation: moment(Prospect.created_at).format("DD/MM/YYYY"),
      interlocuteurs: Prospect.interlocuteurs,

      etape: Prospect.etape_id,
      domaine_activite_id: Prospect.domaine_activite_id
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
        useDataStore().Update.Prospects = data.datas;
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
      'Prospects',
      formatProspectData
    ).SetCreate(API_URL.PROSPECT_CREATE, values);
  };

  //
  const CreateProspectStep = async (id: any, values: any, callback:any) => {
    setService(
      setProspect,
      useDataStore(),
      'Prospects',
      formatProspectData,
      callback()
    ).SetUpdate(API_URL.PROSPECT_STEP_CHANGE, id,  values);
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
    CreateProspectStep,
    ProspectUpdate,
    ProspectDelete,
    stateProspects,
    setProspect,
    storeProspects,
  };
};
