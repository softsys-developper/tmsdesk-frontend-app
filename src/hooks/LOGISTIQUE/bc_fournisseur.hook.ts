import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/BCFournisseur.type';
import { useUtilHook } from "@/hooks/utils.hook";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useBCFournisseurHook = () => {
  const { readData } = useApiServices();
  const {} = useUtilHook();
  const setBCFournisseur = reactive({ loading: false, loadingCreate: false });
  const stateBCFournisseurs = ref<any[]>([]);
  stateBCFournisseurs.value = useDataStore().BCFournisseurs;

  const StatusHtml = (name: string, bg: string) => {
    return `<span class="flex  text-center text-sm font-bold max-w-max px-2 py-1 rounded-md justify-center text-white ${bg}" >${name}</span>`;
  };

  const formatBCFournisseurData = (BCFournisseurs: any) => {
    return BCFournisseurs.map((BCFournisseur: any) => ({
      id: BCFournisseur.id,
      numero_bon_de_commande: BCFournisseur.numero_bon_de_commande,
      montant: BCFournisseur.montant,
      date_commande: BCFournisseur.date_commande,
      etat:
        BCFournisseur.etat == 1
          ? StatusHtml("En cours", "bg-orange-500")
          : BCFournisseur.statut == 2
          ? StatusHtml("Valider", "bg-green-500")
          : StatusHtml("Rejeter", "bg-red-500"),
      adresse: BCFournisseur.adresse,
      pays: BCFournisseur.pays,
      site_internet: BCFournisseur.site_internet,
      date_creation: moment(BCFournisseur.created_at).format("DD/MM/YYYY"),
    }));
  };

  const storeBCFournisseurs = computed(() => {
    return useDataStore().BCFournisseurs;
  });

  //
  const FindBCFournisseurAll = () => {
    setBCFournisseur.loading = true;
    readData(API_URL.BC_FOURNISSEUR_LIST)
      .then((data: any) => {
        useDataStore().BCFournisseurs = formatBCFournisseurData(data.datas);
        setBCFournisseur.loading = false;
      })
      .catch(() => {
        setBCFournisseur.loading = false;
      });
  };

  //
  const FindBCFournisseurOne = () => {};

  //
  const CreateBCFournisseur = async (values: any, callback?: any) => {
    setBCFournisseur.loadingCreate = true;
    setService(
      setBCFournisseur,
      useDataStore(),
      "Livraisons",
      formatBCFournisseurData,
      callback()
    ).SetCreate(API_URL.BC_FOURNISSEUR_CREATE, values);
  };

  //
  const FindBCFournisseurUpdate = (id: any, values: any) => {
    setService(
      setBCFournisseur,
      useDataStore(),
      "BCFournisseurs",
      formatBCFournisseurData
    ).SetUpdate(API_URL.BC_FOURNISSEUR_UPDATE, id, values);
  };

  //
  const FindBCFournisseurDelete = (id: any) => {
    setService(
      setBCFournisseur,
      useDataStore(),
      "BCFournisseurs",
      formatBCFournisseurData
    ).SetDelete(API_URL.BC_FOURNISSEUR_REMOVE, id);
  };

  return {
    FindBCFournisseurAll,
    FindBCFournisseurOne,
    CreateBCFournisseur,
    FindBCFournisseurUpdate,
    FindBCFournisseurDelete,
    stateBCFournisseurs,
    setBCFournisseur,
    storeBCFournisseurs,
    formatBCFournisseurData,
  };
};
