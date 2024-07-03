import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Livraison.type';
import moment from "moment";
import { useUpdateStore } from "@/stores/update.store";
import { setService } from "@/services/set.services";

export const useLivraisonHook = () => {
  const { readData } = useApiServices();
  const setLivraison = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
  });
  const stateLivraisons = ref<any[]>([]);
  stateLivraisons.value = useDataStore().Livraisons;

  // Get Update
  useUpdateStore().UpdateValue = useDataStore().Livraisons[0];

  const formatLivraisonData = (Livraisons: any) => {
    return Livraisons.map((Livraison: any) => ({
      id: Livraison.id,
      reference: Livraison.reference,
      site_livraison: Livraison.site_livraison,
      date_depart: Livraison.date_depart,
      date_retour: Livraison.date_retour,
      status: `<p class="' py-1  capitalize min-w-max rounded-md px-2 flex justify-center font-bold text-xs text-white ' ${
        Livraison.status !== 'en cours' ? 'bg-green-500' : 'bg-blue-400'
         }">${Livraison.status}</p>`,
      produit_livres: Livraison.produit_livres.length,
      date_livraison: moment(Livraison.created_at).format("DD/MM/YYYY"),
    }));
  };
  const storeLivraisons = computed(() => {
    return useDataStore().Livraisons;
  });

  //
  const FindLivraisonAll = () => {
    setLivraison.loading = true;
    readData(API_URL.LIVRAISON_LIST)
      .then((data: any) => {
        useDataStore().Livraisons = formatLivraisonData(data.datas);
        setLivraison.loading = false;
      })
      .catch(() => {
        setLivraison.loading = false;
      });
  };

  //
  const FindLivraisonOne = () => {};

  const CreateLivraison = async(values: any, callback?:any) => {
    setService(
       setLivraison,
       useDataStore(),
       'Livraisons',
       formatLivraisonData,
       callback()
     ).SetCreate(API_URL.LIVRAISON_CREATE, values);
 };

  //
  const LivraisonUpdate = (id: any, values: any, callback?:any) => {
    setService(
      setLivraison,
      useDataStore(),
      'Livraisons',
      formatLivraisonData,
      callback()
    ).SetUpdate(API_URL.LIVRAISON_UPDATE, id, values);
  };
 
  //
  const LivraisonDelete = (id: any) => {
    setService(
      setLivraison,
      useDataStore(),
      'Livraisons',
      formatLivraisonData
    ).SetDelete(API_URL.LIVRAISON_REMOVE, id);
  };
 

  return {
    FindLivraisonAll,
    FindLivraisonOne,
    CreateLivraison,
    LivraisonUpdate,
    LivraisonDelete,
    stateLivraisons,
    setLivraison,
    storeLivraisons,
    formatLivraisonData
    
  };
};
