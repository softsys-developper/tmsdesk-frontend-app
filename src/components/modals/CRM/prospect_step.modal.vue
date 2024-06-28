<template>
  <ModalLayout :Func="onSubmit" :loading="setProspect.loadingCreate">
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in ProspectStepForms">
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
import {  ProspectStepForms } from "@/forms/CRM/prospect.forms";
import {  onMounted } from "vue";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useUtilHook } from "@/hooks/utils.hook";
import InForm from "@/components/forms/in.form.vue";
import { useModalStore } from "@/stores/modal.store";

const { CreateProspectStep, ProspectUpdate, setProspect } = useProspectHook();
const { readData } = useApiServices();
const { remplacerObjetDansTableau } = useUtilHook();



const onSubmit = (e: any) => {
  let values = new FormData(e.target);
  values.append('client_id', `${useModalStore().ProspectStepID}`)
  if (useUpdateStore().isUpdate.is) {
    ProspectUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreateProspectStep(useModalStore().ProspectStepID, values, () => {
      useModalStore().ProspectStep = false
      useModalStore().open = false
      useModalStore().ProspectStepID = null
    });
  }
};

onMounted(() => {
  readData(API_URL.STEP_LIST).then((data) => {
    remplacerObjetDansTableau(
      ProspectStepForms,
      "name",
      "etape",
      data.datas
    );
  });
});
</script>

<style lang="scss" scoped></style>
