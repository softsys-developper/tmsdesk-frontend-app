<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Livraisons">
               <template v-slot:created>
                  <!-- <LivraisonModal
                     name="Ajouter un livraison"
                     title="Ajouter un nouvel livraison"
                  /> -->
               </template>
            </ContentLayout>
            <Table
               v-if="storeLivraisons.length != 0"
               :dataTables="storeLivraisons"
               :MenuActions="MenuClientActions"
               :display="LivraisonTables"
            />

            <PageLoader
               :loading="setLivraison.loading"
               :data="storeLivraisons"
               name="Aucune Livraisons"
            />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
// import LivraisonModal from '@/components/modals/livraison.modal.vue';
import { MenuClientActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { LivraisonTables } from '@/tables/livraison.tables';
import { useLivraisonHook } from '@/hooks/comptabilites/livraison.hook.ts';

const { FindLivraisonAll, storeLivraisons, setLivraison } = useLivraisonHook();

onMounted(() => {
   FindLivraisonAll();
});
</script>
<style lang="scss" scoped></style>
