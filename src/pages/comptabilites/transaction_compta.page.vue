<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Transactions bancaire">
               <template v-slot:created>
                  <TransactionModal
                     name="Ajouter un transaction"
                     title="Ajouter un nouvel transaction"
                  />
               </template>
            </ContentLayout>
            <Table
               v-if="storeTransactions.length != 0"
               :dataTables="storeTransactions"
               :MenuActions="MenuClientActions"
               :display="TransactionTables"
            />

            <PageLoader
               :loading="setTransaction.loading"
               :data="storeTransactions"
               name="Aucune Transactions"
            />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
// <!-- import TransactionModal from '@/components/modals/transaction.modal.vue'; -->
import { MenuClientActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { TransactionTables } from '@/tables/transaction.tables';
import { useTransactionHook } from '@/hooks/comptabilites/transaction.hook.ts';

const { FindTransactionAll, storeTransactions, setTransaction } = useTransactionHook();

onMounted(() => {
   FindTransactionAll();
});
</script>
<style lang="scss" scoped></style>
