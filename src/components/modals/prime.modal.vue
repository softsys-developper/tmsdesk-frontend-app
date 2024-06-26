<template>
  <ModalLayout :Func="onSubmit"  :loading="setPrime.loadingCreate">
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in PrimeForms">
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
import { usePrimeHook } from "@/hooks/RH/prime.hook";
import { useUpdateStore } from "@/stores/update.store";
import { PrimeForms } from "@/forms/RH/prime.forms";
import InForm from "../forms/in.form.vue";

const { CreatePrime, PrimeUpdate, setPrime } = usePrimeHook();

const onSubmit = (e: any) => {
  let values = new FormData(e.target);
  if (useUpdateStore().isUpdate.is) {
    PrimeUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreatePrime(values);
  }
};
</script>
<style lang="scss" scoped></style>
