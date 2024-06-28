import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Product.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { useUpdateStore } from "@/stores/update.store";

export const useProductHook = () => {
  const { readData, createData, deleteData, updateData } = useApiServices();
  const { EmptyFields, StatusHtml } = useUtilHook();
  const setProduct = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
  });
  const stateProducts = ref<any[]>([]);
  stateProducts.value = useDataStore().Products;
  const { toast } = useToast();

  // Get Update
  useUpdateStore().UpdateValue = useDataStore().Products[0];

  const formatProductData = (Products: any) => {
    return Products.map((Product: any) => ({
      id: Product.id,
      reference: Product.reference,
      description: Product.description,
      quantite: Product.quantite,
      status: Product.quantite = 0 ? StatusHtml('Indisponible', 'bg-red-500') : StatusHtml('En stock', 'bg-green-500'),
      prix_unitaire: Product.prix_unitaire,
      date_creation: moment(Product.created_at).format("l"),
    }));
  };
  const storeProducts = computed(() => {
    return useDataStore().Products;
  });

  //
  const FindProductAll = () => {
    setProduct.loading = true;
    readData(API_URL.PRODUCT_LIST)
      .then((data: any) => {
        useDataStore().Products = formatProductData(data.datas);
        setProduct.loading = false;
      })
      .catch(() => {
        setProduct.loading = false;
      });
  };

  //
  const FindProductOne = () => {};

  //
  const CreateProduct = async (values: any) => {
    setProduct.loadingCreate = true;
    const DataCreated = await createData(API_URL.PRODUCT_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setProduct.loadingCreate = false;
          let Products = useDataStore().Products;

          //
          const toAdd: [] = formatProductData([data.data]);
          Products.unshift(...toAdd);
          useDataStore().Products = Products;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setProduct.loadingCreate = false;
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
  const ProductUpdate = (id: any, values: any) => {
    setProduct.loadingCreate = true;
    updateData(API_URL.USER_UPDATE + "/" + id, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setProduct.loadingCreate = false;
          let Products = useDataStore().Products;

          //
          const toAdd: [] = formatProductData([data.data]);
          Products.unshift(...toAdd);
          useDataStore().Products = Products;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setProduct.loadingCreate = false;
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
  const ProductDelete = (id: any) => {
    setProduct.loadingDelete = true;
    deleteData(API_URL.USER_REMOVE + "/" + id)
      .then((data: any) => {
        if (data) {
          setProduct.loadingDelete = false;
          let Products = useDataStore().Products;

          //
          const toAdd = Products.filter((el: any) => el.id != id);
          Products.unshift(...toAdd);
          useDataStore().Products = Products;
          useModalStore().open = false;
          useModalStore().delete = false;

          toast({
            title: "Supprimer",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setProduct.loadingDelete = false;
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
    FindProductAll,
    FindProductOne,
    CreateProduct,
    ProductUpdate,
    ProductDelete,
    stateProducts,
    setProduct,
    storeProducts,
  };
};
