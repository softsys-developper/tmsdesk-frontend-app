import { useProfileServices } from "@/services/profile.services";
import { useDataStore } from "@/stores/data.store";
import { useModalStore } from "@/stores/modal.store";
import { useUpdateStore } from "@/stores/update.store";


const ToUpdateActions = (Id: any, ToUpdate: any) => {
  useModalStore().open = true;

  console.log(ToUpdate)

  setTimeout(() => {
    // useDataStore().Categories
    let Find: any = ToUpdate.find((el: any) => el.id == Id);
    const InputKey = Object.keys(Find);
    console.log(InputKey)
    InputKey?.forEach((el) => {
      let UpdateInput: any = document.querySelector(`#${el}`);
      if (UpdateInput) {
        UpdateInput.value = Find[el];
      }
    });

    useUpdateStore().isUpdate = {
      is: true,
      id: Id,
      data: Find ?? null,
    };
  }, 500);
};

const ToDeleteActions = (Id: any) => {
  useModalStore().delete = true;
  useUpdateStore().isDelete = {
    is: true,
    id: Id,
  };
};



//
export const Fun_Actions = (menu: any, id: any, router?:any) => {

  console.log(menu.route)

  const { MenuProfileSignOut } = useProfileServices();
  if (menu.route == "MENU_SIGNOUT") {
    MenuProfileSignOut();
  }

  // CRM / Clients
  if (menu.route == "CRM_CLIENTS") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Clients);
    }
  }

  // CRM / Prospects

  if (menu.route == "CRM_PROSPECTS") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else if (menu.id == "MUA_modify") {
      ToUpdateActions(id, useDataStore().Prospects);
    }
  }

  // CRM / Clients
  if (menu.route == "CRM_FOURNISSEURS") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Fournisseurs);
    }
  }

  // CRM / Prospects

  if (menu.route == "PROFORMA_LIST") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else if (menu.id == "MUA_modify") {
      ToUpdateActions(id, useDataStore().Prospects);
    } else if (menu.id == "MUA_details") {
      router.push("/proforma/detail/?id=" + id)
    } else if (menu.id == "MUA_validate") {
      console.log("test");
    } else if (menu.id == "MUA_BC") {
      console.log("MUA_BC");
    }
  }

  if (menu.route == "SYSTEM_CATEGORY") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Categories);
    }
  }
};
