<template>
    <BaseLayout>
      <template v-slot:content>
        <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
          <ContentLayout :title="'CRM | ' + IsRapport">
            <template v-slot:created>
              <RapportModal
                :name="'Ajouter Rapport'"
                :title="
                  useUpdateStore().isUpdate.is
                    ? 'Modifier Rapport'
                    : 'Ajouter Rapport'
                "
              />
  
              <DeleteLayout
                name="Ajouter un categorie"
                title="Ajouter un nouvel categorie"
                :funDelete="RapportDelete"
                :id="useUpdateStore().isDelete.id"
              />
            </template>
          </ContentLayout>
  
          <Table
            v-if="useDataStore().Rapports.length != 0"
            :dataTables="useDataStore().Rapports"
            :MenuActions="MenuRapportActions"
            :display="RapportTables"
          />
  
          <PageLoader
            :loading="setRapport.loading"
            :data="useDataStore().Rapports"
            name="Aucun rapports"
          />
        </section>
      </template>
    </BaseLayout>
  </template>
  <script lang="ts" setup>
  import Table from "./../../components/tables/table.vue";
  import BaseLayout from "./../../layouts/base.layout.vue";
  import ContentLayout from "@/layouts/content.layout.vue";
  import RapportModal from "@/components/modals/CRM/rapport.modal.vue";
  import { MenuRapportActions } from "@/routes/actions.route";
  import { onMounted, ref } from "vue";
  import { useDataStore } from "@/stores/data.store";
  import PageLoader from "@/components/loaders/page.loader.vue";
  import { RapportTables } from "@/tables/rapport.table";
  import { useRapportHook } from "@/hooks/CRM/rapport.hook";
  import { useUpdateStore } from "@/stores/update.store";
  import DeleteLayout from "@/layouts/delete.layout.vue";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useRoute } from "vue-router";
import moment from "moment";
  
  const { setRapport, RapportDelete } = useRapportHook();
  const {  showData } = useApiServices()
  const route = useRoute()
  const IsRapport = ref('')
  
  onMounted(() => {
    // console.log(route?.query.id)
    useDataStore().Rapports = []
    setRapport.loading = true
    showData(API_URL.RAPPORT_DETAIL, route?.query.id).then((data) => {
      setRapport.loading = false
      IsRapport.value = data.message
      useDataStore().Rapports = data.data.map((Rapport:any) => ({
        id: Rapport.id,
      message: Rapport.message,
      date_creation: moment(Rapport.created_at).format("DD/MM/YYYY"),
      }))
    })
    // FindRapportAll();
  });
  </script>
  <style lang="scss" scoped></style>
  