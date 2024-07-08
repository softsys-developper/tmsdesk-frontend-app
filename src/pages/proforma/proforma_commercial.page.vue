<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="Proforma | Listes">
          <template v-slot:created>
            <div class="flex gap-2">
              <!-- <ClientdModal
                      name="Nouveau Proforma"
                      title="Nouveau Proforma"
                   /> -->

              <RouterLink :to="{ name: 'PROFORMA_NBC_LIST' }"
                class="bg-blue-500 font-bold py-2 px-4 rounded-md text-white flex gap-1 items-center">
                <i class="ri-sort-number-desc text-sm"></i>
                <span class="hidden lg:flex">Liste des NBC</span>
              </RouterLink>

              <DeleteLayout :funDelete="ProformaDelete" :id="useUpdateStore().isDelete.id" />

              <RouterLink :to="{ name: 'PROFORMA_ADD' }"
                class="bg-orange-500 font-bold py-2 px-4 rounded-md text-white flex gap-1 items-center">
                <i class="ri-add-line text-sm"></i>
                <span class="hidden lg:flex">Nouvelle proforma</span>
              </RouterLink>
            </div>
          </template>
        </ContentLayout>

        <Table v-if="storeProformas.length != 0" :dataTables="storeProformas" :MenuActions="MenuProformaActions"
          :display="ProformaTables" />

        <PageLoader :loading="setProforma.loading" :data="storeProformas" name="Aucun Proforma" />
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { MenuProformaActions } from "@/routes/actions.route";
import { onMounted } from "vue";
import PageLoader from "@/components/loaders/page.loader.vue";
import { ProformaTables } from "@/tables/proforma.tables";
import { useProformaHook } from "@/hooks/CRM/proforma.hook";
import DeleteLayout from "@/layouts/delete.layout.vue";
import { useUpdateStore } from "@/stores/update.store";

const { FindProformaCommercialAll, setProforma, storeProformas, ProformaDelete } =
  useProformaHook();

onMounted(() => {
  FindProformaCommercialAll();
});
</script>
<style lang="scss" scoped></style>

  