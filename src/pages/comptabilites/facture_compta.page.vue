<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Depenses">
               <template v-slot:created>
                  <DepenseModal
                     name="Nouvelle depense"
                     title="Ajouter une nouvelle depense"
                  />
               </template>
            </ContentLayout>
            <Table
               v-if="storeDepenses.length != 0"
               :dataTables="storeDepenses"
               :MenuActions="MenuClientActions"
               :display="DepenseTables"
            />

            <PageLoader
               :loading="setDepense.loading"
               :data="storeDepenses"
               name="Aucune depenses"
            />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import DepenseModal from '@/components/modals/depense.modal.vue';
import { MenuClientActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { DepenseTables } from '@/tables/depense.tables';
import { useDepenseHook } from '@/hooks/comptabilites/depense.hook.ts';

const { FindDepenseAll, storeDepenses, setDepense } = useDepenseHook();

onMounted(() => {
   FindDepenseAll();
});
</script>
<style lang="scss" scoped></style>
