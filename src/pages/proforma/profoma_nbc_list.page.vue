<template>
    <BaseLayout>
      <template v-slot:content>
        <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
          <ContentLayout title="Proforma | NBC Listes">
            <template v-slot:created>
              <!-- <ClientdModal
                        name="Nouveau NBC"
                        title="Nouveau NBC"
                     /> -->
  
              <DeleteLayout
                :funDelete="NBCDelete"
                :id="useUpdateStore().isDelete.id"
              />

   
            </template>
          </ContentLayout>
  
          <Table
            v-if="storeNBCs.length != 0"
            :dataTables="storeNBCs"
            :MenuActions="MenuNBCActions"
            :display="NBCTables"
          />
  
          <PageLoader
            :loading="setNBC.loading"
            :data="storeNBCs"
            name="Aucun NBC"
          />
        </section>
      </template>
    </BaseLayout>
  </template>
  <script lang="ts" setup>
  import Table from "./../../components/tables/table.vue";
  import BaseLayout from "./../../layouts/base.layout.vue";
  import ContentLayout from "@/layouts/content.layout.vue";
  import { MenuNBCActions } from "@/routes/actions.route";
  import { onMounted } from "vue";
  import PageLoader from "@/components/loaders/page.loader.vue";
  import { NBCTables } from "@/tables/NBC.tables";
  import { useNBCHook } from "@/hooks/CRM/NBC.hook";
  import DeleteLayout from "@/layouts/delete.layout.vue";
  import { useUpdateStore } from "@/stores/update.store";
  
  const { FindNBCAll, setNBC, storeNBCs, NBCDelete } =
    useNBCHook();
  
  onMounted(() => {
    FindNBCAll();
  });
  </script>
  <style lang="scss" scoped></style>
  