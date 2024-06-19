import { useUtilHook } from "@/hooks/utils.hook";
import { useApiServices } from "./api.services";
import { useModalStore } from "@/stores/modal.store";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const { updateData, deleteData } = useApiServices();
// API_URL.PROSPECT_UPDATE + '/' + id, values

const { EmptyFields } = useUtilHook();



export const setService = (
  loading: any,
  Store: any,
  LabelStore: string,
  formatProspectData: any
) => {
  // Update
  const SetUpdate = (URL: string, id: any, values: any) => {
    loading.loadingCreate = true;
    updateData(URL + "/" + id, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          loading.loadingCreate = false;
          let Prospects = Store[LabelStore];

          // //
          const toAdd = formatProspectData([data.data]);
         
          const _Prospects: any = Prospects.map((el: any) => {
            console.log(el.id == id)
            if (el.id == id) {
              el = toAdd[0];
            }
            return {
              ...el
            }
          });

          


          Store[LabelStore] = _Prospects;
          useModalStore().open = false;

          toast({
            title: "Modifier",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        loading.loadingCreate = false;
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
          console.log(LabelStore)
          const toAdd = Store[LabelStore].filter((el: any) => el.id != id);
          console.log(toAdd, id)
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
  };

  return {
    SetUpdate,
    SetDelete,
  };
};
