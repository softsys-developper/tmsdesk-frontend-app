<template>
    <BaseLayout>
       <template v-slot:content>
          <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
             <ContentLayout title="Parametre | utilisateurs">
                <template v-slot:created>
                   <PersonalModal
                      name="Ajouter un employer"
                      title="Ajouter un employer"
                   />
                </template>
             </ContentLayout>
 
             <Table
                v-if="useDataStore().Personals.length != 0"
                :dataTables="useDataStore().Personals"
                :MenuActions="MenuPersonalActions"
                :display="PersonalUserTables"
             />
 
             <PageLoader
                :loading="state.loading"
                :data="useDataStore().Personals"
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
 import { MenuPersonalActions } from '@/routes/actions.route';
 import { useApiServices } from '@/services/api.services';
 import { onMounted, reactive } from 'vue';
 import { API_URL } from '@/routes/api.route';
 import { useDataStore } from '@/stores/data.store';
 import PageLoader from '@/components/loaders/page.loader.vue';
 import {  PersonalUserTables } from '@/tables/personal.table';
 import PersonalModal from '@/components/modals/personal.modal.vue';
 
 const { readData } = useApiServices();
 const state = reactive({
    loading: false,
 });
 
 const FindAllClient = () => {
    state.loading = true;
    readData(API_URL.USER_LIST)
       .then((data: any) => {
          console.log(data)
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
 