<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="CRM | Pospects">
               <template v-slot:created>
                  <ProspectModal
                     name="Nouveau Prospects"
                     title="Nouveau Prospects"
                     description="Ajouter un nouveau prospect"
                     @open="true"
                  />
               </template>
            </ContentLayout>

            <Table  v-if="useDataStore().Prospects.length != 0"
               :dataTables="useDataStore().Prospects"
               :MenuActions="MenuClientActions"
               :display="ProspectTables"/>

               <PageLoader :loading="setProspect.loading" :data="useDataStore().Prospects" name="Aucun prospects" />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import ProspectModal from '@/components/modals/prospect.modal.vue';
import { MenuClientActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import { useDataStore } from '@/stores/data.store';
import PageLoader from '@/components/loaders/page.loader.vue';
import { ProspectTables } from '@/tables/prospect.table';
import { useProspectHook } from '@/hooks/CRM/prospects.hook';

const { FindProspectAll, setProspect } = useProspectHook();

onMounted(() => {
   FindProspectAll();
});
</script>
<style lang="scss" scoped></style>
