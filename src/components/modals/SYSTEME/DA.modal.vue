<template>
  <ModalLayout :Func="onSubmit" :loading="setDA.loadingCreate" permissions="ajouter-domaine-activite">
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in DAForms">
          <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type" :placeholder="fr.placeholder"
            :select="fr.select" />
        </div>
      </div>
    </template>
  </ModalLayout>
</template>
<script lang="ts" setup>
import ModalLayout from "@/layouts/modal.layout.vue";
import { useDAHook } from "@/hooks/SYSTEME/DA.hook";
import { useUpdateStore } from "@/stores/update.store";
import { DAForms } from "@/forms/SYSTEME/DA.forms";
import InForm from "../../forms/in.form.vue";

const { CreateDA, DAUpdate, setDA } = useDAHook();

const onSubmit = (e: any) => {
  console.log(useUpdateStore().isUpdate)
  let values = new FormData(e.target);
  if (useUpdateStore().isUpdate.is) {
    DAUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreateDA(values);
  }
};
</script>
<style lang="scss" scoped></style>