<template>
    <ModalLayout :Func="onSubmit"  :loading="setMarque.loadingCreate">
      <template v-slot:form>
        <div class="w-full space-y-2">
          <div class="" v-for="fr in MarqueForms">
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
  import { useMarqueHook } from "@/hooks/SYSTEME/marque.hook";
  import { useUpdateStore } from "@/stores/update.store";
  import { MarqueForms } from "@/forms/SYSTEME/marque.forms";
  import InForm from "../../forms/in.form.vue";
  
  const { CreateMarque, MarqueUpdate, setMarque } = useMarqueHook();
  
  const onSubmit = (e: any) => {
    console.log(useUpdateStore().isUpdate)
    let values = new FormData(e.target);
    if (useUpdateStore().isUpdate.is) {
      MarqueUpdate(useUpdateStore().isUpdate.id, values);
    } else {
      CreateMarque(values);
    }
  };
  </script>
  <style lang="scss" scoped></style>
  