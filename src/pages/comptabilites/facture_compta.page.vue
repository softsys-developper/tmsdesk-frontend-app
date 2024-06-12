<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Factures">
               <template v-slot:created>
              
            <DeleteLayout
              name="Ajouter un categorie"
              title="Ajouter un nouvel categorie"
              :funDelete="FactureDelete"
              :id="useUpdateStore().isDelete.id"
            />
               </template>
            </ContentLayout>
            <Table
               v-if="storeFactures.length != 0"
               :dataTables="storeFactures"
               :MenuActions="MenuClientActions"
               :display="FactureTables"
            />

            <PageLoader
               :loading="setFacture.loading"
               :data="storeFactures"
               name="Aucune factures"
            />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import FactureModal from '@/components/modals/facture.modal.vue';
import { MenuClientActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { FactureTables } from '@/tables/facture.tables';
import { useFactureHook } from '@/hooks/comptabilites/facture.hook.ts';
import DeleteLayout from "@/layouts/delete.layout.vue";
import { useUpdateStore } from "@/stores/update.store";

const { FindFactureAll, storeFactures, FactureDelete,  setFacture } = useFactureHook();

onMounted(() => {
   FindFactureAll();
});
</script>
<style lang="scss" scoped></style>
