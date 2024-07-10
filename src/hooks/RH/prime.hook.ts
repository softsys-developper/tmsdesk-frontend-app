import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/prime.type';
import moment from "moment";
import { setService } from "@/services/set.services";

export const usePrimeHook = () => {
  const { readData } = useApiServices();
  const setPrime = reactive({ loading: false, loadingCreate: false });
  const statePrimes = ref<any[]>([]);
  statePrimes.value = useDataStore().Primes;


  const formatPrimeData = (primes: any) => {
    return primes.map((prime: any) => ({
      id: prime.id,
      libelle: prime.libelle,
      pourcentage_prime: prime.pourcentage + '%',
      date_creation: moment(prime.created_at).format("DD/MM/YYYY") ,
      pourcentage: prime.pourcentage,
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
    setService(
      setPrime,
      useDataStore(),
      'Primes',
      formatPrimeData
    ).SetCreate(API_URL.PRIME_CREATE, values);
    
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
