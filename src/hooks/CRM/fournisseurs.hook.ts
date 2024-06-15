import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Fournisseur.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useFournisseurHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setFournisseur = reactive({ loading: false, loadingCreate: false });
  const stateFournisseurs = ref<any[]>([]);
  stateFournisseurs.value = useDataStore().Fournisseurs;
  const { toast } = useToast();

  const formatFournisseurData = (Fournisseurs: any) => {
    return Fournisseurs.map((Fournisseur: any, index: number) => ({
      id: index + 1,
      nom: Fournisseur.nom,
      email: Fournisseur.email,
      telephone: Fournisseur.telephone,
      adresse: Fournisseur.adresse,
      date_creation: moment(Fournisseur.created_at).format("l"),
    }));
  };

  const storeFournisseurs = computed(() => {
    return useDataStore().Fournisseurs;
  });

  //
  const FindFournisseurAll = () => {
    setFournisseur.loading = true;
    readData(API_URL.FOURNISSEURS_LIST)
      .then((data: any) => {
        useDataStore().Fournisseurs = formatFournisseurData(data.datas);
        setFournisseur.loading = false;
      })
      .catch(() => {
        setFournisseur.loading = false;
      });
  };

  //
  const FindFournisseurOne = () => {};

  //
  const CreateFournisseur = async (values: any) => {
    setFournisseur.loadingCreate = true;
    const DataCreated = await createData(API_URL.FOURNISSEURS_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setFournisseur.loadingCreate = false;
          let Fournisseurs = useDataStore().Fournisseurs;

          //
          const toAdd: [] = formatFournisseurData([data.data]);
          Fournisseurs.unshift(...toAdd);
          useDataStore().Fournisseurs = Fournisseurs;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setFournisseur.loadingCreate = false;
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

  //
  const FindFournisseurUpdate = (id: any, values: any) => {
    setService(
      setFournisseur,
      useDataStore(),
      'Fournisseurs',
      formatFournisseurData
    ).SetUpdate(API_URL.FOURNISSEURS_UPDATE, id, values);
  };

  //
  const FindFournisseurDelete = (id: any) => {
    setService(
      setFournisseur,
      useDataStore(),
      'Fournisseurs',
      formatFournisseurData
    ).SetDelete(API_URL.FOURNISSEURS_REMOVE, id);
  };

  return {
    FindFournisseurAll,
    FindFournisseurOne,
    CreateFournisseur,
    FindFournisseurUpdate,
    FindFournisseurDelete,
    stateFournisseurs,
    setFournisseur,
    storeFournisseurs,
  };
};
