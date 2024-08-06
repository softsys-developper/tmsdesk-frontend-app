

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

   const formatHolidayData = (holiday: any) => {
      return holiday.map((holiday: any) => ({
         id: holiday.id,
         description: holiday.description,
         date_creation: moment(holiday.created_at).format("DD/MM/YYYY"),
      }));
   };

   const FindHolidayAll = () => {
      setHoliday.loading = true;
      readData(API_URL.HOLIDAY_LIST)
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
       ).SetCreate(API_URL.HOLIDAY_CREATE, values);
   };

    //
    const HolidayUpdate = (id: any, values: any) => {
      setService(
        setHoliday,
        useDataStore(),
        'Holiday',
        formatHolidayData
      ).SetUpdate(API_URL.HOLIDAY_UPDATE, id, values);
    };
   
    //
    const HolidayDelete = (id: any) => {
      setService(
        setHoliday,
        useDataStore(),
        'Holiday',
        formatHolidayData
      ).SetDelete(API_URL.HOLIDAY_REMOVE, id);
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
