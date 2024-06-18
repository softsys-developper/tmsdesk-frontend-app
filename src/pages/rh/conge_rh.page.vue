<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="R. Humaines | Congés">
               <template v-slot:created>
                  <CongeModal name="Nouveau Conges" :title="useUpdateStore().isUpdate.is
                     ? 'Modifier Conges'
                     : 'Ajouter Conges'
                     " />

                  <DeleteLayout :funDelete="CongeDelete" :id="useUpdateStore().isDelete.id" />
               </template>
            </ContentLayout>

            <Table v-if="useDataStore().Conges.length != 0" :dataTables="useDataStore().Conges"
               :MenuActions="MenuCongeActions" :display="CongeTables" />

            <PageLoader :loading="setConge.loading" :data="useDataStore().Conges" name="Aucun Conges" />
         </section>
      </template>

   </BaseLayout>
 
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import CongeModal from '@/components/modals/conge.modal.vue';
import { MenuCongeActions } from '@/routes/actions.route';
import { onMounted } from 'vue';

import { useDataStore } from '@/stores/data.store';
import PageLoader from '@/components/loaders/page.loader.vue';
import { CongeTables } from '@/tables/conge.table';
import { useCongeHook } from '@/hooks/RH/conge.hook';
import { useUpdateStore } from '@/stores/update.store';
import DeleteLayout from '@/layouts/delete.layout.vue';

const { FindCongeAll, CongeDelete, setConge } = useCongeHook()



onMounted(() => {
   FindCongeAll();
});
</script>
<style lang="scss" scoped></style>
