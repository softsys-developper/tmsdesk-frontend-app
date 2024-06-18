import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from '../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/Marque.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';
import moment from 'moment';
import { setService } from '@/services/set.services';

export const useMarqueHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setMarque = reactive({ loading: false, loadingCreate: false });
   const stateMarques = ref<any[]>([]);
   stateMarques.value = useDataStore().Marques;
   const { toast } = useToast();

   const formatMarqueData = (Marques: any) => {
      return Marques.map((Marque: any, index:number) => ({
         id: index  + 1,
         libelle: Marque.libelle,
         categorie: Marque.categorie?.libelle,
         telephone: Marque.telephone,
         adresse: Marque.adresse,
         date_creation: moment(Marque.created_at).format("l") ,
      }));
   };


   const storeMarques = computed(() => {
      return useDataStore().Marques
   })

   //
   const FindMarqueAll = () => {
      setMarque.loading = true;
      readData(API_URL.MARQUE_LIST)
         .then((data: any) => {
            useDataStore().Marques =  formatMarqueData(data.datas);
            setMarque.loading = false;
         })
         .catch(() => {
            setMarque.loading = false;
         });
   };

   //
   const FindMarqueOne = () => {};

   //
   const CreateMarque = async(values: any) => {
      setMarque.loadingCreate = true;
      const DataCreated = await createData(API_URL.MARQUE_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setMarque.loadingCreate = false;
               let Marques = useDataStore().Marques

               //
               const toAdd: [] = formatMarqueData([data.data]);
               Marques.unshift(...toAdd);
               useDataStore().Marques = Marques;
               useModalStore().open = false

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setMarque.loadingCreate = false;
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

   const MarqueUpdate = (id: any, values: any) => {
      setService(
        setMarque,
        useDataStore(),
        'Marques',
        formatMarqueData
      ).SetUpdate(API_URL.CLIENT_UPDATE, id, values);
    };
  
    //
    const MarqueDelete = (id: any) => {
      setService(
        setMarque,
        useDataStore(),
        'Marques',
        formatMarqueData
      ).SetDelete(API_URL.CLIENT_REMOVE, id);
    };
  
    return {
      FindMarqueAll,
      FindMarqueOne,
      CreateMarque,
      MarqueUpdate,
      MarqueDelete,
      stateMarques,
      setMarque,
      storeMarques,
    };
};
