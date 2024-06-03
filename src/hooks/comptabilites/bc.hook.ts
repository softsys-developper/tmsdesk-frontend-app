import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/depense.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';

export const useBCHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setBC = reactive({ loading: false, loadingCreate: false });
   const stateBCs = ref<any[]>([]);
   stateBCs.value = useDataStore().BCs;
   const { toast } = useToast();

   const formatBCData = (depenses: any) => {
      return depenses.map((depense: any) => ({
         numero_bon_de_caisse: depense.numero_bon_de_caisse,
         designation: depense.designation,
         recepteur: depense.recepteur,
         montant: depense.montant,
         type_transaction: `<p class="' py-1  capitalize max-w-min rounded-md px-4 flex justify-center font-bold text-xs text-white ' ${
            depense.type_transaction !== 'entree' ? 'bg-red-500' : 'bg-green-500'
         }">${depense.type_transaction}</p>`,
         date_transaction: depense.date_transaction,
      }));
   };


   const storeBCs = computed(() => {
      return useDataStore().BCs
   })

   //
   const FindBCAll = () => {
      setBC.loading = true;
      readData(API_URL.CAISSE_TRANSACTION_LIST)
         .then((data: any) => {
            useDataStore().BCs =  formatBCData(data.datas);
            setBC.loading = false;
         })
         .catch(() => {
            setBC.loading = false;
         });
   };

   //
   const FindBCOne = () => {};

   //
   const CreateBC = async(values: any) => {
      setBC.loadingCreate = true;
      const DataCreated = await createData(API_URL.CAISSE_TRANSACTION_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setBC.loadingCreate = false;
               let BCs = useDataStore().BCs

               //
               const toAdd: [] = formatBCData([data.data]);
               BCs.unshift(...toAdd);
               useDataStore().BCs = BCs;
               useModalStore().open = false

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setBC.loadingCreate = false;
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
   const FindBCUpdate = () => {};

   //
   const FindBCDelete = () => {};

   return {
      FindBCAll,
      FindBCOne,
      CreateBC,
      FindBCUpdate,
      FindBCDelete,
      stateBCs,
      setBC,
      storeBCs
   };
};
