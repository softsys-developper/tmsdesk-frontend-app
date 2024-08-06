import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Fournisseur.type';
import moment from "moment";
import { setService } from "@/services/set.services";

export const useFournisseurHook = () => {
  const { readData } = useApiServices();
  const setFournisseur = reactive({ loading: false, loadingCreate: false });
  const stateFournisseurs = ref<any[]>([]);
  stateFournisseurs.value = useDataStore().Fournisseurs;

  const formatFournisseurData = (Fournisseurs: any) => {
    return Fournisseurs.map((Fournisseur: any) => ({
      id: Fournisseur.id,
      nom: Fournisseur.nom,
      email: Fournisseur.email,
      telephone: Fournisseur.telephone,
      adresse: Fournisseur.adresse,
      pays: Fournisseur.pays,
      site_internet: Fournisseur.site_internet,
      date_creation: moment(Fournisseur.created_at).format("DD/MM/YYYY"),
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
    setService(
      setFournisseur,
      useDataStore(),
      'Fournisseurs',
      formatFournisseurData
    ).SetCreate(API_URL.FOURNISSEURS_CREATE, values);
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
