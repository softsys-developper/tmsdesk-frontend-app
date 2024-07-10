<template>
  <ModalLayout
    :Func="onSubmit"
    :loading="setInterlocuteur.loadingCreate"
 
  >
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in InterlocuteurForms">
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
import { useInterlocuteurHook } from "@/hooks/CRM/interlocuteur.hook";
import { useUpdateStore } from "@/stores/update.store";
import { InterlocuteurForms } from "@/forms/CRM/interlocuteur.forms";
import InForm from "../../forms/in.form.vue";
import { onMounted } from "vue";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useUtilHook } from "@/hooks/utils.hook";

const { CreateInterlocuteur, InterlocuteurUpdate, setInterlocuteur } =
  useInterlocuteurHook();
const { readData } = useApiServices();
const { remplacerObjetDansTableau } = useUtilHook();

const onSubmit = (e: any) => {
  console.log(useUpdateStore().isUpdate);
  let values = new FormData(e.target);
  if (useUpdateStore().isUpdate.is) {
    InterlocuteurUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreateInterlocuteur(values);
  }
};

onMounted(() => {
  readData(API_URL.PROSPECT_LIST).then((data) =>
    remplacerObjetDansTableau(
      InterlocuteurForms,
      "name",
      "prospect",
      data.datas
    )
  );
});
</script>
<style lang="scss" scoped></style>
