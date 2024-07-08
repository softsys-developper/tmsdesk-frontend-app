<template>
    <ModalLayout :Func="onSubmit" :loading="setStepProspect.loadingCreate" permissions="ajouter-etape" >
      <template v-slot:form>
        <div class="w-full space-y-2">
          <div class="" v-for="fr in StepProspectForms">
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
  import { useStepProspectHook } from "@/hooks/SYSTEME/step_prospect.hook";
  import { useUpdateStore } from "@/stores/update.store";
  import { StepProspectForms } from "@/forms/SYSTEME/step_prospect.forms";
  import InForm from "../../forms/in.form.vue";
  import { useApiServices } from "@/services/api.services";
  import { onMounted } from "vue";
  import { useUtilHook } from "@/hooks/utils.hook";
  import { API_URL } from "@/routes/api.route";
  
  const { CreateStepProspect, StepProspectUpdate, setStepProspect } = useStepProspectHook();
  const { readData } = useApiServices()
  const {remplacerObjetDansTableau} = useUtilHook()
  
  const onSubmit = (e: any) => {
    let values = new FormData(e.target);
    if (useUpdateStore().isUpdate.is) {
      StepProspectUpdate(useUpdateStore().isUpdate.id, values);
    } else {
      CreateStepProspect(values);
    }
  };
  
  onMounted(() => {
    readData(API_URL.USER_LIST).then((data) =>
      remplacerObjetDansTableau(
        StepProspectForms,
        "name",
        "categorie_id",
        data.datas.map((el: any) => ({
          id: el.id,
          name: el.name,
        }))
      )
    );
  });
  </script>
  <style lang="scss" scoped></style>
  