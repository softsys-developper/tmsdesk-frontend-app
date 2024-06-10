<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="R. Humaines | Heure Supplémentaire">
          <template v-slot:created>
            <HeureModal
              name="Nouveau Heures Supplementaire"
              title="Nouveau Heures Supplementaire"
            />
          </template>
        </ContentLayout>

        <Table
          v-if="storeHeures.length != 0"
          :dataTables="storeHeures"
          :MenuActions="MenuClientActions"
          :display="HeureTables"
        />


        <PageLoader
          :loading="setHeure.loading"
          :data="storeHeures"
          name="Aucun heure"
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
import { HeureTables } from "@/tables/heure.tables";
import { useHeureHook } from "@/hooks/RH/heure.hook.ts";
import HeureModal from "@/components/modals/heure.modal.vue";

const { FindHeureAll, storeHeures, setHeure } = useHeureHook();

onMounted(() => {
  FindHeureAll();
});
</script>
<style lang="scss" scoped></style>
@/tables/heure.tables
