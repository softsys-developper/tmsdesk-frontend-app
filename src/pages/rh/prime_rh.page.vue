<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="R. Humaines | Prime et indemnité ">
          <template v-slot:created>
            <PrimeModal
              name="Nouvelle Prime et indemnité "
              title="Nouvelle Prime et indemnité "
            />
          </template>
        </ContentLayout>
        <Table
          v-if="storePrimes.length != 0"
          :dataTables="storePrimes"
          :MenuActions="MenuClientActions"
          :display="PrimeTables"
        />

        <PageLoader
          :loading="setPrime.loading"
          :data="storePrimes"
          name="Aucun prime"
        />
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { MenuClientActions } from "@/routes/actions.route";
import { onMounted } from "vue";
import PageLoader from "@/components/loaders/page.loader.vue";
import { PrimeTables } from "@/tables/prime.tables";
import { usePrimeHook } from "@/hooks/RH/prime.hook.ts";
import PrimeModal from "@/components/modals/prime.modal.vue";

const { FindPrimeAll, storePrimes, setPrime } = usePrimeHook();

onMounted(() => {
  FindPrimeAll();
});
</script>
<style lang="scss" scoped></style>
@/tables/prime.tables
