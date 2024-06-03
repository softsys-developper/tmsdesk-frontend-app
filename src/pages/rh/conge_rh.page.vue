<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="R. Humaines | Congés">
               <template v-slot:created>
                  <CongeModal name="Nouveau Conges" title="Nouveau Conges" />
               </template>
            </ContentLayout>

            <Table
               v-if="useDataStore().Conges.length != 0"
               :dataTables="useDataStore().Conges"
               :MenuActions="MenuClientActions"
               :display="CongeTables"
            />

            <PageLoader
               :loading="state.loading"
               :data="useDataStore().Conges"
               name="Aucun Conges"
            />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import CongeModal from '@/components/modals/conge.modal.vue';
import { MenuClientActions } from '@/routes/actions.route';
import { useApiServices } from '@/services/api.services';
import { onMounted, reactive } from 'vue';
import { API_URL } from '@/routes/api.route';
import { useDataStore } from '@/stores/data.store';
import PageLoader from '@/components/loaders/page.loader.vue';
import { CongeTables } from '@/tables/conge.table';

const { readData } = useApiServices();
const state = reactive({
   loading: false,
});

const FindAllClient = () => {
   state.loading = true;
   readData(API_URL.CONGE_LIST)
      .then((data: any) => {
         useDataStore().Conges = data.datas;
         useDataStore().Conges = data.datas.map((el: any) => ({
            libelle: el.libelle,
            employe: el.user?.name,
            type: el.type,
            motif: el.motif,
            date_depart: el.date_depart,
            date_retour: el.date_retour,
         }));
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
