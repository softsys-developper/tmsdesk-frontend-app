<template>
  <ModalLayout :Func="onSubmit"  :loading="setCategorie.loadingCreate" permissions="ajouter-categorie" >
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in CategorieForms">
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
import { useCategorieHook } from "@/hooks/SYSTEME/categorie.hook";
import { useUpdateStore } from "@/stores/update.store";
import { CategorieForms } from "@/forms/SYSTEME/categorie.forms";
import InForm from "@/components/forms/in.form.vue";

const { CreateCategorie, CategorieUpdate, setCategorie } = useCategorieHook();

const onSubmit = (e: any) => {
  console.log(useUpdateStore().isUpdate)
  let values = new FormData(e.target);
  if (useUpdateStore().isUpdate.is) {
    CategorieUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreateCategorie(values);
  }
};
</script>
<style lang="scss" scoped></style>
