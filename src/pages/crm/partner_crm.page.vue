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

               <PageLoader :loading="setPartner.loading" :data="useDataStore().Partners" name="Aucun clients" />
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
import { onMounted } from 'vue';
import { useDataStore } from '@/stores/data.store';
import PageLoader from '@/components/loaders/page.loader.vue';
import { PartnerTables } from '@/tables/partner.table';
import { usePartnerHook } from '@/hooks/CRM/partenaires.hook';

const { FindPartnerAll, setPartner } = usePartnerHook();

onMounted(() => {
   FindPartnerAll();
});
 </script>
 <style lang="scss" scoped></style>
 