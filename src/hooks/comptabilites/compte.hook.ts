

import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './../../stores/data.store';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';

export const useCompteHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setCompte = reactive({ loading: false, loadingCreate: false });
   const stateComptes = ref<any[]>([]);
   stateComptes.value = useDataStore().Comptes;
   const { toast } = useToast();


   const storeComptes = computed(() => {
    return useDataStore().Comptes
   })

   const formatCompteData = (comptes: any) => {
      return comptes.map((compte: any) => ({
         id: compte.id,
         nom: compte.nom,
         solde: compte.solde
      }));
   };

   const FindCompteAll = () => {
      setCompte.loading = true;
      readData(API_URL.BANQUE_LIST)
         .then((data: any) => {
            
            useDataStore().Comptes = formatCompteData(data.datas);
            setCompte.loading = false;
         })
         .catch(() => {
            setCompte.loading = false;
         });
   };

   const CreateCompte = async(values: any) => {
      setCompte.loadingCreate = true;
      const DataCreated = await createData(API_URL.BANQUE_CREATE, values)
         .then((data: any) => {
            if (data) {
                
               EmptyFields(values); // Vider les champs
               setCompte.loadingCreate = false;
               let Comptes = useDataStore().Comptes;

               const toAdd: [] = formatCompteData([data.data]);
               Comptes.unshift(...toAdd);
               useDataStore().Comptes = Comptes;
               useModalStore().open = false
               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setCompte.loadingCreate = false;
            console.log(err)
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
                     title: 'Erreur',
                     variant: "destructive",
                     description: err.response.data.message,
                  });
               }
            }
         });

         return {data: DataCreated}
   };

   return {
      FindCompteAll,
      CreateCompte,
      stateComptes,
      setCompte,
      storeComptes
   };
};
