import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from '../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/Devise.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';
import moment from 'moment';

export const useDeviseHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setDevise = reactive({ loading: false, loadingCreate: false });
   const stateDevises = ref<any[]>([]);
   stateDevises.value = useDataStore().Devises;
   const { toast } = useToast();

   const formatDeviseData = (Devises: any) => {
      return Devises.map((Devise: any, index:number) => ({
         id: index  + 1,
         nom: Devise.nom,
         email: Devise.email,
         telephone: Devise.telephone,
         adresse: Devise.adresse,
         date_creation: moment(Devise.created_at).format("l") ,
      }));
   };


   const storeDevises = computed(() => {
      return useDataStore().Devises
   })

   //
   const FindDeviseAll = () => {
      setDevise.loading = true;
      readData(API_URL.MARQUE_LIST)
         .then((data: any) => {
            useDataStore().Devises =  formatDeviseData(data.datas);
            setDevise.loading = false;
         })
         .catch(() => {
            setDevise.loading = false;
         });
   };

   //
   const FindDeviseOne = () => {};

   //
   const CreateDevise = async(values: any) => {
      setDevise.loadingCreate = true;
      const DataCreated = await createData(API_URL.MARQUE_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setDevise.loadingCreate = false;
               let Devises = useDataStore().Devises

               //
               const toAdd: [] = formatDeviseData([data.data]);
               Devises.unshift(...toAdd);
               useDataStore().Devises = Devises;
               useModalStore().open = false

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setDevise.loadingCreate = false;
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
   const FindDeviseUpdate = () => {};

   //
   const FindDeviseDelete = () => {};

   return {
      FindDeviseAll,
      FindDeviseOne,
      CreateDevise,
      FindDeviseUpdate,
      FindDeviseDelete,
      stateDevises,
      setDevise,
      storeDevises
   };
};
