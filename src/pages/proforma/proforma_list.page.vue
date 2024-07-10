<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="Proforma | Listes">
          <template v-slot:created>
            <div class="flex gap-2">

              <div class="flex flex-col relative" v-if="useModalStore().Permissions.map((el:any) => el.name).includes('liste-proformas-par-commercial')">
                <span class="text-[10px] text-black absolute px-2">Commercial</span>
                <!-- <SelectedForm type="select" :select="ListCommercial" @input="SeeProspectCommercial" /> -->
                <select name="" id="" @change="SeeProformaCommercial" class="p-3 rounded-md border-[1px] text-sm" >
                  <option :value="0"> Mes Proformas </option>
                  <option v-for="CRMList in ListCommercial" :value="CRMList.id"> {{ CRMList.nom }} </option>
                </select>
              </div>

              <ProformaState name="Changement status Proforma" title="Changement status Proforma" />

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

        <Table v-if="useDataStore().Proformas.length != 0" :dataTables="useDataStore().Proformas" :MenuActions="MenuProformaActions"
          :display="ProformaTables" />

        <PageLoader :loading="setProforma.loading" :data="useDataStore().Proformas" name="Aucun Proforma" />
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { MenuProformaActions } from "@/routes/actions.route";
import { onMounted, ref } from "vue";
import PageLoader from "@/components/loaders/page.loader.vue";
import { ProformaTables } from "@/tables/proforma.tables";
import { useProformaHook } from "@/hooks/CRM/proforma.hook";
import DeleteLayout from "@/layouts/delete.layout.vue";
import { useUpdateStore } from "@/stores/update.store";
import ProformaState from "@/components/modals/CRM/proforma_state.modal.vue"
// import SelectedForm from "@/components/forms/selected.form.vue";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useDataStore } from "@/stores/data.store";
import { useModalStore } from "@/stores/modal.store";

const { FindProformaAll, setProforma, ProformaDelete, formatProformaData } =
  useProformaHook();

  const ListCommercial = ref()

const SeeProformaCommercial = (e: any) => {
  useDataStore().Proformas = []
  setProforma.loading = true

  if (e.target.value == 0) {
    FindProformaAll()
  } else {
    // Get Prospect Commercial By Id
    useApiServices().showData(API_URL.PROFORMA_COMMERCIAL_BY_USER_LIST, e.target.value).then(({ datas }) => {
      useDataStore().Proformas = formatProformaData(datas)
      console.log(useDataStore().Proformas, datas)
      setProforma.loading = false
    })
  }

}

onMounted(() => {
  FindProformaAll();
  useApiServices().readData(API_URL.COMMERCIAL_LIST).then(({ datas }) => {
    ListCommercial.value = datas
  })

  // .catch((err:any) => useUtilHook().ServerError(err, toast))
});


</script>
<style lang="scss" scoped></style>
