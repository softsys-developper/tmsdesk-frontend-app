import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Livraison.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { useUpdateStore } from "@/stores/update.store";

export const useLivraisonHook = () => {
  const { readData, createData, deleteData, updateData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setLivraison = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
  });
  const stateLivraisons = ref<any[]>([]);
  stateLivraisons.value = useDataStore().Livraisons;
  const { toast } = useToast();

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

  //
  const CreateLivraison = async (values: any) => {
    setLivraison.loadingCreate = true;
    const DataCreated = await createData(API_URL.LIVRAISON_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setLivraison.loadingCreate = false;
          let Livraisons = useDataStore().Livraisons;

          //
          const toAdd: [] = formatLivraisonData([data.data]);
          Livraisons.unshift(...toAdd);
          useDataStore().Livraisons = Livraisons;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
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
              title: "error",
              variant: "destructive",
              description: err.response.data.message,
            });
          }
        }
      });

    return { data: DataCreated };
  };

  // Update
  const LivraisonUpdate = (id: any, values: any) => {
    setLivraison.loadingCreate = true;
    updateData(API_URL.USER_UPDATE + "/" + id, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setLivraison.loadingCreate = false;
          let Livraisons = useDataStore().Livraisons;

          //
          const toAdd: [] = formatLivraisonData([data.data]);
          Livraisons.unshift(...toAdd);
          useDataStore().Livraisons = Livraisons;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
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
              title: "error",
              variant: "destructive",
              description: err.response.data.message,
            });
          }
        }
      });
  };

  //
  const LivraisonDelete = (id: any) => {
    setLivraison.loadingDelete = true;
    deleteData(API_URL.USER_REMOVE + "/" + id)
      .then((data: any) => {
        if (data) {
          setLivraison.loadingDelete = false;
          let Livraisons = useDataStore().Livraisons;

          //
          const toAdd = Livraisons.filter((el: any) => el.id != id);
          Livraisons.unshift(...toAdd);
          useDataStore().Livraisons = Livraisons;
          useModalStore().open = false;
          useModalStore().delete = false;

          toast({
            title: "Supprimer",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setLivraison.loadingDelete = false;
        useModalStore().delete = false;
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
              title: "error",
              variant: "destructive",
              description: err.response.data.message,
            });
          }
        }
      });
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
