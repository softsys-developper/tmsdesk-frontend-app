import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
import moment from "moment";
import { useUpdateStore } from "@/stores/update.store";
import { setService } from "@/services/set.services";

export const useDAHook = () => {
  const { readData } = useApiServices();
  const setDA = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false
  });
  const stateDAs = ref<any[]>([]);
  stateDAs.value = useDataStore().DAs;

  // Get Update
  useUpdateStore().UpdateValue = useDataStore().DAs[0];

  const formatDAData = (DAs: any) => {
    return DAs.map((DA: any) => ({
      id: DA.id,
      libelle: DA.libelle,
      date_creation: moment(DA.created_at).format("DD/MM/YYYY"),
    }));
  };
  const storeDAs = computed(() => {
    return useDataStore().DAs;
  });

  //
  const FindDAAll = () => {
    setDA.loading = true;
    readData(API_URL.DA_LIST)
      .then((data: any) => {
        useDataStore().DAs = formatDAData(data.datas);
        setDA.loading = false;
      })
      .catch(() => {
        setDA.loading = false;
      });
  };

  //
  const FindDAOne = () => {};

  //
  const CreateDA = async (values: any) => {
    setService(
      setDA,
      useDataStore(),
      'DAs',
      formatDAData
    ).SetCreate(API_URL.DA_CREATE, values);
  };

  const DAUpdate = (id: any, values: any) => {
    setService(
      setDA,
      useDataStore(),
      'DAs',
      formatDAData
    ).SetUpdate(API_URL.DA_UPDATE, id, values);
  };

  //
  const DADelete = (id: any) => {
    setService(
      setDA,
      useDataStore(),
      'DAs',
      formatDAData
    ).SetDelete(API_URL.DA_REMOVE, id);
  };

  return {
    FindDAAll,
    FindDAOne,
    CreateDA,
    DAUpdate,
    DADelete,
    stateDAs,
    setDA,
    storeDAs,
  };
};
