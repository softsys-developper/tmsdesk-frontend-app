import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Client.type';
import moment from "moment";
import { setService } from "@/services/set.services";

export const useClientHook = () => {
  const { readData } = useApiServices();
  const setClient = reactive({ loading: false, loadingCreate: false });
  const stateClients = ref<any[]>([]);
  stateClients.value = useDataStore().Clients;

  const formatClientData = (Clients: any) => {
    return Clients.map((Client: any) => ({
      id: Client.id,
      nom: Client.nom,
      email: Client.email,
      telephone: Client.telephone,
      adresse: Client.adresse,
      date_creation: moment(Client.created_at).format("l"),
    }));
  };

  const storeClients = computed(() => {
    return useDataStore().Clients;
  });

  //
  const FindClientAll = () => {
    setClient.loading = true;
    readData(API_URL.CLIENT_LIST)
      .then((data: any) => {
        useDataStore().Clients = formatClientData(data.datas);
        setClient.loading = false;
      })
      .catch(() => {
        setClient.loading = false;
      });
  };

  //
  const FindClientOne = () => {};

  //
  const CreateClient = async (values: any) => {
    setService(
      setClient,
      useDataStore(),
      'Clients',
      formatClientData
    ).SetCreate(API_URL.CLIENT_CREATE, values);
  };

  //
  const ClientUpdate = (id: any, values: any) => {
    setService(
      setClient,
      useDataStore(),
      'Clients',
      formatClientData
    ).SetUpdate(API_URL.CLIENT_UPDATE, id, values);
  };

  //
  const ClientDelete = (id: any) => {
    setService(
      setClient,
      useDataStore(),
      'Clients',
      formatClientData
    ).SetDelete(API_URL.CLIENT_REMOVE, id);
  };

  return {
    FindClientAll,
    FindClientOne,
    CreateClient,
    ClientUpdate,
    ClientDelete,
    stateClients,
    setClient,
    storeClients,
  };
};
