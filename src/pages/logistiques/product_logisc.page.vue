<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="Logistiques | Produits & Services">
               <template v-slot:created>
                  

                  <div class="flex gap-1">
                     <!-- <ProductModal v-if="useModalStore().Stocks == false && useModalStore().open == false" name="Nouveau produit & service" :title="useUpdateStore().isUpdate.is
                     ? 'Modifier produit & service'
                     : 'Ajouter produit & service'
                     " /> -->

                  <StockModal :isCloseBtn="true" name="" :title="'Ajouter en stock'"  />
                  </div>

                  <DeleteLayout :funDelete="ProductDelete" :id="useUpdateStore().isDelete.id" />
               </template>
            </ContentLayout>

            <Table v-if="useDataStore().Products.length != 0" :dataTables="useDataStore().Products"
               :MenuActions="MenuProductActions" :display="ProductAndServiceTables" />

            <PageLoader :loading="setProduct.loading" :data="useDataStore().Products"
               name="Aucun Produits et services" />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { MenuProductActions } from '@/routes/actions.route';
import { useDataStore } from '@/stores/data.store';
import { ProductAndServiceTables } from '@/tables/product.table';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import DeleteLayout from '@/layouts/delete.layout.vue';
import { useUpdateStore } from '@/stores/update.store';
import { useProductHook } from '@/hooks/LOGISTIQUE/product.hook';
import StockModal from '@/components/modals/LOGISTIQUE/stock.modal.vue';

const { FindProductAll, ProductDelete, setProduct } = useProductHook();

onMounted(() => {
   FindProductAll();
});

</script>
<style lang="scss" scoped></style>
