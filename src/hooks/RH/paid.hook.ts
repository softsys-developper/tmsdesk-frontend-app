import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Paid.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const usePaidHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setPaid = reactive({ loading: false, loadingCreate: false });
  const statePaids = ref<any[]>([]);
  statePaids.value = useDataStore().Paids;
  const { toast } = useToast();

  const formatPaidData = (Paids: any) => {
    return Paids.map((Paid: any) => ({
      id: Paid.id,
      fullname: Paid?.user?.nom,
      montant_paye: Paid.montant_paye,
      date_paiement: Paid.date_paiement,
      
      periode_1: Paid.periode_1,
      periode_2: Paid.periode_2,
      mode_paiement: Paid.mode_paiement,
      date_creation: moment(Paid.created_at).format("l"),
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
        useDataStore().Paids = formatPaidData(data.datas);
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
    setPaid.loadingCreate = true;
    const DataCreated = await createData(API_URL.SALAIRE_PAYMENT_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setPaid.loadingCreate = false;
          let Paids = useDataStore().Paids;

          //
          const toAdd: [] = formatPaidData([data.data]);
          Paids.unshift(...toAdd);
          useDataStore().Paids = Paids;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setPaid.loadingCreate = false;
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
