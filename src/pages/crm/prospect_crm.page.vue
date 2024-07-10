<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="CRM | Prospects">
          <template v-slot:created>
            <div class="flex gap-2 items-center">

              <div class="flex flex-col relative">
                <span class="text-[10px] text-black absolute px-2" >Commercial</span>
                <SelectedForm type="select" :select="ListCommercial" />
              </div>

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
            </div>
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
import { onMounted, ref } from "vue";
import { useDataStore } from "@/stores/data.store";
import PageLoader from "@/components/loaders/page.loader.vue";
import { ProspectTables } from "@/tables/prospect.table";
import { useProspectHook } from "@/hooks/CRM/prospects.hook";
import { useUpdateStore } from "@/stores/update.store";
import DeleteLayout from "@/layouts/delete.layout.vue";
import { useModalStore } from "@/stores/modal.store";
import SelectedForm from "@/components/forms/selected.form.vue";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
// import { useUtilHook } from "@/hooks/utils.hook";

const { FindProspectAll, setProspect, ProspectDelete } = useProspectHook();


const ListCommercial = ref()

onMounted(() => {
  FindProspectAll();
  useApiServices().readData(API_URL.COMMERCIAL_LIST).then(({datas}) => {
    ListCommercial.value = datas
  })

  // .catch((err:any) => useUtilHook().ServerError(err, toast))
});
</script>
<style lang="scss" scoped></style>
