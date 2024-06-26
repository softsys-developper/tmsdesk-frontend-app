import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/prime.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const usePrimeHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setPrime = reactive({ loading: false, loadingCreate: false });
  const statePrimes = ref<any[]>([]);
  statePrimes.value = useDataStore().Primes;
  const { toast } = useToast();

  const formatPrimeData = (primes: any) => {
    return primes.map((prime: any, index:any) => ({
      id: index +1,
      libelle: prime.libelle,
      nature: prime.nature,
      date_creation: moment(prime.created_at).format("l") ,
    }));
  };

  const storePrimes = computed(() => {
    return useDataStore().Primes;
  });

  //
  const FindPrimeAll = () => {
    setPrime.loading = true;
    readData(API_URL.PRIME_LIST)
      .then((data: any) => {
        useDataStore().Primes = formatPrimeData(data.datas);
        setPrime.loading = false;
      })
      .catch(() => {
        setPrime.loading = false;
      });
  };

  //
  const FindPrimeOne = () => {};

  //
  const CreatePrime = async (values: any) => {
    setPrime.loadingCreate = true;
    const DataCreated = await createData(API_URL.PRIME_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setPrime.loadingCreate = false;
          let Primes = useDataStore().Primes;

          //
          const toAdd: [] = formatPrimeData([data.data]);
          Primes.unshift(...toAdd);
          useDataStore().Primes = Primes;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setPrime.loadingCreate = false;
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

  const PrimeUpdate = (id: any, values: any) => {
    setService(
      setPrime,
      useDataStore(),
      'Primes',
      formatPrimeData
    ).SetUpdate(API_URL.PRIME_UPDATE, id, values);
  };

  //
  const PrimeDelete = (id: any) => {
    setService(
      setPrime,
      useDataStore(),
      'Primes',
      formatPrimeData
    ).SetDelete(API_URL.PRIME_REMOVE, id);
  };

  return {
    FindPrimeAll,
    FindPrimeOne,
    CreatePrime,
    PrimeUpdate,
    PrimeDelete,
    statePrimes,
    setPrime,
    storePrimes,
  };
};
