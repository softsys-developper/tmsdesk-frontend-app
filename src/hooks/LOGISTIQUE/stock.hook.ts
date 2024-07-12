import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { computed, reactive, ref } from 'vue';
import { useDataStore } from '../../stores/data.store';
// import { LIST_DEPENSE } from '@/types/Stock.type';
import { useUtilHook } from '@/hooks/utils.hook';
import { useModalStore } from '@/stores/modal.store';
import moment from 'moment';
import { setService } from '@/services/set.services';

export const useStockHook = () => {
   const { readData, createData } = useApiServices();
   const { EmptyFields, StatusHtml } = useUtilHook();
   const setStock = reactive({ loading: false, loadingCreate: false });
   const stateStocks = ref<any[]>([]);
   stateStocks.value = useDataStore().Stocks;
   const { toast } = useToast();

   const formatStockData = (Stocks: any) => {
      return Stocks.map((Stock: any) => ({
         id: Stock.id,
         reference: Stock.reference,
         prix_unitaire: Stock.prix_unitaire,
         quantite: Stock.quantite,
         status:  StatusHtml('En stock', 'bg-green-500'),
         date_creation: moment(Stock.created_at).format("DD/MM/YYYY") ,
      }));
   };


   const storeStocks = computed(() => {
      return useDataStore().Stocks
   })

   //
   const FindStockAll = () => {
      setStock.loading = true;
      readData(API_URL.STOCK_LIST)
         .then((data: any) => {
            useDataStore().Stocks =  formatStockData(data.datas);
            setStock.loading = false;
         })
         .catch(() => {
            setStock.loading = false;
         });
   };

   //
   const FindStockOne = () => {};

   //
   const CreateStock = async(values: any, callback:any) => {
      setStock.loadingCreate = true;
      const DataCreated = await createData(API_URL.STOCK_CREATE, values)
         .then((data: any) => {
            if (data) {
               EmptyFields(values); // Vider les champs
               setStock.loadingCreate = false;
               let Stocks = useDataStore().Stocks

               //
               const toAdd: [] = formatStockData([data.data]);
               Stocks.unshift(...toAdd);
               useDataStore().Stocks = Stocks;
               useModalStore().open = false
               callback()

               toast({
                  title: 'Enregistré',
                  description: data.message,
               });
            }
         })
         .catch((err) => {
            setStock.loadingCreate = false;
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

   const StockUpdate = (id: any, values: any) => {
      setService(
        setStock,
        useDataStore(),
        'Stocks',
        formatStockData
      ).SetUpdate(API_URL.STOCK_UPDATE, id, values);
    };
  
    //
    const StockDelete = (id: any) => {
      setService(
        setStock,
        useDataStore(),
        'Stocks',
        formatStockData
      ).SetDelete(API_URL.STOCK_REMOVE_STOCK, id);
    };
  
    return {
      FindStockAll,
      FindStockOne,
      CreateStock,
      StockUpdate,
      StockDelete,
      stateStocks,
      setStock,
      storeStocks,
    };
};
