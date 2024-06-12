import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/Client.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';
import moment from 'moment';

export const useClientHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setClient = reactive({ loading: false, loadingCreate: false });
   const stateClients = ref<any[]>([]);
   stateClients.value = useDataStore().Clients;
   const { toast } = useToast();

   const formatClientData = (Clients: any) => {
      return Clients.map((Client: any) => ({
         id: Client.id,
         nom: Client.nom,
         email: Client.email,
         telephone: Client.telephone,
         adresse: Client.adresse,
         date_creation: moment(Client.created_at).format("l") ,
      }));
   };


   const storeClients = computed(() => {
      return useDataStore().Clients
   })

   //
   const FindClientAll = () => {
      setClient.loading = true;
      readData(API_URL.CLIENT_LIST)
         .then((data: any) => {
            useDataStore().Clients =  formatClientData(data.datas);
            setClient.loading = false;
         })
         .catch(() => {
            setClient.loading = false;
         });
   };

   //
   const FindClientOne = () => {};

   //
   const CreateClient = async(values: any) => {
      setClient.loadingCreate = true;
      const DataCreated = await createData(API_URL.CLIENT_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setClient.loadingCreate = false;
               let Clients = useDataStore().Clients

               //
               const toAdd: [] = formatClientData([data.data]);
               Clients.unshift(...toAdd);
               useDataStore().Clients = Clients;
               useModalStore().open = false

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setClient.loadingCreate = false;
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
                     title: 'error',
                     variant: "destructive",
                     description: err.response.data.message,
                  });
               }
            }
         });

         return {data: DataCreated}
   };

   //
   const FindClientUpdate = () => {};

   //
   const FindClientDelete = () => {};

   return {
      FindClientAll,
      FindClientOne,
      CreateClient,
      FindClientUpdate,
      FindClientDelete,
      stateClients,
      setClient,
      storeClients
   };
};
