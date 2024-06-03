<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Comptes bancaire">
               <template v-slot:created>
                  <CompteModal
                     name="Ajouter un compte"
                     title="Ajouter un nouvel compte"
                  />
               </template>
            </ContentLayout>
            <Table
               v-if="storeComptes.length != 0"
               :dataTables="storeComptes"
               :MenuActions="MenuClientActions"
               :display="CompteTables"
            />

            <PageLoader
               :loading="setCompte.loading"
               :data="storeComptes"
               name="Aucune Comptes"
            />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import CompteModal from '@/components/modals/compte.modal.vue';
import { MenuClientActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { CompteTables } from '@/tables/compte.tables';
import { useCompteHook } from '@/hooks/comptabilites/compte.hook.ts';

const { FindCompteAll, storeComptes, setCompte } = useCompteHook();

onMounted(() => {
   FindCompteAll();
});
</script>
<style lang="scss" scoped></style>
