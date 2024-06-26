import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Personal.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { useUpdateStore } from "@/stores/update.store";
import { setService } from "@/services/set.services";

export const usePersonalHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setPersonal = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
  });
  const statePersonals = ref<any[]>([]);
  statePersonals.value = useDataStore().Personals;
  const { toast } = useToast();

  // Get Update
  useUpdateStore().UpdateValue = useDataStore().Personals[0];

  const formatPersonalData = (Personals: any) => {
    return Personals.map((Personal: any) => ({
      id: Personal.id,
      nom: Personal.nom,
      prenoms: Personal.prenoms,
      email: Personal.email,
      telephone: Personal.telephone,
      type_contrat: Personal.type_contrat,
      fonction: Personal.fonction,
      // role: Personal.utype,
      date_debut: Personal.date_debut,
      date_creation: moment(Personal.created_at).format("l"),
    }));
  };


  const storePersonals = computed(() => {
    return useDataStore().Personals;
  });

  //
  const FindPersonalAll = () => {
    setPersonal.loading = true;
    readData(API_URL.USER_LIST)
      .then((data: any) => {
        useDataStore().Personals = formatPersonalData(data.datas);
        setPersonal.loading = false;
      })
      .catch(() => {
        setPersonal.loading = false;
      });
  };

  //
  const FindPersonalOne = () => {};

  //
  const CreatePersonal = async (values: any, queryId?: any, route?: any, router?:any) => {
    setPersonal.loadingCreate = true;
    const DataCreated = await createData(API_URL.USER_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setPersonal.loadingCreate = false;
          let Personals = useDataStore().Personals;

          if (!queryId) {
            //
            const toAdd: [] = formatPersonalData([data.data]);
            Personals.unshift(...toAdd);
            useDataStore().Personals = Personals;
            useModalStore().open = false;
          } else {
            const isPersonal: any = useDataStore().Proformas.map((el: any) => {
              console.log(el.id == route.query.id);
              if (el.id == route.query.id) {
                el = formatPersonalData(data.data);
              }
              return {
                ...el,
              };
            });

            useDataStore().Personals = isPersonal;
          }
          router.push({ name: "RH_PERSONAL" });

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setPersonal.loadingCreate = false;
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

  const PersonalUpdate = (id: any, values: any) => {
    setService(
      setPersonal,
      useDataStore(),
      "Personals",
      formatPersonalData
    ).SetUpdate(API_URL.USER_UPDATE, id, values);
  };

  //
  const PersonalDelete = (id: any) => {
    setService(
      setPersonal,
      useDataStore(),
      "Personals",
      formatPersonalData
    ).SetDelete(API_URL.USER_REMOVE, id);
  };

  return {
    FindPersonalAll,
    FindPersonalOne,
    CreatePersonal,
    PersonalUpdate,
    PersonalDelete,
    statePersonals,
    setPersonal,
    storePersonals,
  };
};
