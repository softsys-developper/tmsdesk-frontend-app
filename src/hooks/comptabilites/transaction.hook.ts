import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/transaction.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';

export const useTransactionHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setTransaction = reactive({ loading: false, loadingCreate: false });
   const stateTransactions = ref<any[]>([]);
   stateTransactions.value = useDataStore().Transactions;
   const { toast } = useToast();

   const formatTransactionData = (transactions: any) => {
      return transactions.map((transaction: any) => ({
         numero_bon_de_caisse: transaction.numero_bon_de_caisse,
         designation: transaction.designation,
         recepteur: transaction.recepteur,
         montant: transaction.montant,
         type_transaction: `<p class="' py-1  capitalize max-w-min rounded-md px-4 flex justify-center font-bold text-xs text-white ' ${
            transaction.type_transaction !== 'entree' ? 'bg-red-500' : 'bg-green-500'
         }">${transaction.type_transaction}</p>`,
         date_transaction: transaction.date_transaction,
      }));
   };


   const storeTransactions = computed(() => {
      return useDataStore().Transactions
   })

   //
   const FindTransactionAll = () => {
      setTransaction.loading = true;
      readData(API_URL.CAISSE_TRANSACTION_LIST)
         .then((data: any) => {
            useDataStore().Transactions =  formatTransactionData(data.datas);
            setTransaction.loading = false;
         })
         .catch(() => {
            setTransaction.loading = false;
         });
   };

   //
   const FindTransactionOne = () => {};

   //
   const CreateTransaction = async(values: any) => {
      setTransaction.loadingCreate = true;
      const DataCreated = await createData(API_URL.CAISSE_TRANSACTION_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setTransaction.loadingCreate = false;
               let Transactions = useDataStore().Transactions

               //
               const toAdd: [] = formatTransactionData([data.data]);
               Transactions.unshift(...toAdd);
               useDataStore().Transactions = Transactions;
               useModalStore().open = false

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setTransaction.loadingCreate = false;
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
   const FindTransactionUpdate = () => {};

   //
   const FindTransactionDelete = () => {};

   return {
      FindTransactionAll,
      FindTransactionOne,
      CreateTransaction,
      FindTransactionUpdate,
      FindTransactionDelete,
      stateTransactions,
      setTransaction,
      storeTransactions
   };
};
