

import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './../../stores/data.store';
import { setService } from '@/services/set.services';
import moment from 'moment';

export const useHolidayHook = () => {
   const { readData } = useApiServices();
   const setHoliday = reactive({ loading: false, loadingCreate: false });
   const stateHoliday = ref<any[]>([]);
   stateHoliday.value = useDataStore().Holiday;


   const storeHoliday = computed(() => {
    return useDataStore().Holiday
   })

   const formatHolidayData = (comptes: any) => {
      return comptes.map((compte: any) => ({
         id: compte.id,
         numero_compte: compte.numero_compte,
         nom: compte.nom,
         solde: compte.solde,
         date_creation: moment(compte.created_at).format("DD/MM/YYYY"),
      }));
   };

   const FindHolidayAll = () => {
      setHoliday.loading = true;
      readData(API_URL.BANQUE_LIST)
         .then((data: any) => {
            
            useDataStore().Holiday = formatHolidayData(data.datas);
            setHoliday.loading = false;
         })
         .catch(() => {
            setHoliday.loading = false;
         });
   };

   const CreateHoliday = async(values: any) => {
      setService(
         setHoliday,
         useDataStore(),
         'Holiday',
         formatHolidayData
       ).SetCreate(API_URL.BANQUE_CREATE, values);
   };

    //
    const HolidayUpdate = (id: any, values: any) => {
      setService(
        setHoliday,
        useDataStore(),
        'Holiday',
        formatHolidayData
      ).SetUpdate(API_URL.BANQUE_UPDATE, id, values);
    };
   
    //
    const HolidayDelete = (id: any) => {
      setService(
        setHoliday,
        useDataStore(),
        'Holiday',
        formatHolidayData
      ).SetDelete(API_URL.BANQUE_REMOVE, id);
    };
   
    return {
      FindHolidayAll,
      CreateHoliday,
      HolidayUpdate,
      HolidayDelete,
      stateHoliday,
      setHoliday,
      storeHoliday,
    };
};
