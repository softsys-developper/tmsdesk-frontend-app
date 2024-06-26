<template>
   <ModalLayout :Func="onSubmit" :loading="setCompte.loadingCreate">
       <template v-slot:form>
           <div class="w-full space-y-2">
               <div class="" v-for="fr in CompteForms">
                   <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type"
                       :placeholder="fr.placeholder" :select="fr.select" />
               </div>
           </div>
       </template>
   </ModalLayout>
</template>
<script lang="ts" setup>
import ModalLayout from "@/layouts/modal.layout.vue";
import { useCompteHook } from "@/hooks/comptabilites/compte.hook";
import { useUpdateStore } from "@/stores/update.store";
import { CompteForms } from "@/forms/COMPTABILITE/compte.forms";
import InForm from "../forms/in.form.vue";

const { CreateCompte, CompteUpdate, setCompte } = useCompteHook();

const onSubmit = (e: any) => {
   console.log(useUpdateStore().isUpdate)
   let values = new FormData(e.target);
   if (useUpdateStore().isUpdate.is) {
       CompteUpdate(useUpdateStore().isUpdate.id, values);
   } else {
       CreateCompte(values);
   }
};
</script>
<style lang="scss" scoped></style>