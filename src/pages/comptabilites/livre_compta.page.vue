<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Grand livre">
               <template v-slot:created>
                  <!-- <LivreModal
                     name="Ajouter un livre"
                     title="Ajouter un nouvel livre"
                  /> -->
               </template>
            </ContentLayout>
            <Table
               v-if="storeLivres.length != 0"
               :dataTables="storeLivres"
               :MenuActions="MenuClientActions"
               :display="LivreTables"
            />

            <PageLoader
               :loading="setLivre.loading"
               :data="storeLivres"
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
// import LivreModal from '@/components/modals/livre.modal.vue';
import { MenuClientActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { LivreTables } from '@/tables/livre.tables';
import { useLivreHook } from '@/hooks/comptabilites/livre.hook.ts';

const { FindLivreAll, storeLivres, setLivre } = useLivreHook();

onMounted(() => {
   FindLivreAll();
});
</script>
<style lang="scss" scoped></style>
