<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="COMPTABILITES | Transactions bancaire">
          <template v-slot:created>
            <!-- <div class="flex gap-2">
 
                      <button class="bg-blue-500 rounded-lg px-4 font-bold flex gap-1 items-center" > 
                      <i class="ri-line-chart-line"></i>   
                      <span class="hidden lg:flex">Transactions</span>
                   </button>
                      <Compte_transactionModal
                      name="Ajouter un compte"
                      title="Ajouter un nouvel compte"
                   />
 
                   
                   </div> -->
          </template>
        </ContentLayout>
        <Table
          v-if="storeCompte_transactions.length != 0"
          :dataTables="storeCompte_transactions"
          :MenuActions="MenuCompteTransactionActions"
          :display="CompteTransactionTables"
        />

        <PageLoader
          :loading="setCompte_transaction.loading"
          :data="storeCompte_transactions"
          name="Aucune Compte_transactions"
        />
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { MenuCompteTransactionActions } from "@/routes/actions.route";
import { onMounted } from "vue";
import PageLoader from "@/components/loaders/page.loader.vue";
import { CompteTransactionTables } from "@/tables/compte.tables";
import { useCompte_transactionHook } from "@/hooks/comptabilites/compte_transaction.hook";

const { FindCompte_transactionAll, storeCompte_transactions, setCompte_transaction, } = useCompte_transactionHook();

onMounted(() => {
  FindCompte_transactionAll();
});
</script>
<style lang="scss" scoped></style>
