import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Conge.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useCongeHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setConge = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
  });
  const stateConges = ref<any[]>([]);
  stateConges.value = useDataStore().Conges;
  const { toast } = useToast();



  const formatCongeData = (Conges: any) => {
    return Conges.map((Conge: any) => ({
      id: Conge.id,
      t_employe: Conge.employe?.nom,
      type: Conge.type,
      motif: Conge.motif,
      date_depart: Conge.date_depart,
      date_retour: Conge.date_retour,
      nombre_jour: Conge.nombre_jour,
      solde_conge_annuel:  Conge.employe?.solde_conge_annuel,
      remarque: Conge.remarques,
      date_creation: moment(Conge.created_at).format("l"),

      // Les champs select
      employe: Conge.employe.id
    }));
  };
  const storeConges = computed(() => {
    return useDataStore().Conges;
  });

  //
  const FindCongeAll = () => {
    setConge.loading = true;
    readData(API_URL.CONGE_LIST)
      .then((data: any) => {
        useDataStore().Conges = formatCongeData(data.datas);
        setConge.loading = false;
      })
      .catch(() => {
        setConge.loading = false;
      });
  };

  //
  const FindCongeOne = () => { };

  //
  const CreateConge = async (values: any) => {
    setConge.loadingCreate = true;
    const DataCreated = await createData(API_URL.CONGE_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setConge.loadingCreate = false;
          let Conges = useDataStore().Conges;

          //
          const toAdd: [] = formatCongeData([data.data]);
          Conges.unshift(...toAdd);
          useDataStore().Conges = Conges;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setConge.loadingCreate = false;
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

  const CongeUpdate = (id: any, values: any) => {
    setService(
      setConge,
      useDataStore(),
      'Conges',
      formatCongeData
    ).SetUpdate(API_URL.CONGE_UPDATE, id, values);
  };

  //
  const CongeDelete = (id: any) => {
    setService(
      setConge,
      useDataStore(),
      'Conges',
      formatCongeData
    ).SetDelete(API_URL.CONGE_REMOVE, id);
  };

  return {
    FindCongeAll,
    FindCongeOne,
    CreateConge,
    CongeUpdate,
    CongeDelete,
    stateConges,
    setConge,
    storeConges,
  };
};
