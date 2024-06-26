

import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './../../stores/data.store';
import { setService } from '@/services/set.services';
import moment from 'moment';

export const useCompteHook = () => {
   const { readData } = useApiServices();
   const setCompte = reactive({ loading: false, loadingCreate: false });
   const stateComptes = ref<any[]>([]);
   stateComptes.value = useDataStore().Comptes;


   const storeComptes = computed(() => {
    return useDataStore().Comptes
   })

   const formatCompteData = (comptes: any) => {
      return comptes.map((compte: any) => ({
         id: compte.id,
         nom: compte.nom,
         solde: compte.solde,
         date_creation: moment(compte.created_at).format("l"),
      }));
   };

   const FindCompteAll = () => {
      setCompte.loading = true;
      readData(API_URL.BANQUE_LIST)
         .then((data: any) => {
            
            useDataStore().Comptes = formatCompteData(data.datas);
            setCompte.loading = false;
         })
         .catch(() => {
            setCompte.loading = false;
         });
   };

   const CreateCompte = async(values: any) => {
      setService(
         setCompte,
         useDataStore(),
         'Comptes',
         formatCompteData
       ).SetCreate(API_URL.BANQUE_CREATE, values);
   };

    //
    const CompteUpdate = (id: any, values: any) => {
      setService(
        setCompte,
        useDataStore(),
        'Comptes',
        formatCompteData
      ).SetUpdate(API_URL.BANQUE_UPDATE, id, values);
    };
   
    //
    const CompteDelete = (id: any) => {
      setService(
        setCompte,
        useDataStore(),
        'Comptes',
        formatCompteData
      ).SetDelete(API_URL.BANQUE_REMOVE, id);
    };
   
    return {
      FindCompteAll,
      CreateCompte,
      CompteUpdate,
      CompteDelete,
      stateComptes,
      setCompte,
      storeComptes,
    };
};
