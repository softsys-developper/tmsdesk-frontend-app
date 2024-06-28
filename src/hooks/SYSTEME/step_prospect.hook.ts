import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from '../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/StepProspect.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';
import moment from 'moment';
import { setService } from '@/services/set.services';

export const useStepProspectHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setStepProspect = reactive({ loading: false, loadingCreate: false });
   const stateStepProspects = ref<any[]>([]);
   stateStepProspects.value = useDataStore().StepProspects;
   const { toast } = useToast();

   const formatStepProspectData = (StepProspects: any) => {
      return StepProspects.map((StepProspect: any, index:number) => ({
         id: index  + 1,
         libelle: StepProspect.libelle,
         categorie: StepProspect.categorie?.libelle,
         telephone: StepProspect.telephone,
         adresse: StepProspect.adresse,
         date_creation: moment(StepProspect.created_at).format("l") ,
      }));
   };


   const storeStepProspects = computed(() => {
      return useDataStore().StepProspects
   })

   //
   const FindStepProspectAll = () => {
      setStepProspect.loading = true;
      readData(API_URL.MARQUE_LIST)
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
      setStepProspect.loadingCreate = true;
      const DataCreated = await createData(API_URL.MARQUE_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setStepProspect.loadingCreate = false;
               let StepProspects = useDataStore().StepProspects

               //
               const toAdd: [] = formatStepProspectData([data.data]);
               StepProspects.unshift(...toAdd);
               useDataStore().StepProspects = StepProspects;
               useModalStore().open = false

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setStepProspect.loadingCreate = false;
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

   const StepProspectUpdate = (id: any, values: any) => {
      setService(
        setStepProspect,
        useDataStore(),
        'StepProspects',
        formatStepProspectData
      ).SetUpdate(API_URL.CLIENT_UPDATE, id, values);
    };
  
    //
    const StepProspectDelete = (id: any) => {
      setService(
        setStepProspect,
        useDataStore(),
        'StepProspects',
        formatStepProspectData
      ).SetDelete(API_URL.CLIENT_REMOVE, id);
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
