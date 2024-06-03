<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="Logistiques | Livraisons">
               <template v-slot:created>
                  <ClientdModal
                     name="Nouveau Clients"
                     title="Nouveau Clients"
                  />
               </template>
            </ContentLayout>

            <Table
               v-if="useDataStore().Products.length != 0"
               :dataTables="useDataStore().Products"
               :MenuActions="MenuClientActions"
               :display="['nom', 'email', 'telephone', 'adresse']"
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
import { onMounted } from 'vue';
import { API_URL } from '@/routes/api.route';
import { useDataStore } from '@/stores/data.store';

const { readData } = useApiServices();
onMounted(() => {
   readData(API_URL.PRODUCT_LIST).then((data: any) => {
      useDataStore().Products = data.datas;
   });
});
</script>
<style lang="scss" scoped></style>
