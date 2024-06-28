<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Comptes bancaire">
               <template v-slot:created>
                  <div class="flex gap-2">

                     <RouterLink class="h-10" :to="{ name: 'COMPTA_TRANSACTION' }">
                        <button class="bg-blue-500 text-white rounded-lg px-4 h-full font-bold flex gap-1 items-center">
                           <i class="ri-line-chart-line"></i>
                           <span class="hidden lg:flex">Transactions</span>
                        </button>
                     </RouterLink>

                     <CompteModal name="Ajouter un compte" :title="useUpdateStore().isUpdate.is
                           ? 'Modifier Compte'
                           : 'Ajouter Compte'
                        " />

                     <DeleteLayout :funDelete="CompteDelete" :id="useUpdateStore().isDelete.id" />


                  </div>
               </template>
            </ContentLayout>
            <Table v-if="storeComptes.length != 0" :dataTables="storeComptes" :MenuActions="MenuCompteActions"
               :display="CompteTables" />

            <PageLoader :loading="setCompte.loading" :data="storeComptes" name="Aucune Comptes" />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import CompteModal from '@/components/modals/compte.modal.vue';
import { MenuCompteActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { CompteTables } from '@/tables/compte.tables';
import { useCompteHook } from '@/hooks/comptabilites/compte.hook.ts';
import { useUpdateStore } from '@/stores/update.store';
import DeleteLayout from '@/layouts/delete.layout.vue';

const { FindCompteAll, storeComptes, CompteDelete, setCompte } = useCompteHook();

onMounted(() => {
   FindCompteAll();
});
</script>
<style lang="scss" scoped></style>
