<template>
    <BaseLayout>
       <template v-slot:content>
          <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
             <ContentLayout title="COMPTABILITES | Stocks">
                <template v-slot:created>
                   <!-- <StockModal name="Ajouter une stock" :title="useUpdateStore().isUpdate.is
                      ? 'Modifier Stocks'
                      : 'Ajouter Stocks'
                      " /> -->
 
                   <DeleteLayout title="Ajouter un nouvel categorie" :funDelete="StockDelete"
                      :id="useUpdateStore().isDelete.id" />
                </template>
             </ContentLayout>
             <Table v-if="storeStocks.length != 0" :dataTables="storeStocks" :MenuActions="MenuStockActions"
                :display="StockTables" />
 
             <PageLoader :loading="setStock.loading" :data="storeStocks" name="Aucune transaction" />
          </section>
       </template>
    </BaseLayout>
 </template>
 <script lang="ts" setup>
 import Table from '@/components/tables/table.vue';
 import BaseLayout from '@/layouts/base.layout.vue';
 import ContentLayout from '@/layouts/content.layout.vue';
 import { MenuStockActions } from '@/routes/actions.route';
 import { onMounted } from 'vue';
 import PageLoader from '@/components/loaders/page.loader.vue';
 import { StockTables } from '@/tables/LOGISTIQUE/stock.tabes';
 import { useStockHook } from '@/hooks/LOGISTIQUE/stock.hook.ts';
 import { useUpdateStore } from '@/stores/update.store';
 import DeleteLayout from '@/layouts/delete.layout.vue';
 
 const { FindStockAll, storeStocks, StockDelete, setStock } = useStockHook();
 
 onMounted(() => {
    FindStockAll();
 });
 </script>
 <style lang="scss" scoped></style>