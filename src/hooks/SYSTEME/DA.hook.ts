import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/DA.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { useUpdateStore } from "@/stores/update.store";
import { setService } from "@/services/set.services";

export const useDAHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setDA = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false
  });
  const stateDAs = ref<any[]>([]);
  stateDAs.value = useDataStore().DAs;
  const { toast } = useToast();

  // Get Update
  useUpdateStore().UpdateValue = useDataStore().DAs[0];

  const formatDAData = (DAs: any) => {
    return DAs.map((DA: any) => ({
      id: DA.id,
      libelle: DA.libelle,
      date_creation: moment(DA.created_at).format("l"),
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
    setDA.loadingCreate = true;
    const DataCreated = await createData(API_URL.DA_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setDA.loadingCreate = false;
          let DAs = useDataStore().DAs;

          //
          const toAdd: [] = formatDAData([data.data]);
          DAs.unshift(...toAdd);
          useDataStore().DAs = DAs;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setDA.loadingCreate = false;
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
