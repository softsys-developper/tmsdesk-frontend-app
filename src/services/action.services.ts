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
      if (UpdateInput) {
        UpdateInput.value = typeof Find[el] == 'object' ? Find[el]?.id : Find[el];
      }
    });


    useUpdateStore().isUpdate = {
      is: true,
      id: Id,
      data: Find ?? null,
    };
  }, 50);
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
    }
    else if (menu.id == "MUA_rapport") {
      router.push({name: "CRM_RAPPORTS", query: {id }})
    } else if (menu.id == "MUA_modify") {
      ToUpdateActions(id, useDataStore().Update.Prospects);
    }else if (menu.id == "MUA_step") {
      useModalStore().open = true
      useModalStore().ProspectStep = true
      useModalStore().ProspectStepID = id
    } else if (menu.id == "MUA_interlocuteur") {
      router.push({name: "CRM_INTERLOCUTEUR", query: {id}})
    }
  }

  // CRM / Clients
  if (menu.route == "CRM_FOURNISSEURS") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else if (menu.id == "MUA_interlocuteur") {
      router.push({name: "CRM_INTERLOCUTEUR", query: {id}})
    }else {
      ToUpdateActions(id, useDataStore().Fournisseurs);
    } 
  }

  if (menu.route == "CRM_INTERLOCUTEUR") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Interlocuteurs);
    } 
  }

   // CRM / Rapport
   if (menu.route == "CRM_RAPPORTS") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Rapports);
    }
  }

  // CRM / Prospects
  if (menu.route == "PROFORMA_LIST") {
   
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else if (menu.id == "MUA_modify") {
      // ToUpdateActions(id, useDataStore().Prospects);
      router.push({name: "PROFORMA_ADD", query: {id }})
    } else if (menu.id == "MUA_details") {
      router.push("/proforma/detail/?id=" + id)
    } else if (menu.id == "MUA_BC") {
      router.push({name: "PROFORMA_NBC", query: {id }})
    }else if (menu.id == "MUA_state") {
      useModalStore().open = true
      useModalStore().Proforma = true
      useModalStore().ProformaId = id
    }
    else if (menu.id == "MUA_interlocuteur") {
      router.push({name: "CRM_INTERLOCUTEUR", params: {id}})
    }
  }

  if (menu.route == "PROFORMA_NBC_LIST") {
   
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else if (menu.id == "MUA_modify") {
      ToUpdateActions(id, useDataStore().Prospects);
    } else if (menu.id == "MUA_details") {
      router.push("/proforma/detail/?id=" + id)
    }
  }

  

  if (menu.route == "SYSTEM_CATEGORY") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Categories);
    }
  }
  
  // RH
   if (menu.route == "HUMAINES_CONGES") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Conges);
    }
  }

  if (menu.route == "RH_PERSONAL") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else if(menu.id == "MUA_modify") {
      // ToUpdateActions(id, useDataStore().Conges);
      router.push({name: "RH_PERSONAL_ADD", query: {id }})
    }else{
      router.push({name: "RH_PERSONAL_SHOW", query: {id }})
    }
  }

  if (menu.route == "HUMAINES_SALAIRE") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Salary);
    }
  }

  if (menu.route == "RH_SALAIRE_PAID") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Paids);
    }
  }

  if (menu.route == "RH_DEPARTEMENT") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Services);
    }
  }

  if (menu.route == "RH_INDEMNITE_PRIME") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Primes);
    }
  }


  // LOGGISTIQUE
  if (menu.route == "LOGISC_LIVRAISONS") {
   
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else if (menu.id == "MUA_modify") {
      // ToUpdateActions(id, useDataStore().Prospects);
      router.push({name: "LOGISC_LIVRAISONS_ADD", query: {id }})
    } else if (menu.id == "MUA_details") {
      // router.push("/proforma/detail/?id=" + id)
    } else if (menu.id == "MUA_livraison") {
      router.push({name: "LOGISC_LIVRAISONS_BL", query: {id }})
    }
  }
  if (menu.route == "LOGISC_BC_PARTENAIRES") {
   
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else if (menu.id == "MUA_modify") {
      // ToUpdateActions(id, useDataStore().Prospects);
      router.push({name: "LOGISC_BC_PARTENAIRES_ADD", query: {id }})
    } else if (menu.id == "MUA_details") {
      // router.push("/proforma/detail/?id=" + id)
    } 
  }

  // 
  if (menu.route == "LOGISC_STOCK") {
    if (menu.id == "MUA_in_stock") {
      useModalStore().Stocks = true
      useModalStore().open = true
      useModalStore().StocksID = id
    } 
  }
  


  // Comptabilité
  if (menu.route == "COMPTA_DEPENSE") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Depenses);
    }
  }
  if (menu.route == "COMPTA_COMPTE") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Comptes);
    }
  }
  if (menu.route == "COMPTA_FACTURE") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else if (menu.id == "MUA_modify") {
      ToUpdateActions(id, useDataStore().Factures);
    } else if (menu.id == "MUA_details") {
      router.push({name: 'PROFORMA_DETAIL', query: {id, facture: true}})
    }
    else if (menu.id == "MUA_transactions") {
      router.push({name: 'COMPTA_FACTURE_PAID', query: {id}})
    }
    
  }
  if (menu.route == "COMPTA_FACTURE_PAID") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().FacturePaids);
    }
  }

  

  // Roles
  if (menu.route == "SETTING_ROLES") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Roles);
    }
  }

  // Parametre
  if (menu.route == "SETTING_USER") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Users);
    }
  }


  // SYSTEME
  if (menu.route == "SYSTEM_DA") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().DAs);
    }
  }

  if (menu.route == "SYSTEM_DEVISE") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Devises);
    }
  }

  if (menu.route == "SYSTEM_MARQUE") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Marques);
    }
  }

  if (menu.route == "SYSTEM_STEP_PROSPECT") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().StepProspects);
    }
  }

  if (menu.route == "SYSTEM_STEP_PROSPECT") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().StepProspects);
    }
  }

  if (menu.route == "SYSTEM_HOLIDAY") {
    if (menu.id == "MUA_delete") {
      ToDeleteActions(id);
    } else {
      ToUpdateActions(id, useDataStore().Holiday);
    }
  }
  
};
