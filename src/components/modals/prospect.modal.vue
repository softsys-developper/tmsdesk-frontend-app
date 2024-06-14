<template>
  <ModalLayout :Func="onSubmit" :loading="setProspect.loadingCreate">
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in ProspectForms">
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

// import { onMounted, ref } from 'vue';
import { useProspectHook } from "@/hooks/CRM/prospects.hook";
import { useUpdateStore } from "@/stores/update.store";
import InForm from "../forms/in.form.vue";
import { ProspectForms } from "@/forms/CRM/prospect.forms";

const { CreateProspect, ProspectUpdate, setProspect } = useProspectHook();

const onSubmit = (e: any) => {
  let values = new FormData(e.target);
  if (useUpdateStore().isUpdate.is) {
    ProspectUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreateProspect(values);
  }
};
</script>
<style lang="scss" scoped></style>
