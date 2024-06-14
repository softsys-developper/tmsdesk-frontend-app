import { useUtilHook } from "@/hooks/utils.hook";
import { useApiServices } from "./api.services";
import { useModalStore } from "@/stores/modal.store";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const { updateData, deleteData } = useApiServices();
// API_URL.PROSPECT_UPDATE + '/' + id, values

const { EmptyFields } = useUtilHook();

export const setService = (
  loading: boolean,
  Store: any,
  formatProspectData: any
) => {
  // Update
  const SetUpdate = (URL: string, id: any, values: any) => {
    loading = true;
    updateData(URL + "/" + id, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          loading = false;
          let Prospects = Store.Clients;

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

          console.log(_Prospects)
          Store.Clients = _Prospects;
          useModalStore().open = false;

          toast({
            title: "Modifier",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        loading = false;
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
    loading = true;
    deleteData(URL + "/" + id)
      .then((data: any) => {
        if (data) {
          loading = false;
          let Prospects = Store;

          //
          const toAdd = Prospects.filter((el: any) => el.id != id);
          Prospects.unshift(...toAdd);
          Store = Prospects;
          useModalStore().open = false;
          useModalStore().delete = false;

          toast({
            title: "Supprimer",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        loading = false;
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
