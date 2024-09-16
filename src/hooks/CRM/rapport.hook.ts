import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Rapport.type';
import moment from "moment";
import { setService } from "@/services/set.services";

export const useRapportHook = () => {
  const { readData } = useApiServices();
  const setRapport = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
  });
  const stateRapports = ref<any[]>([]);
  stateRapports.value = useDataStore().Rapports;

  const formatRapportData = (Rapports: any) => {
    return Rapports.map((Rapport: any) => ({
      
      id: Rapport.id,
      message: Rapport.message,
      commercial: Rapport.name,
      date_creation: moment(Rapport.created_at).format("DD/MM/YYYY"),

      prospect: 3,
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
        useDataStore().Rapports = formatRapportData(data.data);
        setRapport.loading = false;
      })
      .catch(() => {
        setRapport.loading = false;
      });
  };


    //
    const RapportEchangeAll = () => {
      setRapport.loading = true;
      readData(API_URL.RAPPORT_ECHANGE_LIST)
        .then((data: any) => {
          useDataStore().Rapports = formatRapportData(data.data);
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
    setService(
      setRapport,
      useDataStore(),
      'Rapports',
      formatRapportData
    ).SetCreate(API_URL.RAPPORT_CREATE, values); 
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

  //
  const RapportEchangeDelete = (id: any) => {
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
    RapportEchangeDelete,
    stateRapports,
    setRapport,
    storeRapports,
    RapportEchangeAll
  };
};
