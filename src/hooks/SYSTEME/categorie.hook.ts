import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Categorie.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { CATEGORIE_DATA } from "@/types/systemes/categorie.type";
import { useUpdateStore } from "@/stores/update.store";
import { setService } from "@/services/set.services";

export const useCategorieHook = () => {
  const { readData, createData} = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setCategorie = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false
  });
  const stateCategories = ref<any[]>([]);
  stateCategories.value = useDataStore().Categories;
  const { toast } = useToast();

  // Get Update
  useUpdateStore().UpdateValue = useDataStore().Categories[0];

  const formatCategorieData = (Categories: any) => {
    return Categories.map((Categorie: CATEGORIE_DATA) => ({
      id: Categorie.id,
      libelle: Categorie.libelle,
      date_creation: moment(Categorie.created_at).format("l"),
    }));
  };
  const storeCategories = computed(() => {
    return useDataStore().Categories;
  });

  //
  const FindCategorieAll = () => {
    setCategorie.loading = true;
    readData(API_URL.CATEGORIE_LIST)
      .then((data: any) => {
        useDataStore().Categories = formatCategorieData(data.datas);
        setCategorie.loading = false;
      })
      .catch(() => {
        setCategorie.loading = false;
      });
  };

  //
  const FindCategorieOne = () => {};

  //
  const CreateCategorie = async (values: any) => {
    setCategorie.loadingCreate = true;
    const DataCreated = await createData(API_URL.CATEGORIE_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setCategorie.loadingCreate = false;
          let Categories = useDataStore().Categories;

          //
          const toAdd: [] = formatCategorieData([data.data]);
          Categories.unshift(...toAdd);
          useDataStore().Categories = Categories;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setCategorie.loadingCreate = false;
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

  const CategorieUpdate = (id: any, values: any) => {
    setService(
      setCategorie,
      useDataStore(),
      'Categories',
      formatCategorieData
    ).SetUpdate(API_URL.CATEGORIE_UPDATE, id, values);
  };

  //
  const CategorieDelete = (id: any) => {
    setService(
      setCategorie,
      useDataStore(),
      'Categories',
      formatCategorieData
    ).SetDelete(API_URL.CATEGORIE_REMOVE, id);
  };

  return {
    FindCategorieAll,
    FindCategorieOne,
    CreateCategorie,
    CategorieUpdate,
    CategorieDelete,
    stateCategories,
    setCategorie,
    storeCategories,
  };
};
