<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="R. Humaines | Services ">
          <template v-slot:created>
            <ServiceModal name="Nouveau Service " :title="useUpdateStore().isUpdate.is
              ? 'Modifier Service'
              : 'Ajouter Service'
              " />

            <DeleteLayout title="Ajouter un nouvel categorie" :funDelete="ServiceDelete"></DeleteLayout>
          </template>
        </ContentLayout>
        <Table v-if="storeServices.length != 0" :dataTables="storeServices" :MenuActions="MenuClientActions"
          :display="ServiceTables" />

        <PageLoader :loading="setService.loading" :data="storeServices" name="Aucun service" />
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { MenuClientActions } from "@/routes/actions.route";
import { onMounted } from "vue";
import PageLoader from "@/components/loaders/page.loader.vue";
import { ServiceTables } from "@/tables/service.tables";
import { useServiceHook } from "@/hooks/RH/service.hook.ts";
import ServiceModal from "@/components/modals/service.modal.vue";
import DeleteLayout from "@/layouts/delete.layout.vue";
import { useUpdateStore } from "@/stores/update.store";

const { FindServiceAll, storeServices, ServiceDelete, setService } = useServiceHook();

onMounted(() => {
  FindServiceAll();
});
</script>
<style lang="scss" scoped></style>
@/tables/service.tables
