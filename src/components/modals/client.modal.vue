<template>
  <ModalLayout :Func="onSubmit"  :loading="setClient.loadingCreate">
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in ClientForms">
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
import { useClientHook } from "@/hooks/CRM/client.hook";
import { useUpdateStore } from "@/stores/update.store";
import { ClientForms } from "@/forms/CRM/client.forms";
import InForm from "../forms/in.form.vue";

const { CreateClient, ClientUpdate, setClient } = useClientHook();

const onSubmit = (e: any) => {
  console.log(useUpdateStore().isUpdate)
  let values = new FormData(e.target);
  if (useUpdateStore().isUpdate.is) {
    ClientUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreateClient(values);
  }
};
</script>
<style lang="scss" scoped></style>
