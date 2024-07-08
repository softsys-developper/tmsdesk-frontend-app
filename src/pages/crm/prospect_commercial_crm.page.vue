<template>
    <BaseLayout>
      <template v-slot:content>
        <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
          <ContentLayout title="CRM | Prospects">
            <template v-slot:created>
              <ProspectModal  v-if="useModalStore().ProspectStep == false"
                :name="'Ajouter Prospect'"
                :title="
                  useUpdateStore().isUpdate.is
                    ? 'Modifier Prospect'
                    : 'Ajouter Prospect'
                "
              />
              <ProspectStepModal v-if="useModalStore().ProspectStep == true "
                :name="'Changer étape du prospect'"
                :title="'Changer étape du prospect'"
              />
  
              <DeleteLayout
                name="Ajouter un categorie"
                title="Ajouter un nouvel categorie"
                :funDelete="ProspectDelete"
                :id="useUpdateStore().isDelete.id"
              />
            </template>
          </ContentLayout>
  
          <Table
            v-if="useDataStore().Prospects.length != 0"
            :dataTables="useDataStore().Prospects"
            :MenuActions="MenuProspectActions"
            :display="ProspectTables"
          />
  
          <PageLoader
            :loading="setProspect.loading"
            :data="useDataStore().Prospects"
            name="Aucun prospects"
          />
        </section>
      </template>
    </BaseLayout>
  </template>
  <script lang="ts" setup>
  import Table from "./../../components/tables/table.vue";
  import BaseLayout from "./../../layouts/base.layout.vue";
  import ContentLayout from "@/layouts/content.layout.vue";
  import ProspectModal from "@/components/modals/prospect.modal.vue";
  import ProspectStepModal from "@/components/modals/CRM/prospect_step.modal.vue";
  
  import { MenuProspectActions } from "@/routes/actions.route";
  import { onMounted } from "vue";
  import { useDataStore } from "@/stores/data.store";
  import PageLoader from "@/components/loaders/page.loader.vue";
  import { ProspectTables } from "@/tables/prospect.table";
  import { useProspectHook } from "@/hooks/CRM/prospects.hook";
  import { useUpdateStore } from "@/stores/update.store";
  import DeleteLayout from "@/layouts/delete.layout.vue";
  import { useModalStore } from "@/stores/modal.store";
  
  const { FindProspectCommercialAll, setProspect, ProspectDelete } = useProspectHook();
  
  onMounted(() => {
    FindProspectCommercialAll();
  });
  </script>
  <style lang="scss" scoped></style>
  