<template>
  <ModalLayout :Func="onSubmit"  :loading="setService.loadingCreate" permissions="ajouter-service">
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in ServiceForms">
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
import { useServiceHook } from "@/hooks/RH/service.hook";
import { useUpdateStore } from "@/stores/update.store";
import { ServiceForms } from "@/forms/RH/service.forms";
import InForm from "../forms/in.form.vue";

const { CreateService, ServiceUpdate, setService } = useServiceHook();

const onSubmit = (e: any) => {
  let values = new FormData(e.target);
  if (useUpdateStore().isUpdate.is) {
    ServiceUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreateService(values);
  }
};
</script>
<style lang="scss" scoped></style>
