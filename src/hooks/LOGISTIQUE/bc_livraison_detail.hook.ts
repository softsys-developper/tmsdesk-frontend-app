import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/BCLivraisonDetail.type';
import { useUtilHook } from "@/hooks/utils.hook";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useBCLivraisonDetailHook = () => {
  const { readData } = useApiServices();
  const {} = useUtilHook();
  const setBCLivraisonDetail = reactive({
    loading: false,
    loadingCreate: false,
  });
  const stateBCLivraisonDetails = ref<any[]>([]);
  stateBCLivraisonDetails.value = useDataStore().BCLivraisonDetails;

  const StatusHtml = (name: string, bg: string) => {
    return `<span class="flex  text-center text-sm font-bold max-w-max px-2 py-1 rounded-md justify-center text-white ${bg}" >${name}</span>`;
  };

  const formatBCLivraisonDetailData = (BCLivraisonDetails: any) => {
    return BCLivraisonDetails.map((BCLivraisonDetail: any) => ({
      id: BCLivraisonDetail.id,
      numero_bon_de_commande: BCLivraisonDetail.numero_bon_de_commande,
      montant: BCLivraisonDetail.montant,
      date_commande: BCLivraisonDetail.date_commande,
      etat:
        BCLivraisonDetail.etat == 1
          ? StatusHtml("En cours", "bg-orange-500")
          : BCLivraisonDetail.statut == 2
          ? StatusHtml("Valider", "bg-green-500")
          : StatusHtml("Rejeter", "bg-red-500"),
      adresse: BCLivraisonDetail.adresse,
      pays: BCLivraisonDetail.pays,
      site_internet: BCLivraisonDetail.site_internet,
      // numero_bon_de_commande: '',
      // site_livraison: ''
      // agent_livraison: ,
      // chauffeu: ,
      // date_livraison: ,
      // date_retour
      date_creation: moment(BCLivraisonDetail.created_at).format("DD/MM/YYYY"),
    }));
  };

  const storeBCLivraisonDetails = computed(() => {
    return useDataStore().BCLivraisonDetails;
  });

  //
  const FindBCLivraisonDetailAll = () => {
    setBCLivraisonDetail.loading = true;
    readData(API_URL.LIVRAISON_DETAIL_LIST)
      .then((data: any) => {
        useDataStore().BCLivraisonDetails = formatBCLivraisonDetailData(
          data.datas
        );
        setBCLivraisonDetail.loading = false;
      })
      .catch(() => {
        setBCLivraisonDetail.loading = false;
      });
  };

  //
  const FindBCLivraisonDetailOne = (id: any) => {
    setBCLivraisonDetail.loadingCreate = true;
    setService(
      setBCLivraisonDetail,
      useDataStore(),
      "BCLivraisonDetails",
      formatBCLivraisonDetailData
    ).SetShow(API_URL.LIVRAISON_DETAIL_LIST, id);
  };

  //
  const CreateBCLivraisonDetail = async (values: any, callback?: any) => {
    setBCLivraisonDetail.loadingCreate = true;
    setService(
      setBCLivraisonDetail,
      useDataStore(),
      "BCLivraisonDetails",
      formatBCLivraisonDetailData,
      callback()
    ).SetCreate(API_URL.LIVRAISON_DETAIL_LIST, values);
  };

  //
  const FindBCLivraisonDetailUpdate = (id: any, values: any) => {
    setService(
      setBCLivraisonDetail,
      useDataStore(),
      "BCLivraisonDetails",
      formatBCLivraisonDetailData
    ).SetUpdate(API_URL.BC_FOURNISSEUR_UPDATE, id, values);
  };

  //
  const FindBCLivraisonDetailDelete = (id: any) => {
    setService(
      setBCLivraisonDetail,
      useDataStore(),
      "BCLivraisonDetails",
      formatBCLivraisonDetailData
    ).SetDelete(API_URL.BC_FOURNISSEUR_REMOVE, id);
  };

  return {
    FindBCLivraisonDetailAll,
    FindBCLivraisonDetailOne,
    CreateBCLivraisonDetail,
    FindBCLivraisonDetailUpdate,
    FindBCLivraisonDetailDelete,
    stateBCLivraisonDetails,
    setBCLivraisonDetail,
    storeBCLivraisonDetails,
    formatBCLivraisonDetailData,
  };
};
