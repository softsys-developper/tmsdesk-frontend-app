<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="Logistique | Bon de commandes">
               <template v-slot:created>
                  <DeleteLayout :funDelete="FindBCFournisseurDelete" :id="useUpdateStore().isDelete.id" />
                  <RouterLink :to="{ name: 'LOGISC_BC_PARTENAIRES_ADD' }"
                     class="bg-orange-500 font-bold py-2 px-4 rounded-md text-white flex gap-1 items-center">
                     <i class="ri-add-line text-sm"></i>
                     <span class="hidden lg:flex">Nouveau BDC</span>
                  </RouterLink>
               </template>
            </ContentLayout>
            <Table v-if="storeBCFournisseurs.length != 0" :dataTables="storeBCFournisseurs"
               :MenuActions="MenuBCFournisseurActions" :display="BCFournisseurTables" />

            <PageLoader :loading="setBCFournisseur.loading" :data="storeBCFournisseurs" name="Aucune BCFournisseurs" />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { MenuBCFournisseurActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { BCFournisseurTables } from '@/tables/LOGISTIQUE/bc_fournisseur.tables';
import { useBCFournisseurHook } from '@/hooks/LOGISTIQUE/bc_fournisseur.hook.ts';
import DeleteLayout from '@/layouts/delete.layout.vue';
import { useUpdateStore } from '@/stores/update.store';

const { FindBCFournisseurAll, storeBCFournisseurs, FindBCFournisseurDelete, setBCFournisseur } = useBCFournisseurHook();

onMounted(() => {
   FindBCFournisseurAll();
});
</script>
<style lang="scss" scoped></style>
