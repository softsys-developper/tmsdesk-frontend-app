import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Facture.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";

export const useFactureHook = () => {
  const { readData, createData, deleteData, updateData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setFacture = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
  });
  const stateFactures = ref<any[]>([]);
  stateFactures.value = useDataStore().Factures;
  const { toast } = useToast();

  const StatusHtml = (name: string, bg: string) => {
    return `<span class="flex  text-center text-sm font-bold max-w-max px-2 py-1 rounded-md justify-center text-white ${bg}" >${name}</span>`;
  };

  const formatFactureData = (Factures: any) => {
    return Factures.map((Facture: any) => ({
      id: Facture.id,
      numero_facture: Facture.numero_facture,
      // titre: Facture.titre,
      // client: Facture.client?.nom,
      montant_ttc:  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'GNF' }).format(
        Facture.montant_ttc,
      ),
      reste_a_payer: Facture.reste_a_payer,
      status:
        Facture.statut == 1
          ? StatusHtml("En attante", "bg-orange-500")
          : Facture.statut == 2
          ? StatusHtml("Partiellement", "bg-blue-500")
          : StatusHtml("Payer", "bg-green-500"),
          date_emission: Facture.date_emission,
          date_creation: moment(Facture.created_at).format("DD/MM/YYYY"),
    }));
  };
  const storeFactures = computed(() => {
    return useDataStore().Factures;
  });

  //
  const FindFactureAll = () => {
    setFacture.loading = true;
    readData(API_URL.FACTURE_LIST)
      .then((data: any) => {
        useDataStore().Factures = formatFactureData(data.datas);
        setFacture.loading = false;
      })
      .catch(() => {
        setFacture.loading = false;
      });
  };

  //
  const FindFactureOne = () => {};

  //
  const CreateFacture = async (values: any) => {
    setFacture.loadingCreate = true;
    const DataCreated = await createData(API_URL.FACTURE_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setFacture.loadingCreate = false;
          let Factures = useDataStore().Factures;

          //
          const toAdd: [] = formatFactureData([data.data]);
          Factures.unshift(...toAdd);
          useDataStore().Factures = Factures;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setFacture.loadingCreate = false;
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
  const FactureUpdate = (id: any, values: any) => {
    setFacture.loadingCreate = true;
    updateData(API_URL.FACTURE_UPDATE + "/" + id, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setFacture.loadingCreate = false;
          let Factures = useDataStore().Factures;

          //
          const toAdd: [] = formatFactureData([data.data]);
          Factures.unshift(...toAdd);
          useDataStore().Factures = Factures;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setFacture.loadingCreate = false;
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
  const FactureDelete = (id: any) => {
    setFacture.loadingDelete = true;
    deleteData(API_URL.FACTURE_REMOVE + "/" + id)
      .then((data: any) => {
        if (data) {
          setFacture.loadingDelete = false;
          let Factures = useDataStore().Factures;

          //
          const toAdd = Factures.filter((el: any) => el.id != id);
          Factures.unshift(...toAdd);
          useDataStore().Factures = Factures;
          useModalStore().open = false;
          useModalStore().delete = false;

          toast({
            title: "Supprimer",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setFacture.loadingDelete = false;
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
    FindFactureAll,
    FindFactureOne,
    CreateFacture,
    FactureUpdate,
    FactureDelete,
    stateFactures,
    setFacture,
    storeFactures,
  };
};
