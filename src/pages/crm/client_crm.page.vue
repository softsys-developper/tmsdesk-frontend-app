<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="CRM | Clients">
          <template v-slot:created>
            <ClientdModal
              :name="'Ajouter Clients'"
              :title="
                useUpdateStore().isUpdate.is
                  ? 'Modifier Clients'
                  : 'Ajouter Clients'
              "
            />

            <DeleteLayout
              title="Ajouter un nouvel categorie"
              :funDelete="ClientDelete"
              :id="useUpdateStore().isDelete.id"
            />
          </template>
        </ContentLayout>

        <Table
          v-if="useDataStore().Clients.length != 0"
          :dataTables="storeClients"
          :MenuActions="MenuClientActions"
          :display="ClientTables"
        />

        <PageLoader
          :loading="setClient.loading"
          :data="useDataStore().Clients"
          name="Aucun clients"
        />
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import ClientdModal from "@/components/modals/client.modal.vue";
import { MenuClientActions } from "@/routes/actions.route";
import { computed, onMounted } from "vue";
import { useDataStore } from "@/stores/data.store";
import PageLoader from "@/components/loaders/page.loader.vue";
import { ClientTables } from "@/tables/client.tables";
import { useClientHook } from "@/hooks/CRM/client.hook";
import { useUpdateStore } from "@/stores/update.store";

const { FindClientAll,   ClientDelete, setClient } = useClientHook();
const storeClients = computed(() => {
    return useDataStore().Clients;
  });

onMounted(() => {
  FindClientAll();
});
</script>
<style lang="scss" scoped></style>
