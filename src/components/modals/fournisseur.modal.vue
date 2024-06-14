<template>
   <ModalLayout :Func="onSubmit"  :loading="setFournisseur.loadingCreate">
     <template v-slot:form>
       <div class="w-full space-y-2">
         <div class="" v-for="fr in FournisseurForms">
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
 import { useFournisseurHook } from "@/hooks/CRM/fournisseurs.hook";
 import { useUpdateStore } from "@/stores/update.store";
 import { FournisseurForms } from "@/forms/CRM/fournisseur.forms";
 import InForm from "../forms/in.form.vue";
 
 const { CreateFournisseur, FindFournisseurUpdate, setFournisseur } = useFournisseurHook();
 
 const onSubmit = (e: any) => {
   let values = new FormData(e.target);
   if (useUpdateStore().isUpdate.is) {
      FindFournisseurUpdate(useUpdateStore().isUpdate.id, values);
   } else {
     CreateFournisseur(values);
   }
 };
 </script>
 <style lang="scss" scoped></style>
 