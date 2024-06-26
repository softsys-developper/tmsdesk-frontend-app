import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/depense.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';
import { setService } from '@/services/set.services';

export const useDepenseHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setDepense = reactive({ loading: false, loadingCreate: false });
   const stateDepenses = ref<any[]>([]);
   stateDepenses.value = useDataStore().Depenses;
   const { toast } = useToast();

   const formatDepenseData = (depenses: any) => {
      return depenses.map((depense: any) => ({
         id: depense.id,
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


   const storeDepenses = computed(() => {
      return useDataStore().Depenses
   })

   //
   const FindDepenseAll = () => {
      setDepense.loading = true;
      readData(API_URL.CAISSE_TRANSACTION_LIST)
         .then((data: any) => {
            useDataStore().Depenses =  formatDepenseData(data.datas);
            setDepense.loading = false;
         })
         .catch(() => {
            setDepense.loading = false;
         });
   };

   //
   const FindDepenseOne = () => {};

   //
   const CreateDepense = async(values: any) => {
      setDepense.loadingCreate = true;
      const DataCreated = await createData(API_URL.CAISSE_TRANSACTION_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setDepense.loadingCreate = false;
               let Depenses = useDataStore().Depenses

               //
               const toAdd: [] = formatDepenseData([data.data]);
               Depenses.unshift(...toAdd);
               useDataStore().Depenses = Depenses;
               useModalStore().open = false

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setDepense.loadingCreate = false;
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
  const DepenseUpdate = (id: any, values: any) => {
   setService(
     setDepense,
     useDataStore(),
     'Depenses',
     formatDepenseData
   ).SetUpdate(API_URL.CAISSE_TRANSACTION_UPDATE, id, values);
 };

 //
 const DepenseDelete = (id: any) => {
   setService(
     setDepense,
     useDataStore(),
     'Depenses',
     formatDepenseData
   ).SetDelete(API_URL.CAISSE_TRANSACTION_REMOVE, id);
 };

 return {
   FindDepenseAll,
   FindDepenseOne,
   CreateDepense,
   DepenseUpdate,
   DepenseDelete,
   stateDepenses,
   setDepense,
   storeDepenses,
 };
};
