import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/service.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { setService as SETService } from "@/services/set.services";

export const useServiceHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setService = reactive({ loading: false, loadingCreate: false });
  const stateServices = ref<any[]>([]);
  stateServices.value = useDataStore().Services;
  const { toast } = useToast();

  const formatServiceData = (services: any) => {
    return services.map((service: any, index: any) => ({
      id: index + 1,
      libelle: service.libelle,
      date_creation: moment(service.created_at).format("l"),
    }));
  };

  const storeServices = computed(() => {
    return useDataStore().Services;
  });

  //
  const FindServiceAll = () => {
    setService.loading = true;
    readData(API_URL.SERVICE_LIST)
      .then((data: any) => {
        useDataStore().Services = formatServiceData(data.datas);
        setService.loading = false;
      })
      .catch(() => {
        setService.loading = false;
      });
  };

  //
  const FindServiceOne = () => { };

  //
  const CreateService = async (values: any) => {
    setService.loadingCreate = true;
    const DataCreated = await createData(API_URL.SERVICE_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setService.loadingCreate = false;
          let Services = useDataStore().Services;

          //
          const toAdd: [] = formatServiceData([data.data]);
          Services.unshift(...toAdd);
          useDataStore().Services = Services;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setService.loadingCreate = false;
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

  const ServiceUpdate = (id: any, values: any) => {
    SETService(
      setService,
      useDataStore(),
      'Services',
      formatServiceData
    ).SetUpdate(API_URL.CLIENT_UPDATE, id, values);
  };

  //
  const ServiceDelete = (id: any) => {
    SETService(
      setService,
      useDataStore(),
      'Services',
      formatServiceData
    ).SetDelete(API_URL.CLIENT_REMOVE, id);
  };

  return {
    FindServiceAll,
    FindServiceOne,
    CreateService,
    ServiceUpdate,
    ServiceDelete,
    stateServices,
    setService,
    storeServices,
  };
};
