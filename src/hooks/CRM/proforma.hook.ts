import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Proforma.type';
import { setService } from "@/services/set.services";
import { useModalStore } from "@/stores/modal.store";

export const useProformaHook = () => {
  const { readData } = useApiServices();
  const setProforma = reactive({ loading: false, loadingCreate: false });
  const stateProformas = ref<any[]>([]);
  stateProformas.value = useDataStore().Proformas;

  const StatusHtml = (name: string, bg: string) => {
    return `<span class="text-sm font-bold flex text-white min-w-max max-w-min px-2 py-1 rounded-md text-center ${bg}" >${name}</span>`;
  };

  const formatProformaData = (Proformas: any) => {
    return Proformas.map((Proforma: any) => ({
      id: Proforma.id,
      numero_proforma: Proforma.numero_proforma,
      ref_client: Proforma.ref_client,
      client: Proforma.client?.nom,
      montant_ttc: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'CFA' }).format(
        Proforma.montant_ttc,
      ),
      status:
        Proforma.etat == 1
          ? StatusHtml("En cours", "bg-yellow-400")
          : Proforma.etat == 2
          ? StatusHtml("Gagné", "bg-green-500")
          : Proforma.etat == 4 ?
           StatusHtml("Perdu", "bg-red-500")
           : StatusHtml("Abandonné", "bg-gray-500"),
      date_creation: Proforma.date_creation,
      date_validite: Proforma.date_validite,
    }));
  };

  const storeProformas = computed(() => {
    return useDataStore().Proformas;
  });

  //
  const FindProformaAll = () => {
    setProforma.loading = true;
    console.log(useModalStore().Permissions.map((el:any) => el.name).includes('liste-proformas'))
    readData( useModalStore().Permissions.map((el:any) => el.name).includes('liste-proformas') ?  API_URL.PROFORMA_LIST : API_URL.PROFORMA_COMMERCIAL)
      .then((data: any) => {
        useDataStore().Proformas = formatProformaData(data.datas);
        setProforma.loading = false;
      })
      .catch(() => {
        setProforma.loading = false;
      });
  };

    // 
  
    const FindProformaCommercialAll = () => {
      setProforma.loading = true;
      readData(API_URL.PROFORMA_COMMERCIAL_LIST)
        .then((data: any) => {
          useDataStore().Prospects = formatProformaData(data.datas);
          useDataStore().Update.Prospects = data.datas;
          setProforma.loading = false; 
        })
        .catch(() => {
          setProforma.loading = false;
        });
    };

  //
  const FindProformaOne = () => {};

  //
    //
    const CreateProforma = async (values: any, callback?:any) => {
      setService(
        setProforma,
        useDataStore(),
        'Proformas',
        formatProformaData,
        callback()
      ).SetCreate(API_URL.PROFORMA_CREATE, values);
    };

 
  

  //
  const ProformaUpdate = (id: any, values: any) => {
    setService(
      setProforma,
      useDataStore(),
      "Proformas",
      formatProformaData
    ).SetUpdate(API_URL.PROFORMA_UPDATE, id, values);
  };

  //
  const ProformaDelete = (id: any) => {
    setService(
      setProforma,
      useDataStore(),
      "Proformas",
      formatProformaData
    ).SetDelete(API_URL.PROFORMA_REMOVE, id);
  };

  return {
    FindProformaAll,
    FindProformaOne,
    CreateProforma,
    ProformaUpdate,
    ProformaDelete,
    stateProformas,
    setProforma,
    storeProformas,
    formatProformaData,
    FindProformaCommercialAll
  };
};
