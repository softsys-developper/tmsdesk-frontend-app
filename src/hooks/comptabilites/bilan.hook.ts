import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/bilan.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';
import moment from 'moment';

export const useBilanHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setBilan = reactive({ loading: false, loadingCreate: false });
   const stateBilans = ref<any[]>([]);
   stateBilans.value = useDataStore().Bilans;
   const { toast } = useToast();



   

   const formatBilanData = (bilans: any) => {

      return bilans.map((bilan: any) => ({
            libelle: bilan.key.replace(/_/g, ' ').replace(/(^\w|\s\w)/g, (m:any) => m.toUpperCase()),
            value: bilan.value,
            date_creation: moment(bilan.created_at).format("DD/MM/YYYY") ,
      }));
   };


   const storeBilans = computed(() => {
      return useDataStore().Bilans
   })

   //
   const FindBilanAll = () => {
      setBilan.loading = true;
      readData(API_URL.BILAN_LIST)
         .then((data: any) => {
            useDataStore().Bilans =  formatBilanData(data.data);
            setBilan.loading = false;
         })
         .catch(() => {
            setBilan.loading = false;
         });
   };

   //
   const FindBilanOne = () => {};

   //
   const CreateBilan = async(values: any) => {
      setBilan.loadingCreate = true;
      const DataCreated = await createData(API_URL.CAISSE_TRANSACTION_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setBilan.loadingCreate = false;
               let Bilans = useDataStore().Bilans

               //
               const toAdd: [] = []
               Bilans.unshift(...toAdd);
               useDataStore().Bilans = Bilans;
               useModalStore().open = false

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setBilan.loadingCreate = false;
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
   const FindBilanUpdate = () => {};

   //
   const FindBilanDelete = () => {};

   return {
      FindBilanAll,
      FindBilanOne,
      CreateBilan,
      FindBilanUpdate,
      FindBilanDelete,
      stateBilans,
      setBilan,
      storeBilans
   };
};
