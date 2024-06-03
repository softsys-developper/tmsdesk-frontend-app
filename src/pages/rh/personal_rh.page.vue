<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="R. Humaines | Employés">
               <template v-slot:created>
                  <PersonalModal
                     name="Ajouter un employer"
                     title="Ajouter un employer"
                  />
               </template>
            </ContentLayout>

            <Table
               v-if="useDataStore().Paid.length != 0"
               :dataTables="useDataStore().Personals"
               :MenuActions="MenuClientActions"
               :display="PersonalTables"
            />

            <PageLoader
               :loading="state.loading"
               :data="useDataStore().Paid"
               name="Aucun Paid"
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
import { PersonalTables } from '@/tables/personal.table';
import PersonalModal from '@/components/modals/personal.modal.vue';

const { readData } = useApiServices();
const state = reactive({
   loading: false,
});

const FindAllClient = () => {
   state.loading = true;
   readData(API_URL.USER_LIST)
      .then((data: any) => {
         useDataStore().Personals = data.datas;
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
