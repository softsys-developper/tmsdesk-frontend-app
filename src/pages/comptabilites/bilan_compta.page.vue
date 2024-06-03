<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Bilans">
               <template v-slot:created> </template>
            </ContentLayout>
            <Table
               v-if="storeBilans.length != 0"
               :dataTables="storeBilans"
               :MenuActions="MenuClientActions"
               :display="BilanTables"
            />

            <PageLoader
               :loading="setBilan.loading"
               :data="storeBilans"
               name="Aucun bilan"
            />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { MenuClientActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { BilanTables } from '@/tables/bilan.tables';
import { useBilanHook } from '@/hooks/comptabilites/bilan.hook.ts';

const { FindBilanAll, storeBilans, setBilan } = useBilanHook();

onMounted(() => {
   FindBilanAll();
});
</script>
<style lang="scss" scoped></style>
