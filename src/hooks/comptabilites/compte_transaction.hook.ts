import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import { setService } from "@/services/set.services";
import moment from "moment";

export const useCompte_transactionHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setCompte_transaction = reactive({
    loading: false,
    loadingCreate: false,
  });
  const stateCompte_transactions = ref<any[]>([]);
  stateCompte_transactions.value = useDataStore().Compte_transactions;
  const { toast } = useToast();

  const storeCompte_transactions = computed(() => {
    return useDataStore().Compte_transactions;
  });

  const IsTypePaiments = (compte_transaction: any) => {
    let pay: any;
    const ind: any = [];
    Object.keys(compte_transaction).forEach((el) => {
      el.includes("paiement_") ? ind.push(el) : null;
      compte_transaction[el] != null
        ? (pay =
            el.split("-").length != 1 ? el.split("-")[1] : el.split("-")[0])
        : null;
    });
    return pay;
  };

  const formatCompte_transactionData = (compte_transactions: any) => {
    return compte_transactions.map((compte_transaction: any) => ({
      id: compte_transaction.id,
      banque: compte_transaction.banque?.nom,
      montant: compte_transaction.montant,
      type_transaction: `<p class="' py-1  capitalize max-w-min rounded-md px-4 flex justify-center font-bold text-xs text-white ' ${
        compte_transaction.type_transaction !== "entree"
          ? "bg-red-500"
          : "bg-green-500"
      }">${compte_transaction.type_transaction}</p>`,
      type_paiement: IsTypePaiments(compte_transaction),
      date_creation: moment(compte_transaction.created_at).format("DD/MM/YYYY"),
    }));
  };

  const FindCompte_transactionAll = () => {
    setCompte_transaction.loading = true;
    readData(API_URL.BANQUE_TRANSACTION_LIST)
      .then((data: any) => {
        useDataStore().Compte_transactions = formatCompte_transactionData(
          data.datas
        );
        setCompte_transaction.loading = false;
      })
      .catch(() => {
        setCompte_transaction.loading = false;
      });
  };

  const CreateCompte_transaction = async (values: any) => {
    setCompte_transaction.loadingCreate = true;
    const DataCreated = await createData(
      API_URL.BANQUE_TRANSACTION_CREATE,
      values
    )
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setCompte_transaction.loadingCreate = false;
          let Compte_transactions = useDataStore().Compte_transactions;

          const toAdd: [] = formatCompte_transactionData([data.data]);
          Compte_transactions.unshift(...toAdd);
          useDataStore().Compte_transactions = Compte_transactions;
          useModalStore().open = false;
          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setCompte_transaction.loadingCreate = false;
        console.log(err);
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
              title: "Erreur",
              variant: "destructive",
              description: err.response.data.message,
            });
          }
        }
      });

    return { data: DataCreated };
  };

  //
  const Compte_transactionUpdate = (id: any, values: any) => {
    setService(
      setCompte_transaction,
      useDataStore(),
      "Compte_transactions",
      formatCompte_transactionData
    ).SetUpdate(API_URL.BANQUE_TRANSACTION_UPDATE, id, values);
  };

  //
  const Compte_transactionDelete = (id: any) => {
    setService(
      setCompte_transaction,
      useDataStore(),
      "Compte_transactions",
      formatCompte_transactionData
    ).SetDelete(API_URL.BANQUE_TRANSACTION_REMOVE, id);
  };

  return {
    FindCompte_transactionAll,
    CreateCompte_transaction,
    Compte_transactionUpdate,
    Compte_transactionDelete,
    stateCompte_transactions,
    setCompte_transaction,
    storeCompte_transactions,
  };
};
