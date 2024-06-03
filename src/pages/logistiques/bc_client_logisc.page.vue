<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="Logistique | Bon de commande">
               <template v-slot:created>
                 
               </template>
            </ContentLayout>

            <Table
               v-if="useDataStore().BC.length != 0"
               :dataTables="useDataStore().BC"
               :MenuActions="MenuClientActions"
               :display="ClientTables"
            />

            <PageLoader
               :loading="state.loading"
               :data="useDataStore().BC"
               name="Aucun BC"
            />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
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



const FindAllBC = () => {
   state.loading = true;
   readData(API_URL.BC_LIST)
      .then((data: any) => {
         useDataStore().BC = data.datas;
         state.loading = false;
      })
      .catch(() => {
         state.loading = false;
      });
};

onMounted(() => {
   FindAllBC();
});
</script>
<style lang="scss" scoped></style>
