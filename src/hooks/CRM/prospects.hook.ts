import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Prospect.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";

export const useProspectHook = () => {
  const { readData, createData, updateData, deleteData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setProspect = reactive({ loading: false, loadingCreate: false });
  const stateProspects = ref<any[]>([]);
  stateProspects.value = useDataStore().Prospects;
  const { toast } = useToast();

  const formatProspectData = (Prospects: any) => {
    return Prospects.map((Prospect: any) => ({
      id: Prospect.id,
      nom: Prospect.nom,
      email: Prospect.email,
      telephone: Prospect.telephone,
      adresse: Prospect.adresse,
      nom_interlocuteur: Prospect.nom_interlocuteur,
      proposition: Prospect.proposition,
      etape: Prospect.etape,
      observation: Prospect.observation,
      date_creation: moment(Prospect.created_at).format("l"),
    }));
  };

  const storeProspects = computed(() => {
    return useDataStore().Prospects;
  });

  //
  const FindProspectAll = () => {
    setProspect.loading = true;
    readData(API_URL.PROSPECT_LIST)
      .then((data: any) => {
        useDataStore().Prospects = formatProspectData(data.datas);
        setProspect.loading = false;
      })
      .catch(() => {
        setProspect.loading = false;
      });
  };

  //
  const FindProspectOne = () => {};

  //
  const CreateProspect = async (values: any) => {
    setProspect.loadingCreate = true;
    const DataCreated = await createData(API_URL.PROSPECT_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setProspect.loadingCreate = false;
          let Prospects = useDataStore().Prospects;

          //
          const toAdd: [] = formatProspectData([data.data]);
          Prospects.unshift(...toAdd);
          useDataStore().Prospects = Prospects;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setProspect.loadingCreate = false;
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

    // Update
    const ProspectUpdate = (id:any, values:any) => {
      setProspect.loadingCreate = true;
      updateData(API_URL.PROSPECT_UPDATE + '/' + id, values)
        .then((data: any) => {
          if (data) {
            EmptyFields(values); // Vider les champs
            setProspect.loadingCreate = false;
            let Prospects = useDataStore().Prospects;
   
            //
            const toAdd = formatProspectData([data.data]);
            const _Prospects: any = Prospects.map((el:any) => {
              if(el.id == id){
                el = toAdd[0]
              }
              return el
            })
            
            useDataStore().Prospects = _Prospects;
            console.log(useDataStore().Prospects)
            useModalStore().open = false;
   
            toast({
              title: "Modifier",
              description: data.message,
            });
          }
        })
        .catch((err) => {
          setProspect.loadingCreate = false;
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
     const ProspectDelete = (id: any) => {
       setProspect.loadingCreate = true;
       deleteData(API_URL.PROSPECT_REMOVE+ '/' + id)
         .then((data: any) => {
           if (data) {
             setProspect.loadingCreate = false;
             let Prospects = useDataStore().Prospects;
   
             //
             const toAdd = Prospects.filter((el: any) => el.id != id);
             Prospects.unshift(...toAdd);
             useDataStore().Prospects = Prospects;
             useModalStore().open = false;
             useModalStore().delete = false;
   
             toast({
               title: "Supprimer",
               description: data.message,
             });
           }
         })
         .catch((err) => {
           setProspect.loadingCreate = false;
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
    FindProspectAll,
    FindProspectOne,
    CreateProspect,
    ProspectUpdate,
    ProspectDelete,
    stateProspects,
    setProspect,
    storeProspects,
  };
};
