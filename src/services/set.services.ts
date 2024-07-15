import { useUtilHook } from "@/hooks/utils.hook";
import { useApiServices } from "./api.services";
import { useModalStore } from "@/stores/modal.store";
import { useToast } from "@/components/ui/toast/use-toast";
import { useUpdateStore } from "@/stores/update.store";
const { toast } = useToast();

const { updateData, deleteData, createData, showData } = useApiServices();
// API_URL.PROSPECT_UPDATE + '/' + id, values

const { EmptyFields, ServerError } = useUtilHook();

export const setService = (
  loading: any,
  Store: any,
  LabelStore: string,
  formatData: any,
  callback?: any
) => {

  const SetShow = async (URL: string, id:any) => {
    try {
    loading.loading = true;
    const data = await showData(URL, id);

    if (data) {

      loading.loading = false;
      let ISDATA: any = Store[LabelStore];

      //
      const toAdd = formatData(data.datas);
       ISDATA?.unshift(...toAdd);
      Store[LabelStore] = ISDATA;
    }

    } catch (err) {
      loading.loading = false;
      ServerError(err, toast);
    }
  };


  const SetCreate = async (URL: string, values: any) => {
    try {
    loading.loadingCreate = true;
    const data = await createData(URL, values);

    if (data) {
      EmptyFields(values); // Vider les champs

      loading.loadingCreate = false;
      let ISDATA: any = Store[LabelStore];

      toast({
        title: "Enregistré",
        description: data.message,
      });

      useModalStore().open = false;
      useUpdateStore().isUpdate.id = null;
      useUpdateStore().isUpdate.is = false;


      //
      const toAdd = formatData([data.data]);
       ISDATA?.unshift(...toAdd);
      Store[LabelStore] = ISDATA;
      callback();
    }

    } catch (err) {
      loading.loadingCreate = false;
      ServerError(err, toast);
    }
  };

  // Update
  const SetUpdate = (URL: string, id: any, values: any) => {
    loading.loadingCreate = true;
    updateData(URL + "/" + id, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          loading.loadingCreate = false;
          let Prospects = Store[LabelStore];
          const toAdd = formatData([data.data]);

          const _Prospects: any = Prospects.map((el: any) => {
            console.log(el.id == id);
            if (el.id == id) {
              el = toAdd[0];
            }
            return {
              ...el,
            };
          });
          
          toast({
            title: "Modifier",
            description: data.message,
          });

          callback();
          Store[LabelStore] = _Prospects;
          useModalStore().open = false;
        }
      })
      .catch((err:any) => {
        loading.loadingCreate = false;
        ServerError(err, toast);
      });
  };

  //
  const SetDelete = (URL: string, id: any) => {
    loading.loadingCreate = true;
    deleteData(URL + "/" + id)
      .then((data: any) => {
        if (data) {
          loading.loadingCreate = false;
          let Prospects = [];

          //
          console.log(LabelStore);
          const toAdd = Store[LabelStore].filter((el: any) => el.id != id);
          console.log(toAdd, id);
          Prospects.unshift(...toAdd);
          Store[LabelStore] = Prospects;
          useModalStore().open = false;
          useModalStore().delete = false;

          toast({
            title: "Supprimer",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        loading.loadingCreate = false;
        useModalStore().delete = false;
        ServerError(err, toast);
      });
  };

  return {
    SetUpdate,
    SetDelete,
    SetCreate,
    SetShow
  };
};
