<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="Proforma | Listes">
               <template v-slot:created>
                  <!-- <ClientdModal
                      name="Nouveau Proforma"
                      title="Nouveau Proforma"
                   /> -->

                  <RouterLink
                     :to="{ name: 'PROFORMA_ADD' }"
                     class="bg-gray-700 font-bold py-2 px-4 rounded-md text-white"
                     >Nouveau proforma</RouterLink
                  >
               </template>
            </ContentLayout>

            <Table
               v-if="useDataStore().Proforma.length != 0"
               :dataTables="useDataStore().Proforma"
               :MenuActions="MenuClientActions"
               :display="ProformaTables"
            />

            <PageLoader
               :loading="state.loading"
               :data="useDataStore().Proforma"
               name="Aucun Proforma"
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
import { ProformaTables } from '@/tables/proforma.tables';

const { readData } = useApiServices();
const state = reactive({
   loading: false,
});

const StatusHtml = (name:string, bg:string) => {
   return `<span class="text-sm font-bold min-w-max px-2 py-1 rounded-md text-center ${bg}" >${name}</span>`
}

const FindAllClient = () => {
   state.loading = true;
   readData(API_URL.PROFORMA_LIST)
      .then((data: any) => {
         useDataStore().Proforma = data.datas.map((el: any) => ({
            numero_proforma: el.numero_proforma,
            titre: el.titre,
            client: el.client?.nom,
            montant_ttc: el.montant_ttc,
            status:
               el.etat == 1
                  ? StatusHtml('En attante', 'bg-orange-500')
                  : el.etat == 2
                  ? StatusHtml('Valider', 'bg-blue-500')
                  : StatusHtml('Rejeter', 'bg-red-500') ,
            date_creation: el.date_creation,
            date_validite: el.date_validite,
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
