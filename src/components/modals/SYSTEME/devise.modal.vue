<template>
    <ModalLayout :Func="onSubmit"  :loading="setDevise.loadingCreate" permissions="ajouter-devise" >
      <template v-slot:form>
        <div class="w-full space-y-2">
          <div class="" v-for="fr in DeviseForms">
            <InForm
              :title="fr.label"
              :name="fr.name"
              :label="fr.label"
              :type="fr.type"
              :placeholder="fr.placeholder"
              :select="fr.select"
            />
          </div>
        </div>
      </template>
    </ModalLayout>
  </template>
  <script lang="ts" setup>
  import ModalLayout from "@/layouts/modal.layout.vue";
  import { useDeviseHook } from "@/hooks/SYSTEME/devise.hook";
  import { useUpdateStore } from "@/stores/update.store";
  import { DeviseForms } from "@/forms/SYSTEME/devise.forms";
  import InForm from "../../forms/in.form.vue";
  
  const { CreateDevise, DeviseUpdate, setDevise } = useDeviseHook();
  
  const onSubmit = (e: any) => {
    let values = new FormData(e.target);
    if (useUpdateStore().isUpdate.is) {
      DeviseUpdate(useUpdateStore().isUpdate.id, values);
    } else {
      CreateDevise(values);
    }
  };
  </script>
  <style lang="scss" scoped></style>
  