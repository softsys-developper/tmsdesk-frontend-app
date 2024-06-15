<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="CRM | Fournisseurs">
          <template v-slot:created>
            <FournisseurModal
              :name="'Ajouter fournisseur'"
              :title="
                useUpdateStore().isUpdate.is
                  ? 'Modifier fournisseur'
                  : 'Ajouter fournisseur'
              "
            />

            <DeleteLayout
              :funDelete="FindFournisseurDelete"
              :id="useUpdateStore().isDelete.id"
            />
          </template>
        </ContentLayout>

        <Table
          v-if="useDataStore().Fournisseurs.length != 0"
          :dataTables="useDataStore().Fournisseurs"
          :MenuActions="MenuFournisseurActions"
          :display="FournisseurTables"
        />

        <PageLoader
          :loading="setFournisseur.loading"
          :data="useDataStore().Fournisseurs"
          name="Aucun fournisseur"
        />
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
 import Table from './../../components/tables/table.vue';
 import BaseLayout from './../../layouts/base.layout.vue';
 import ContentLayout from '@/layouts/content.layout.vue';
 import FournisseurModal from '@/components/modals/fournisseur.modal.vue';
 import { MenuFournisseurActions } from '@/routes/actions.route';
 import { onMounted } from 'vue';
 import { useDataStore } from '@/stores/data.store';
 import PageLoader from '@/components/loaders/page.loader.vue';
import { FournisseurTables } from '@/tables/fournisseur.table';
import { useFournisseurHook } from '@/hooks/CRM/fournisseurs.hook';
import DeleteLayout from '@/layouts/delete.layout.vue';
import { useUpdateStore } from '@/stores/update.store';

const { FindFournisseurAll, FindFournisseurDelete, setFournisseur } = useFournisseurHook();

onMounted(() => {
   FindFournisseurAll();
});
</script>
<style lang="scss" scoped></style>
