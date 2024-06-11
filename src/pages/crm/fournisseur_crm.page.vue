<template>
    <BaseLayout>
       <template v-slot:content>
          <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
             <ContentLayout title="CRM | Fournisseurs">
                <template v-slot:created>
                   <FournisseurModal
                      name="Ajoutez un fournisseur"
                      title="Ajoutez un fournisseur"
                      description="Les fournissseur de l'enreqiper"
                   />
                </template>
             </ContentLayout>
 
             <Table
                v-if="useDataStore().Fournisseurs.length != 0"
                :dataTables="useDataStore().Fournisseurs"
                :MenuActions="MenuClientActions"
                :display="FournisseurTables"
             />

             <PageLoader :loading="setFournisseur.loading" :data="useDataStore().Fournisseurs" name="Aucun fournisseur" />
          </section>
       </template>
    </BaseLayout>
 </template>
 <script lang="ts" setup>
 import Table from './../../components/tables/table.vue';
 import BaseLayout from './../../layouts/base.layout.vue';
 import ContentLayout from '@/layouts/content.layout.vue';
 import FournisseurModal from '@/components/modals/fournisseur.modal.vue';
 import { MenuClientActions } from '@/routes/actions.route';
 import { onMounted } from 'vue';
 import { useDataStore } from '@/stores/data.store';
 import PageLoader from '@/components/loaders/page.loader.vue';
import { FournisseurTables } from '@/tables/fournisseur.table';
import { useFournisseurHook } from '@/hooks/CRM/fournisseurs.hook';

const { FindFournisseurAll, setFournisseur } = useFournisseurHook();

onMounted(() => {
   FindFournisseurAll();
});
 </script>
 <style lang="scss" scoped></style>
 