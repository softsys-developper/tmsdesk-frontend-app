<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Bon de commandes">
               <template v-slot:created> </template>
            </ContentLayout>
            <Table
               v-if="storeBCs.length != 0"
               :dataTables="storeBCs"
               :MenuActions="MenuClientActions"
               :display="BCTables"
            />

            <PageLoader
               :loading="setBC.loading"
               :data="storeBCs"
               name="Aucune BCs"
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
import { BCTables } from '@/tables/bc.tables';
import { useBCHook } from '@/hooks/comptabilites/bc.hook.ts';

const { FindBCAll, storeBCs, setBC } = useBCHook();

onMounted(() => {
   FindBCAll();
});
</script>
<style lang="scss" scoped></style>
