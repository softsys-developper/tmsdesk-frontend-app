import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from '../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/StepProspect.type';
import moment from 'moment';
import { setService } from '@/services/set.services';
import { useUtilHook } from '../utils.hook';

export const useStepProspectHook = () => {
   const { readData } = useApiServices();
   const setStepProspect = reactive({ loading: false, loadingCreate: false });
   const stateStepProspects = ref<any[]>([]);
   stateStepProspects.value = useDataStore().StepProspects;

   const formatStepProspectData = (StepProspects: any) => {
      return StepProspects.map((StepProspect: any, index:number) => ({
         id: index  + 1,
         nom: StepProspect.nom,
         couleur: useUtilHook().StatusHtml(StepProspect.couleur, 'bg', StepProspect.couleur),
         date_creation: moment(StepProspect.created_at).format("l") ,
      }));
   };


   const storeStepProspects = computed(() => {
      return useDataStore().StepProspects
   })

   //
   const FindStepProspectAll = () => {
      setStepProspect.loading = true;
      readData(API_URL.STEP_LIST)
         .then((data: any) => {
            useDataStore().StepProspects =  formatStepProspectData(data.datas);
            setStepProspect.loading = false;
         })
         .catch(() => {
            setStepProspect.loading = false;
         });
   };

   //
   const FindStepProspectOne = () => {};

   //
   const CreateStepProspect = async(values: any) => {
      setService(
         setStepProspect,
         useDataStore(),
         'StepProspects',
         formatStepProspectData
       ).SetCreate(API_URL.STEP_CREATE, values);
   };

   const StepProspectUpdate = (id: any, values: any) => {
      setService(
        setStepProspect,
        useDataStore(),
        'StepProspects',
        formatStepProspectData
      ).SetUpdate(API_URL.STEP_UPDATE, id, values);
    };
  
    //
    const StepProspectDelete = (id: any) => {
      setService(
        setStepProspect,
        useDataStore(),
        'StepProspects',
        formatStepProspectData
      ).SetDelete(API_URL.STEP_REMOVE, id);
    };
  
    return {
      FindStepProspectAll,
      FindStepProspectOne,
      CreateStepProspect,
      StepProspectUpdate,
      StepProspectDelete,
      stateStepProspects,
      setStepProspect,
      storeStepProspects,
    };
};
