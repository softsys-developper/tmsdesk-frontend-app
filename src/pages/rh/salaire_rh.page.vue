<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="R. Humaines | Paiements salaires">
               <template v-slot:created>
                  <PersonalModal
                     name="Ajouter un employer"
                     title="Ajouter un employer"
                  />
               </template>
            </ContentLayout>

            <Table
               v-if="useDataStore().Salary.length != 0"
               :dataTables="useDataStore().Salary"
               :MenuActions="MenuClientActions"
               :display="SalaryTables"
            />

            <PageLoader
               :loading="state.loading"
               :data="useDataStore().Salary"
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
import { SalaryTables } from '@/tables/salary.table';
import PersonalModal from '@/components/modals/personal.modal.vue';

const { readData } = useApiServices();
const state = reactive({
   loading: false,
});

const FindAllSalaire = () => {
   state.loading = true;
   readData(API_URL.SALAIRE_LIST)
      .then((data: any) => {
         useDataStore().Salary = data.datas.map((salaire:any) => ({
            libelle_salaire: salaire.libelle_salaire,
            montant: salaire.montant
         }));
         state.loading = false;
      })
      .catch(() => {
         state.loading = false;
      });
};

onMounted(() => {
   FindAllSalaire();
});
</script>
<style lang="scss" scoped></style>
