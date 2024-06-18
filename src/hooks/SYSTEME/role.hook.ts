import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { computed, reactive, ref } from "vue";
import { useDataStore } from "./../../stores/data.store";
// import { LIST_DEPENSE } from '@/types/Role.type';
import { useUtilHook } from "@/hooks/utils.hook";
import { useModalStore } from "@/stores/modal.store";
import moment from "moment";
import { setService } from "@/services/set.services";

export const useRoleHook = () => {
  const { readData, createData } = useApiServices();
  const { EmptyFields } = useUtilHook();
  const setRole = reactive({ loading: false, loadingCreate: false });
  const stateRoles = ref<any[]>([]);
  stateRoles.value = useDataStore().Roles;
  const { toast } = useToast();

  const formatRoleData = (Roles: any) => {
    return Roles.map((Role: any) => ({
      id: Role.id,
      name: Role.name,
      appareil: Role.guard_name,
      date_creation: moment(Role.created_at).format("l"),
    }));
  };

  const storeRoles = computed(() => {
    return useDataStore().Roles;
  });

  //
  const FindRoleAll = () => {
    setRole.loading = true;
    readData(API_URL.ROLE_LIST)
      .then((data: any) => {
        useDataStore().Roles = formatRoleData(data.datas);
        setRole.loading = false;
      })
      .catch(() => {
        setRole.loading = false;
      });
  };

  //
  const FindRoleOne = () => {};

  //
  const CreateRole = async (values: any) => {
    setRole.loadingCreate = true;
    const DataCreated = await createData(API_URL.ROLE_CREATE, values)
      .then((data: any) => {
        if (data) {
          EmptyFields(values); // Vider les champs
          setRole.loadingCreate = false;
          let Roles = useDataStore().Roles;

          //
          const toAdd: [] = formatRoleData([data.data]);
          Roles.unshift(...toAdd);
          useDataStore().Roles = Roles;
          useModalStore().open = false;

          toast({
            title: "Enregistré",
            description: data.message,
          });
        }
      })
      .catch((err) => {
        setRole.loadingCreate = false;
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

  //
  const RoleUpdate = (id: any, values: any) => {
    setService(
      setRole,
      useDataStore(),
      'Roles',
      formatRoleData
    ).SetUpdate(API_URL.ROLE_UPDATE, id, values);
  };

  //
  const RoleDelete = (id: any) => {
    setService(
      setRole,
      useDataStore(),
      'Roles',
      formatRoleData
    ).SetDelete(API_URL.ROLE_REMOVE, id);
  };

  return {
    FindRoleAll,
    FindRoleOne,
    CreateRole,
    RoleUpdate,
    RoleDelete,
    stateRoles,
    setRole,
    storeRoles,
  };
};
