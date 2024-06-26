<template>
   <ModalLayout :Func="onSubmit"  :loading="setProduct.loadingCreate">
     <template v-slot:form>
       <div class="w-full space-y-2">
         <div class="" v-for="fr in ProductForms">
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
 import { useProductHook } from "@/hooks/LOGISTIQUE/product.hook";
 import { useUpdateStore } from "@/stores/update.store";
 import { ProductForms } from "@/forms/LOGISTIQUE/product.forms";
import InForm from "@/components/forms/in.form.vue";

 
 const { CreateProduct, ProductUpdate, setProduct } = useProductHook();
 
 const onSubmit = (e: any) => {
   let values = new FormData(e.target);
   if (useUpdateStore().isUpdate.is) {
     ProductUpdate(useUpdateStore().isUpdate.id, values);
   } else {
     CreateProduct(values);
   }
 };
 </script>
 <style lang="scss" scoped></style>
 