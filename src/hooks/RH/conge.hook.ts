import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Conge.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";

export const useCongeHook = () => {
  const { readData, createData, deleteData, updateData } = useApiServices();
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

  const Personals = (Conge:any):any => useDataStore().Personals.find((els:any) => els.id == Conge.user_id)

  const formatCongeData = (Conges: any) => {
    return Conges.map((Conge: any) => ({
      id: Conge.id,
      libelle: Conge.libelle,
               employe: Personals(Conge)?.name,
               type: Conge.type,
               motif: Conge.motif,
               date_depart: Conge.date_depart,
               date_retour: Conge.date_retour,
      date_creation: moment(Conge.created_at).format("DD/MM/YYYY"),
    }));
  };
  const storeConges = computed(() => {
    return useDataStore().Conges;
  });

  //
  const FindCongeAll = () => {
    setConge.loading = true;
    readData(API_URL.USER_LIST)
      .then((data: any) => {
        useDataStore().Conges = formatCongeData(data.datas);
        setConge.loading = false;
      })
      .catch(() => {
        setConge.loading = false;
      });
  };

  //
  const FindCongeOne = () => {};

  //
  const CreateConge = async (values: any) => {
    setConge.loadingCreate = true;
    const DataCreated = await createData(API_URL.USER_CREATE, values)
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

  // Update
  const CongeUpdate = (id: any, values: any) => {
    setConge.loadingCreate = true;
    updateData(API_URL.USER_UPDATE + "/" + id, values)
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
  };

  //
  const CongeDelete = (id: any) => {
    setConge.loadingDelete = true;
    deleteData(API_URL.USER_REMOVE + "/" + id)
      .then((data: any) => {
        if (data) {
          setConge.loadingDelete = false;
          let Conges = useDataStore().Conges;

          //
          const toAdd = Conges.filter((el: any) => el.id != id);
          Conges.unshift(...toAdd);
          useDataStore().Conges = Conges;
          useModalStore().open = false;
          useModalStore().delete = false;

          toast({
            title: "Supprimer",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setConge.loadingDelete = false;
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
