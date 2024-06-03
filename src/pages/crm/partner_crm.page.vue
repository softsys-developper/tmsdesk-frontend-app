<template>
    <BaseLayout>
       <template v-slot:content>
          <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
             <ContentLayout title="CRM | Partenaires" >
                <template v-slot:created>
                   <PartnerModal name="Nouveau Partenaire" />
                </template>
             </ContentLayout>
 
             <Table   v-if="useDataStore().Partners.length != 0"
               :dataTables="useDataStore().Partners"
               :MenuActions="MenuClientActions"
               :display="PartnerTables" />

               <PageLoader :loading="state.loading" :data="useDataStore().Clients" name="Aucun clients" />
          </section>
          
       </template>
    </BaseLayout>
 </template>
 <script lang="ts" setup>
 import Table from './../../components/tables/table.vue';
 import BaseLayout from './../../layouts/base.layout.vue';
 import ContentLayout from '@/layouts/content.layout.vue';
 import PartnerModal from '@/components/modals/partner.modal.vue';
 import {MenuClientActions} from "@/routes/actions.route"
 import { useApiServices } from '@/services/api.services';
import { onMounted, reactive } from 'vue';
import { API_URL } from '@/routes/api.route';
import { useDataStore } from '@/stores/data.store';
import PageLoader from '@/components/loaders/page.loader.vue';
import { PartnerTables } from '@/tables/partner.table';

const { readData } = useApiServices();
const state = reactive({
   loading: false
})

const FindAllPartner = () => {
   state.loading = true
   readData(API_URL.PARTNER_LIST).then((data: any) => {
      useDataStore().Partners = data.datas;
      state.loading = false
   }).catch(() => {
      state.loading = false
   })
}


onMounted(() => {
   FindAllPartner()
});
 </script>
 <style lang="scss" scoped></style>
 