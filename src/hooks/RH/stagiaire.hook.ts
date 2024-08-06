import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Stagiaire.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { useUpdateStore } from "@/stores/update.store";
import { setService } from "@/services/set.services";

export const useStagiaireHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setStagiaire = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
  });
  const stateStagiaires = ref<any[]>([]);
  stateStagiaires.value = useDataStore().Stagiaires;
  const { toast } = useToast();

  // Get Update
  useUpdateStore().UpdateValue = useDataStore().Stagiaires[0];

  const formatStagiaireData = (Stagiaires: any) => {
    return Stagiaires.map((Stagiaire: any) => ({
      id: Stagiaire.id,
      matricule: Stagiaire.matricule,
      image: `<img src="${
        Stagiaire.photo
          ? `https://apps.tmsdesk.com/employes/photos/${Stagiaire.photo}`
          : `https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-glyph-black-icon-png-image_691589.jpg`
      }"class="size-12 rounded-full " alt=""> `,
      nom: Stagiaire.nom,
      prenoms: Stagiaire.prenoms,
      email: Stagiaire.email,
      telephone: Stagiaire.telephone,
      type_contrat: Stagiaire.type_contrat,
      fonction: Stagiaire.fonction,
      // role: Stagiaire.utype,
      date_debut: Stagiaire.date_debut,
      date_creation: moment(Stagiaire.created_at).format("l"),

      //
      date_fin: Stagiaire.date_fin,
      salaire: Stagiaire.salaire_id,
      service: Stagiaire.service_id,
      solde_conge_annuel: Stagiaire.solde_conge_annuel,
    }));
  };

  const storeStagiaires = computed(() => {
    return useDataStore().Stagiaires;
  });

  //
  const FindStagiaireAll = () => {
    setStagiaire.loading = true;
    readData(API_URL.USER_LIST)
      .then((data: any) => {
        useDataStore().Stagiaires = formatStagiaireData(data.datas);
        setStagiaire.loading = false;
      })
      .catch(() => {
        setStagiaire.loading = false;
      });
  };

  //
  const FindStagiaireOne = () => {};

  //
  const CreateStagiaire = async (
    values: any,
    queryId?: any,
    route?: any,
    router?: any
  ) => {
    setStagiaire.loadingCreate = true;
    createData(API_URL.USER_CREATE, values)
      .then((data: any) => {
        EmptyFields(values); // Vider les champs
        setStagiaire.loadingCreate = false;
        let Stagiaires = useDataStore().Stagiaires;

        if (!queryId) {
          //
          const toAdd: [] = formatStagiaireData([data.data]);
          Stagiaires.unshift(...toAdd);
          useDataStore().Stagiaires = Stagiaires;
          useModalStore().open = false;
          toast({
            title: "Enregistré",
            description: data.message,
          });
          router.push({ name: "RH_PERSONAL" });
        } else {
          const isStagiaire: any = useDataStore().Proformas.map((el: any) => {
            console.log(el.id == route.query.id);
            if (el.id == route.query.id) {
              el = formatStagiaireData(data.data);
            }
            return {
              ...el,
            };
          });

          useDataStore().Stagiaires = isStagiaire;
          toast({
            title: "Enregistré",
            description: data.message,
          });
          router.push({ name: "RH_PERSONAL" });
        }
      })
      .catch((err) => {
        setStagiaire.loadingCreate = false;
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

  const StagiaireUpdate = (id: any, values: any, callback: any) => {
    setService(
      setStagiaire,
      useDataStore(),
      "Stagiaires",
      formatStagiaireData,
      callback
    ).SetUpdate(API_URL.USER_UPDATE, id, values);
  };

  //
  const StagiaireDelete = (id: any) => {
    setService(
      setStagiaire,
      useDataStore(),
      "Stagiaires",
      formatStagiaireData
    ).SetDelete(API_URL.USER_REMOVE, id);
  };

  return {
    FindStagiaireAll,
    FindStagiaireOne,
    CreateStagiaire,
    StagiaireUpdate,
    StagiaireDelete,
    stateStagiaires,
    setStagiaire,
    storeStagiaires,
  };
};
