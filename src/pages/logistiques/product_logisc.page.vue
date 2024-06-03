<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="Logistiques | Produits & Services">
               <template v-slot:created>
                  <ProductModal
                     name="Nouveau produit & service"
                     title="Nouveau produit & service"
                     description="L'ensemble des produits et services de l'entreprise"
                  />
               </template>
            </ContentLayout>

            <Table
               v-if="useDataStore().Products.length != 0"
               :dataTables="useDataStore().Products"
               :MenuActions="MenuClientActions"
               :display="ProductAndServiceTables"
            />

            <PageLoader
               :loading="state.loading"
               :data="useDataStore().Products"
               name="Aucun Produits et services"
            />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import ProductModal from '@/components/modals/product.modal.vue';
import { MenuClientActions } from '@/routes/actions.route';
import { useApiServices } from '@/services/api.services';
import { onMounted, reactive } from 'vue';
import { API_URL } from '@/routes/api.route';
import { useDataStore } from '@/stores/data.store';
import { ProductAndServiceTables } from '@/tables/product.table';
import PageLoader from '@/components/loaders/page.loader.vue';

const { readData } = useApiServices();
const state = reactive({
   loading: false,
});

const FindAllProducts = () => {
   state.loading = true;
   readData(API_URL.PRODUCT_LIST)
      .then((data: any) => {
         useDataStore().Products = data.datas;
         state.loading = false;
      })
      .catch(() => {
         state.loading = false;
      });
};

onMounted(() => {
   FindAllProducts();
});

</script>
<style lang="scss" scoped></style>
