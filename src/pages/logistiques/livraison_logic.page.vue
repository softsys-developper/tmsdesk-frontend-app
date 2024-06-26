<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="Logistique | Livraisons">
               <template v-slot:created>
                  <RouterLink :to="{ name: 'LOGISC_LIVRAISONS_ADD' }"
                class="bg-orange-500 font-bold py-2 px-4 rounded-md text-white flex gap-1 items-center">
                <i class="ri-add-line text-sm"></i>
                <span class="hidden lg:flex">Nouvelle livraison</span>
              </RouterLink>

              <DeleteLayout :funDelete="LivraisonDelete" :id="useUpdateStore().isDelete.id" />
               </template>
            </ContentLayout>
            <Table
               v-if="storeLivraisons.length != 0"
               :dataTables="storeLivraisons"
               :MenuActions="MenuLivraisonActions"
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
import { MenuLivraisonActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { LivraisonTables } from '@/tables/livraison.tables';
import { useLivraisonHook } from '@/hooks/LOGISTIQUE/livraison.hook.ts';
import { useUpdateStore } from '@/stores/update.store';
import DeleteLayout from '@/layouts/delete.layout.vue';

const { FindLivraisonAll, storeLivraisons, LivraisonDelete, setLivraison } = useLivraisonHook();

onMounted(() => {
   FindLivraisonAll();
});
</script>
<style lang="scss" scoped></style>
