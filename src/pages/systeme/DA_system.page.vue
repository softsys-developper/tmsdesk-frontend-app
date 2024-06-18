<template>
    <BaseLayout>
       <template v-slot:content>
          <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
             <ContentLayout title="COMPTABILITES | DA">
                <template v-slot:created>
                   <DAModal name="Ajouter un DA " :title="useUpdateStore().isUpdate.is
                         ? 'Modifier DA'
                         : 'Ajouter DA'
                      " />
 
                   <DeleteLayout title="Ajouter un nouvel categorie" :funDelete="DADelete"
                      :id="useUpdateStore().isDelete.id" />
                </template>
             </ContentLayout>
             <Table v-if="storeDAs.length != 0" :dataTables="storeDAs" :MenuActions="MenuDAActions"
                :display="DATables" />
 
             <PageLoader :loading="setDA.loading" :data="storeDAs" name="Aucune transaction" />
          </section>
       </template>
    </BaseLayout>
 </template>
 <script lang="ts" setup>
 import Table from '@/components/tables/table.vue';
 import BaseLayout from '@/layouts/base.layout.vue';
 import ContentLayout from '@/layouts/content.layout.vue';
 import { MenuDAActions } from '@/routes/actions.route';
 import { onMounted } from 'vue';
 import PageLoader from '@/components/loaders/page.loader.vue';
 import { DATables } from '@/tables/DA.tables';
 import { useDAHook } from '@/hooks/SYSTEME/DA.hook.ts';
 import { useUpdateStore } from '@/stores/update.store';
 import DAModal from '@/components/modals/systemes/DA.modal.vue';
 import DeleteLayout from '@/layouts/delete.layout.vue';
 
 const { FindDAAll, storeDAs, DADelete, setDA } = useDAHook();
 
 onMounted(() => {
    FindDAAll();
 });
 </script>
 <style lang="scss" scoped></style>