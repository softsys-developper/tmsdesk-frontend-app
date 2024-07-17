import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/User.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useUserHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setUser = reactive({
    loading: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingUpdate: false,
  });
  const stateUsers = ref<any[]>([]);
  stateUsers.value = useDataStore().Users;
  const { toast } = useToast();


  const formatUserData = (Users: any) => {
    return Users.map((User: any) => ({
      id: User.id,
      image: `<img src="${
        User.photo_employe
          ? `https://apps.tmsdesk.com/utilisateurs/${User.photo_employe}`
          : `https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-profile-glyph-black-icon-png-image_691589.jpg`
      }"class="size-12 rounded-full " alt=""> `,
      nom_utilisateur: User.name,
      nom: User.name,
      prenoms: User.prenoms,
      email: User.email,
      password: User.password,
      numero: User.telephone,
      utype: User.utype,
      date_creation: moment(User.created_at).format("DD/MM/YYYY"),

      role: User.utype,
    }));
  };

  
  
  const storeUsers = computed(() => {
    return useDataStore().Users;
  });

  //
  const FindUserAll = () => {
    setUser.loading = true;
    readData(API_URL.USER_SYSTEM_LIST)
      .then((data: any) => {
        useDataStore().Users = formatUserData(data.datas);
        setUser.loading = false;
      })
      .catch(() => {
        setUser.loading = false;
      });
  };

  //
  const FindUserOne = () => {};

  //
  const CreateUser = async (
    values: any
  ) => {
    setUser.loadingCreate = true;
    const DataCreated = await createData(API_URL.USER_SYSTEM_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setUser.loadingCreate = false;
          let Users = useDataStore().Users;

          //
          const toAdd: [] = formatUserData([data.data]);
          Users.unshift(...toAdd);
          useDataStore().Users = Users;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setUser.loadingCreate = false;
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

  const UserUpdate = (id: any, values: any) => {
    setService(
      setUser,
      useDataStore(),
      "Users",
      formatUserData
    ).SetUpdate(API_URL.USER_SYSTEM_UPDATE, id, values);
  };

  //
  const UserDelete = (id: any) => {
    setService(
      setUser,
      useDataStore(),
      "Users",
      formatUserData
    ).SetDelete(API_URL.USER_SYSTEM_REMOVE, id);
  };

  return {
    FindUserAll,
    FindUserOne,
    CreateUser,
    UserUpdate,
    UserDelete,
    stateUsers,
    setUser,
    storeUsers,
  };
};
