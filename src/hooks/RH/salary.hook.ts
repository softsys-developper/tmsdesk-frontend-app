import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/salaire.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useSalaireHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setSalaire = reactive({ loading: false, loadingCreate: false });
  const stateSalaires = ref<any[]>([]);
  stateSalaires.value = useDataStore().Salary;
  const { toast } = useToast();

  const formatSalaireData = (salaires: any) => {
    return salaires.map((salaire: any) => ({
      id: salaire.id,
      libelle_salaire: salaire.categorie,
      montant: salaire.montant,
      date_creation: moment(salaire.created_at).format("l") ,
    }));
  };

  const storeSalaires = computed(() => {
    return useDataStore().Salary;
  });

  //
  const FindSalaireAll = () => {
    setSalaire.loading = true;
    readData(API_URL.SALAIRE_LIST)
      .then((data: any) => {
        useDataStore().Salary = formatSalaireData(data.datas);
        setSalaire.loading = false;
      })
      .catch(() => {
        setSalaire.loading = false;
      });
  };

  //
  const FindSalaireOne = () => {};

  //
  const CreateSalaire = async (values: any) => {
    setSalaire.loadingCreate = true;
    const DataCreated = await createData(API_URL.SALAIRE_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setSalaire.loadingCreate = false;
          let Salaires = useDataStore().Salary;

          //
          const toAdd: [] = formatSalaireData([data.data]);
          Salaires.unshift(...toAdd);
          useDataStore().Salary = Salaires;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setSalaire.loadingCreate = false;
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

  const SalaireUpdate = (id: any, values: any) => {
    setService(
      setSalaire,
      useDataStore(),
      'Salaires',
      formatSalaireData
    ).SetUpdate(API_URL.SALAIRE_UPDATE, id, values);
  };

  //
  const SalaireDelete = (id: any) => {
    setService(
      setSalaire,
      useDataStore(),
      'Salaires',
      formatSalaireData
    ).SetDelete(API_URL.SALAIRE_REMOVE, id);
  };

  return {
    FindSalaireAll,
    FindSalaireOne,
    CreateSalaire,
    SalaireUpdate,
    SalaireDelete,
    stateSalaires,
    setSalaire,
    storeSalaires,
  };
};
