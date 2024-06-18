<template>
    <ModalLayout :Func="onSubmit"  :loading="setRapport.loadingCreate">
      <template v-slot:form>
        <div class="w-full space-y-2">
          <div class="" v-for="fr in RapportForms">
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
  import { useRapportHook } from "@/hooks/CRM/rapport.hook";
  import { useUpdateStore } from "@/stores/update.store";
  import { RapportForms } from "@/forms/CRM/rapport.forms";
  import InForm from "../../forms/in.form.vue";
  
  const { CreateRapport, RapportUpdate, setRapport } = useRapportHook();
  
  const onSubmit = (e: any) => {
    console.log(useUpdateStore().isUpdate)
    let values = new FormData(e.target);
    if (useUpdateStore().isUpdate.is) {
      RapportUpdate(useUpdateStore().isUpdate.id, values);
    } else {
      CreateRapport(values);
    }
  };
  </script>
  <style lang="scss" scoped></style>
  