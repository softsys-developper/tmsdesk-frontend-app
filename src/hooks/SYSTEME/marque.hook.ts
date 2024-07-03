import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from '../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/Marque.type';
import moment from 'moment';
import { setService } from '@/services/set.services';

export const useMarqueHook = () => {
   const { readData } = useApiServices();
   const setMarque = reactive({ loading: false, loadingCreate: false });
   const stateMarques = ref<any[]>([]);
   stateMarques.value = useDataStore().Marques;

   const formatMarqueData = (Marques: any) => {
      return Marques.map((Marque: any, index:number) => ({
         id: index  + 1,
         libelle: Marque.libelle,
         categorie: Marque.categorie?.libelle,
         telephone: Marque.telephone,
         adresse: Marque.adresse,
         date_creation: moment(Marque.created_at).format("DD/MM/YYYY") ,
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
      setService(
         setMarque,
         useDataStore(),
         'Marques',
         formatMarqueData
       ).SetCreate(API_URL.MARQUE_CREATE, values);
   };

   const MarqueUpdate = (id: any, values: any) => {
      setService(
        setMarque,
        useDataStore(),
        'Marques',
        formatMarqueData
      ).SetUpdate(API_URL.MARQUE_UPDATE, id, values);
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
