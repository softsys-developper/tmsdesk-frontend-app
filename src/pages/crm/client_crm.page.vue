<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="CRM | Clients">
               <template v-slot:created>
                  <ClientdModal
                     name="Nouveau Clients"
                     title="Nouveau Clients"
                  />
               </template>
            </ContentLayout>

            <Table
               v-if="useDataStore().Clients.length != 0"
               :dataTables="useDataStore().Clients"
               :MenuActions="MenuClientActions"
               :display="ClientTables"
            />

            <PageLoader
               :loading="state.loading"
               :data="useDataStore().Clients"
               name="Aucun clients"
            />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import ClientdModal from '@/components/modals/client.modal.vue';
import { MenuClientActions } from '@/routes/actions.route';
import { useApiServices } from '@/services/api.services';
import { onMounted, reactive } from 'vue';
import { API_URL } from '@/routes/api.route';
import { useDataStore } from '@/stores/data.store';
import PageLoader from '@/components/loaders/page.loader.vue';
import { ClientTables } from '@/tables/client.tables';

const { readData } = useApiServices();
const state = reactive({
   loading: false,
});



const FindAllClient = () => {
   state.loading = true;
   readData(API_URL.CLIENT_LIST)
      .then((data: any) => {
         useDataStore().Clients = data.datas;
         state.loading = false;
      })
      .catch(() => {
         state.loading = false;
      });
};

onMounted(() => {
   FindAllClient();
});
</script>
<style lang="scss" scoped></style>
