<template>
    <ModalLayout :Func="onSubmit" :loading="setFacturePaid.loadingCreate" permissions="payer-facture-client" >
      <template v-slot:form>
        <div class="w-full space-y-2">
          <div class="" v-for="fr in FacturePaidShowForms">
            <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type" :placeholder="fr.placeholder"
              :select="fr.select" />
          </div>
        </div>
      </template>
    </ModalLayout>
  </template>
  <script lang="ts" setup>
  import ModalLayout from "@/layouts/modal.layout.vue";
  import { useFacturePaidHook } from "@/hooks/comptabilites/facture_paid.hook";
  import { useUpdateStore } from "@/stores/update.store";
  import { FacturePaidShowForms } from "@/forms/COMPTABILITE/facture_paid.forms";
  import InForm from "@/components/forms/in.form.vue";
  import { useUtilHook } from '@/hooks/utils.hook';
  import { onMounted } from "vue";
  import { useDataStore } from "@/stores/data.store";
  import { useApiServices } from "@/services/api.services";
  import { API_URL } from "@/routes/api.route";
  import { useRoute } from "vue-router";
 
  const route:any = useRoute()
  
  
  const { CreateFacturePaid, FacturePaidUpdate, setFacturePaid } = useFacturePaidHook();
  const { remplacerObjetDansTableau } = useUtilHook()
  const { readData } = useApiServices()
  
  const onSubmit = (e: any) => {
    let values = new FormData(e.target);
    values.append('factureId', route.query.id)
    if (useUpdateStore().isUpdate.is) {
      FacturePaidUpdate(useUpdateStore().isUpdate.id, values);
    } else {
      CreateFacturePaid(values);
    }
  };
  
  
  onMounted(() => {
    if (useDataStore().Factures) {
      readData(API_URL.BANQUE_LIST).then((data) => {
        useDataStore().Comptes = data.datas
        remplacerObjetDansTableau(FacturePaidShowForms, 'name', 'banque', data.datas)
      })
    }
  })
  </script>
  <style lang="scss" scoped></style>