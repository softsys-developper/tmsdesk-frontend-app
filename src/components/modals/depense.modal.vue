<template>
   <ModalLayout :Func="onSubmit" :loading="setDepense.loadingCreate" permissions="ajouter-transaction-caisse" >
     <template v-slot:form>
       <div class="w-full space-y-2">
         <div class="" v-for="fr in DepenseForms">
           <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type" :placeholder="fr.placeholder"
             :select="fr.select" />
         </div>
       </div>
     </template>
   </ModalLayout>
 </template>
 <script lang="ts" setup>
 import ModalLayout from "@/layouts/modal.layout.vue";
 import { useDepenseHook } from "@/hooks/comptabilites/depense.hook";
 import { useUpdateStore } from "@/stores/update.store";
 import { DepenseForms } from "@/forms/COMPTABILITE/depense.forms";
 import InForm from "@/components/forms/in.form.vue";
 import { useUtilHook } from '@/hooks/utils.hook';
 import { onMounted } from "vue";
 import { useDataStore } from "@/stores/data.store";
 import { useApiServices } from "@/services/api.services";
 import { API_URL } from "@/routes/api.route";
 
 
 const { CreateDepense, DepenseUpdate, setDepense } = useDepenseHook();
 const { remplacerObjetDansTableau } = useUtilHook()
 const { readData } = useApiServices()
 
 const onSubmit = (e: any) => {
   let values = new FormData(e.target);
   if (useUpdateStore().isUpdate.is) {
     DepenseUpdate(useUpdateStore().isUpdate.id, values);
   } else {
     CreateDepense(values);
   }
 };
 
 
 onMounted(() => {
   if (useDataStore().Factures) {
     readData(API_URL.BANQUE_LIST).then((data) => {
       useDataStore().Comptes = data.datas
       remplacerObjetDansTableau(DepenseForms, 'name', 'banque', data.datas)
     })
     readData(API_URL.FACTURE_LIST).then((data) => {
       // useDataStore().Factures = data.datas
       remplacerObjetDansTableau(DepenseForms, 'name', 'factureId', data.datas.map((el:any) => ({ id: el.id, name: el.numero_facture })))
     })
   }
 })
 </script>
 <style lang="scss" scoped></style>