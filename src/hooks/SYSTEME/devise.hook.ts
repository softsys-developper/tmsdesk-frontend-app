import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from '../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/Devise.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';
import moment from 'moment';
import { setService } from '@/services/set.services';

export const useDeviseHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setDevise = reactive({ loading: false, loadingCreate: false });
   const stateDevises = ref<any[]>([]);
   stateDevises.value = useDataStore().Devises;
   const { toast } = useToast();

   const formatDeviseData = (Devises: any) => {
      return Devises.map((Devise: any) => ({
         id: Devise.id,
         nom_devise: Devise.nom_devise,
         code_devise: Devise.code_devise,
         taux_change: Devise.taux_change,
         date_creation: moment(Devise.created_at).format("l"),
      }));
   };

   const storeDevises = computed(() => {
      return useDataStore().Devises
   })

   //
   const FindDeviseAll = () => {
      setDevise.loading = true;
      readData(API_URL.DEVISE_LIST)
         .then((data: any) => {
            useDataStore().Devises = formatDeviseData(data.datas);
            setDevise.loading = false;
         })
         .catch(() => {
            setDevise.loading = false;
         });
   };

   //
   const FindDeviseOne = () => { };

   //
   const CreateDevise = async (values: any) => {
      setDevise.loadingCreate = true;
      const DataCreated = await createData(API_URL.DEVISE_CREATE, values)
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
         // .catch((err) => {
         //    setDevise.loadingCreate = false;
         //    if (err) {
         //       const isErr = Object.keys(err.response.data.errors);
         //       if (isErr) {
         //          toast({
         //             title: isErr[0],
         //             variant: "destructive",
         //             description: err.response.data.errors[isErr[0]][0],
         //          });
         //       } else {
         //          toast({
         //             title: 'error',
         //             variant: "destructive",
         //             description: err.response.data.message,
         //          });
         //       }
         //    }
         // });

      return { data: DataCreated }
   };

   const DeviseUpdate = (id: any, values: any) => {
      setService(
         setDevise,
         useDataStore(),
         'Devises',
         formatDeviseData
      ).SetUpdate(API_URL.DEVISE_UPDATE, id, values);
   };

   //
   const DeviseDelete = (id: any) => {
      setService(
         setDevise,
         useDataStore(),
         'Devises',
         formatDeviseData
      ).SetDelete(API_URL.DEVISE_REMOVE, id);
   };

   return {
      FindDeviseAll,
      FindDeviseOne,
      CreateDevise,
      DeviseUpdate,
      DeviseDelete,
      stateDevises,
      setDevise,
      storeDevises,
   };
};
