import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const usePaidHook = () => {
  const { readData } = useApiServices();
  const setPaid = reactive({ loading: false, loadingCreate: false });
  const statePaids = ref<any[]>([]);
  statePaids.value = useDataStore().Paids;


  const formatPaidData = (Paids: any) => {
    return Paids.map((Paid: any) => ({
      id: Paid.id,
      fullname: Paid?.employe?.nom,
      montant_paye: Paid.montant_paye,
      date_paiement: Paid.date_paiement,
      designation: Paid.designation,
      
      periode_1: Paid.periode_1,
      mode_paiement: Paid.mode_paiement,
      date_creation: moment(Paid.created_at).format("DD/MM/YYYY"),

      // Les select
      employe: Paid?.employe.id
    }));
  };

  const storePaids = computed(() => {
    return useDataStore().Paids;
  });

  //
  const FindPaidAll = () => {
    setPaid.loading = true;
    readData(API_URL.SALAIRE_PAYMENT_LIST)
      .then((data: any) => {

        const allPaiements = data.datas.flatMap((entry: any) =>
          entry.paiements.map((paiement: any) => ({
             mois: entry.mois,
             ...paiement
          }))
       );

        useDataStore().Paids = formatPaidData(allPaiements);
        setPaid.loading = false;
      })
      .catch(() => {
        setPaid.loading = false;
      });
  };

  //
  const FindPaidOne = () => {};

  //
  const CreatePaid = async (values: any) => {
    setService(
      setPaid,
      useDataStore(),
      'Paids',
      formatPaidData
    ).SetCreate(API_URL.SALAIRE_PAYMENT_CREATE, values);
  };

  //
  const PaidUpdate = (id: any, values: any) => {
    setService(
      setPaid,
      useDataStore(),
      'Paids',
      formatPaidData
    ).SetUpdate(API_URL.SALAIRE_PAYMENT_UPDATE, id, values);
  };

  //
  const PaidDelete = (id: any) => {
    setService(
      setPaid,
      useDataStore(),
      'Paids',
      formatPaidData
    ).SetDelete(API_URL.SALAIRE_PAYMENT_REMOVE, id);
  };

  return {
    FindPaidAll,
    FindPaidOne,
    CreatePaid,
    PaidUpdate,
    PaidDelete,
    statePaids,
    setPaid,
    storePaids,
  };
};
