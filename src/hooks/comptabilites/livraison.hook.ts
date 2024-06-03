import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/depense.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';

export const useLivraisonHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setLivraison = reactive({ loading: false, loadingCreate: false });
   const stateLivraisons = ref<any[]>([]);
   stateLivraisons.value = useDataStore().Livraisons;
   const { toast } = useToast();

   const formatLivraisonData = (depenses: any) => {
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


   const storeLivraisons = computed(() => {
      return useDataStore().Livraisons
   })

   //
   const FindLivraisonAll = () => {
      setLivraison.loading = true;
      readData(API_URL.CAISSE_TRANSACTION_LIST)
         .then((data: any) => {
            useDataStore().Livraisons =  formatLivraisonData(data.datas);
            setLivraison.loading = false;
         })
         .catch(() => {
            setLivraison.loading = false;
         });
   };

   //
   const FindLivraisonOne = () => {};

   //
   const CreateLivraison = async(values: any) => {
      setLivraison.loadingCreate = true;
      const DataCreated = await createData(API_URL.CAISSE_TRANSACTION_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setLivraison.loadingCreate = false;
               let Livraisons = useDataStore().Livraisons

               //
               const toAdd: [] = formatLivraisonData([data.data]);
               Livraisons.unshift(...toAdd);
               useDataStore().Livraisons = Livraisons;
               useModalStore().open = false

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setLivraison.loadingCreate = false;
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
   const FindLivraisonUpdate = () => {};

   //
   const FindLivraisonDelete = () => {};

   return {
      FindLivraisonAll,
      FindLivraisonOne,
      CreateLivraison,
      FindLivraisonUpdate,
      FindLivraisonDelete,
      stateLivraisons,
      setLivraison,
      storeLivraisons
   };
};
