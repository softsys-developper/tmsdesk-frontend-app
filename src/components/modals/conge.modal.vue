<template>
  <ModalLayout :Func="onSubmit" :loading="setConge.loadingCreate" permissions="ajouter-conge" >
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in CongeForms">
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
import { useCongeHook } from "@/hooks/RH/conge.hook";
import { useUpdateStore } from "@/stores/update.store";
import { CongeForms } from "@/forms/RH/conge.forms";
import InForm from "../forms/in.form.vue";
import { onMounted } from "vue";
import { useApiServices } from "@/services/api.services";
import { useUtilHook } from "@/hooks/utils.hook";
import { API_URL } from "@/routes/api.route";

const { CreateConge, CongeUpdate, setConge } = useCongeHook();
const { readData } = useApiServices();
const { remplacerObjetDansTableau } = useUtilHook();

const onSubmit = (e: any) => {
  console.log(useUpdateStore().isUpdate);
  let values = new FormData(e.target);
  if (useUpdateStore().isUpdate.is) {
    CongeUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreateConge(values);
  }
};

onMounted(() => {
  readData(API_URL.USER_LIST).then((data) =>
    remplacerObjetDansTableau(
      CongeForms,
      "name",
      "employe",
      data.datas
    )
  );
});
</script>
<style lang="scss" scoped></style>
