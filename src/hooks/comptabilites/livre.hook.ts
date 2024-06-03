import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/depense.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';

export const useLivreHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setLivre = reactive({ loading: false, loadingCreate: false });
   const stateLivres = ref<any[]>([]);
   stateLivres.value = useDataStore().Livres;
   const { toast } = useToast();

   const formatLivreData = (depenses: any) => {
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


   const storeLivres = computed(() => {
      return useDataStore().Livres
   })

   //
   const FindLivreAll = () => {
      setLivre.loading = true;
      readData(API_URL.LIVRE_LIST)
         .then((data: any) => {
            useDataStore().Livres =  formatLivreData(data.datas);
            setLivre.loading = false;
         })
         .catch(() => {
            setLivre.loading = false;
         });
   };

   //
   const FindLivreOne = () => {};

   //
   const CreateLivre = async(values: any) => {
      setLivre.loadingCreate = true;
      const DataCreated = await createData(API_URL.CAISSE_TRANSACTION_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setLivre.loadingCreate = false;
               let Livres = useDataStore().Livres

               //
               const toAdd: [] = formatLivreData([data.data]);
               Livres.unshift(...toAdd);
               useDataStore().Livres = Livres;
               useModalStore().open = false

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setLivre.loadingCreate = false;
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
   const FindLivreUpdate = () => {};

   //
   const FindLivreDelete = () => {};

   return {
      FindLivreAll,
      FindLivreOne,
      CreateLivre,
      FindLivreUpdate,
      FindLivreDelete,
      stateLivres,
      setLivre,
      storeLivres
   };
};
