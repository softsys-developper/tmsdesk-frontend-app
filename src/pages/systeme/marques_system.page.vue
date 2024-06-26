<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Marque">
               <template v-slot:created>
                  <MarqueModal name="Ajouter une marque" :title="useUpdateStore().isUpdate.is
                     ? 'Modifier Marques'
                     : 'Ajouter Marques'
                     " />

                  <DeleteLayout title="Ajouter un nouvel categorie" :funDelete="MarqueDelete"
                     :id="useUpdateStore().isDelete.id" />
               </template>
            </ContentLayout>
            <Table v-if="storeMarques.length != 0" :dataTables="storeMarques" :MenuActions="MenuMarqueActions"
               :display="MarqueTables" />

            <PageLoader :loading="setMarque.loading" :data="storeMarques" name="Aucune transaction" />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from '@/components/tables/table.vue';
import BaseLayout from '@/layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { MenuMarqueActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { MarqueTables } from '@/tables/marque.tables';
import { useMarqueHook } from '@/hooks/SYSTEME/marque.hook.ts';
import { useUpdateStore } from '@/stores/update.store';
import MarqueModal from '@/components/modals/SYSTEME/marque.modal.vue';
import DeleteLayout from '@/layouts/delete.layout.vue';

const { FindMarqueAll, storeMarques, MarqueDelete, setMarque } = useMarqueHook();

onMounted(() => {
   FindMarqueAll();
});
</script>
<style lang="scss" scoped></style>