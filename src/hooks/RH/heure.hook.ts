import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/heure.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import { setService } from "@/services/set.services";

export const useHeureHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setHeure = reactive({ loading: false, loadingCreate: false });
  const stateHeures = ref<any[]>([]);
  stateHeures.value = useDataStore().Heures;
  const { toast } = useToast();

  const formatHeureData = (heures: any) => {
    return heures.map((heure: any) => ({
      libelle: heure.libelle,
      montant: heure.montant,
    }));
  };

  const storeHeures = computed(() => {
    return useDataStore().Heures;
  });

  //
  const FindHeureAll = () => {
    setHeure.loading = true;
    readData(API_URL.HEURE_LIST)
      .then((data: any) => {
        useDataStore().Heures = formatHeureData(data.datas);
        setHeure.loading = false;
      })
      .catch(() => {
        setHeure.loading = false;
      });
  };

  //
  const FindHeureOne = () => {};

  //
  const CreateHeure = async (values: any) => {
    setHeure.loadingCreate = true;
    const DataCreated = await createData(API_URL.HEURE_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setHeure.loadingCreate = false;
          let Heures = useDataStore().Heures;

          //
          const toAdd: [] = formatHeureData([data.data]);
          Heures.unshift(...toAdd);
          useDataStore().Heures = Heures;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setHeure.loadingCreate = false;
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

  const HeureUpdate = (id: any, values: any) => {
    setService(
      setHeure,
      useDataStore(),
      'Heures',
      formatHeureData
    ).SetUpdate(API_URL.CLIENT_UPDATE, id, values);
  };

  //
  const HeureDelete = (id: any) => {
    setService(
      setHeure,
      useDataStore(),
      'Heures',
      formatHeureData
    ).SetDelete(API_URL.CLIENT_REMOVE, id);
  };

  return {
    FindHeureAll,
    FindHeureOne,
    CreateHeure,
    HeureUpdate,
    HeureDelete,
    stateHeures,
    setHeure,
    storeHeures,
  };
};
