<template>
    <BaseLayout>
       <template v-slot:content>
          <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
             <ContentLayout title="COMPTABILITES | Grand marque">
                <template v-slot:created>
                   <!-- <MarqueModal
                      name="Ajouter un marque"
                      title="Ajouter un nouvel marque"
                   /> -->
                </template>
             </ContentLayout>
             <Table
                v-if="storeMarques.length != 0"
                :dataTables="storeMarques"
                :MenuActions="MenuClientActions"
                :display="MarqueTables"
             />
 
             <PageLoader
                :loading="setMarque.loading"
                :data="storeMarques"
                name="Aucune transaction"
             />
          </section>
       </template>
    </BaseLayout>
 </template>
 <script lang="ts" setup>
 import Table from './../../components/tables/table.vue';
 import BaseLayout from './../../layouts/base.layout.vue';
 import ContentLayout from '@/layouts/content.layout.vue';
 // import MarqueModal from '@/components/modals/marque.modal.vue';
 import { MenuClientActions } from '@/routes/actions.route';
 import { onMounted } from 'vue';
 import PageLoader from '@/components/loaders/page.loader.vue';
 import { MarqueTables } from '@/tables/marque.tables';
 import { useMarqueHook } from '@/hooks/SYSTEME/marque.hook.ts';
 
 const { FindMarqueAll, storeMarques, setMarque } = useMarqueHook();
 
 onMounted(() => {
    FindMarqueAll();
 });
 </script>
 <style lang="scss" scoped></style>
 