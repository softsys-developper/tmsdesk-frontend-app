import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from './../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/Partner.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';
import moment from 'moment';

export const usePartnerHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields } = useUtilHook();
   const setPartner = reactive({ loading: false, loadingCreate: false });
   const statePartners = ref<any[]>([]);
   statePartners.value = useDataStore().Partners;
   const { toast } = useToast();

   const formatPartnerData = (Partners: any) => {
      return Partners.map((Partner: any, index: number) => ({
         id: index  + 1,
         nom: Partner.nom,
         email: Partner.email,
         telephone: Partner.telephone,
         adresse: Partner.adresse,
         date_creation: moment(Partner.created_at).format("l") ,
      }));
   };


   const storePartners = computed(() => {
      return useDataStore().Partners
   })

   //
   const FindPartnerAll = () => {
      setPartner.loading = true;
      readData(API_URL.PARTNER_LIST)
         .then((data: any) => {
            useDataStore().Partners =  formatPartnerData(data.datas);
            setPartner.loading = false;
         })
         .catch(() => {
            setPartner.loading = false;
         });
   };

   //
   const FindPartnerOne = () => {};

   //
   const CreatePartner = async(values: any) => {
      setPartner.loadingCreate = true;
      const DataCreated = await createData(API_URL.PARTNER_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setPartner.loadingCreate = false;
               let Partners = useDataStore().Partners

               //
               const toAdd: [] = formatPartnerData([data.data]);
               Partners.unshift(...toAdd);
               useDataStore().Partners = Partners;
               useModalStore().open = false

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setPartner.loadingCreate = false;
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
   const FindPartnerUpdate = () => {};

   //
   const FindPartnerDelete = () => {};

   return {
      FindPartnerAll,
      FindPartnerOne,
      CreatePartner,
      FindPartnerUpdate,
      FindPartnerDelete,
      statePartners,
      setPartner,
      storePartners
   };
};
