import { useProfileServices } from "@/services/profile.services";
import { useDataStore } from "@/stores/data.store";
import { useModalStore } from "@/stores/modal.store";
import { useUpdateStore } from "@/stores/update.store";

const ToUpdateActions = (Id: any, ToUpdate: any) => {
  useModalStore().open = true;

  setTimeout(() => {
    // useDataStore().Categories
    let Find: any = ToUpdate.find((el: any) => el.id == Id);
    const InputKey = Object.keys(Find);
    InputKey?.forEach((el) => {
      let UpdateInput: any = document.querySelector(`#${el}`);
      console.log(UpdateInput)
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
export const Fun_Actions = (menu: any, id: any) => {
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
    } else {
      ToUpdateActions(id, useDataStore().Prospects);
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
