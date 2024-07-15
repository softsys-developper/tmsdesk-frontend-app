<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="R. Humaines | Stagiaires">
          <template v-slot:created>
            <!-- <StagiaireModal
                    useUpdateStore().isUpdate.is
                   ? 'Modifier Clients'
                   : 'Ajouter Clients'
               "
             />-->

            <DeleteLayout
              title="Ajouter un nouvel categorie"
              :funDelete="StagiaireDelete"
              :id="useUpdateStore().isDelete.id"
            />

            <RouterLink
              :to="{ name: 'RH_STAGIAIRE_ADD' }"
              class="bg-gray-700 font-bold py-2 px-4 rounded-md text-white flex gap-1 items-center"
            >
              <i class="ri-add-line text-sm"></i>
              <span class="hidden lg:flex">Nouvel stagiaire</span>
            </RouterLink>
          </template>
        </ContentLayout>

        <Table
          v-if="useDataStore().Stagiaires.length != 0"
          :dataTables="useDataStore().Stagiaires"
          :MenuActions="MenuStagiaireActions"
          :display="StagiaireTables"
        />

        <PageLoader
          :loading="setStagiaire.loading"
          :data="useDataStore().Stagiaires"
          name="Aucun Paid"
        />
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { MenuStagiaireActions } from "@/routes/actions.route";
import { onMounted } from "vue";
import { useDataStore } from "@/stores/data.store";
import PageLoader from "@/components/loaders/page.loader.vue";
import { StagiaireTables } from "@/tables/RH/stagiaire.table";
import { useStagiaireHook } from "@/hooks/RH/stagiaire.hook";
import { useUpdateStore } from "@/stores/update.store";
import DeleteLayout from "@/layouts/delete.layout.vue";
// import StagiaireModal from '@/components/modals/stagiaire.modal.vue';

const { StagiaireDelete, FindStagiaireAll, setStagiaire } = useStagiaireHook();

onMounted(() => {
  FindStagiaireAll();
});
</script>
<style lang="scss" scoped></style>
