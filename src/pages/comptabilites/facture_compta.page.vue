<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Factures">
               <template v-slot:created>

                  <FacturePaidModal name="Nouveau versement" :title="useUpdateStore().isUpdate.is
                     ? 'Modifier le versement'
                     : 'Nouveau versement'
                     " />

                  <DeleteLayout :funDelete="FactureDelete" :id="useUpdateStore().isDelete.id" />

                  <DeleteLayout :funDelete="FactureDelete" :id="useUpdateStore().isDelete.id" />
               </template>
            </ContentLayout>
            <Table v-if="storeFactures.length != 0" :dataTables="storeFactures" :MenuActions="MenuFactureClientActions"
               :display="FactureTables" />

            <PageLoader :loading="setFacture.loading" :data="storeFactures" name="Aucune factures" />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { MenuFactureClientActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { FactureTables } from '@/tables/facture.tables';
import { useFactureHook } from '@/hooks/comptabilites/facture.hook.ts';
import DeleteLayout from "@/layouts/delete.layout.vue";
import { useUpdateStore } from "@/stores/update.store";
import FacturePaidModal from '@/components/modals/COMPTABILITE/facture_paid.modal.vue';


const { FindFactureAll, storeFactures, FactureDelete, setFacture } = useFactureHook();


onMounted(() => {
   FindFactureAll();
});
</script>
<style lang="scss" scoped></style>
