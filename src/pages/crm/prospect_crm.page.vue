<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="CRM | Prospects">
          <template v-slot:created>
            <div class="flex gap-2 items-center">

              <div class="flex flex-col relative" v-if="useModalStore().Permissions.map((el:any) => el.name).includes('liste-prospects')">
                <span class="text-[10px] text-black absolute px-2">Commercial</span>
                <!-- <SelectedForm type="select" :select="ListCommercial" @input="SeeProspectCommercial" /> -->
                <select name="" id="" @change="SeeProspectCommercial" class="p-3 rounded-md border-[1px] text-sm" >
                  <option :value="0"> Mes Prospects </option>
                  <option v-for="CRMList in ListCommercial" :value="CRMList.id"> {{ CRMList.nom }} </option>
                </select>
              </div>

              <ProspectModal v-if="useModalStore().ProspectStep == false" :name="'Ajouter Prospect'" :title="useUpdateStore().isUpdate.is
                  ? 'Modifier Prospect'
                  : 'Ajouter Prospect'
                " />
              <ProspectStepModal v-if="useModalStore().ProspectStep == true" :name="'Changer étape du prospect'"
                :title="'Changer étape du prospect'" />


              <DeleteLayout name="Ajouter un categorie" title="Ajouter un nouvel categorie" :funDelete="ProspectDelete"
                :id="useUpdateStore().isDelete.id" />
            </div>
          </template>
        </ContentLayout>

        <Table v-if="useDataStore().Prospects.length != 0" :dataTables="useDataStore().Prospects"
          :MenuActions="MenuProspectActions" :display="ProspectTables" />

        <PageLoader :loading="setProspect.loading" :data="useDataStore().Prospects" name="Aucun prospects" />
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
// import SelectedForm from "@/components/forms/selected.form.vue";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
// import { useUtilHook } from "@/hooks/utils.hook";

const { FindProspectAll, setProspect, ProspectDelete, formatProspectData } = useProspectHook();


const ListCommercial = ref()

const SeeProspectCommercial = (e: any) => {
  useDataStore().Prospects = []
  setProspect.loading = true

  if (e.target.value == 0) {
    FindProspectAll()
  } else {
    // Get Prospect Commercial By Id
    useApiServices().showData(API_URL.PROSPECT_COMMERCIAL_BY_USER_LIST, e.target.value).then(({ datas }) => {
      useDataStore().Prospects = formatProspectData(datas)
      setProspect.loading = false
    })
  }


}

onMounted(() => {
  FindProspectAll();
  useApiServices().readData(API_URL.COMMERCIAL_LIST).then(({ datas }) => {
    ListCommercial.value = datas
  })

  // .catch((err:any) => useUtilHook().ServerError(err, toast))
});
</script>
<style lang="scss" scoped></style>
