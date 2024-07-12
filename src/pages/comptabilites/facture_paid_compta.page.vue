<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout :title="'Facture | Versements ' + (setFacturePaid.facture.numero_facture != undefined ? setFacturePaid.facture.numero_facture : '') ">
          <template v-slot:created>
            <FacturePaidModal name="Nouveau versement" :title="useUpdateStore().isUpdate.is
                ? 'Modifier le versement'
                : 'Nouveau versement'
              " />

            <DeleteLayout :funDelete="FacturePaidDelete" :id="useUpdateStore().isDelete.id" />
          </template>
        </ContentLayout>
        <Table v-if="storeFacturePaids.length != 0" :dataTables="storeFacturePaids"
          :MenuActions="MenuFacturePaidClientActions" :display="FacturePaidTables" />

        <PageLoader :loading="setFacturePaid.loading" :data="storeFacturePaids" name="Aucune facture_paids" />
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { MenuFacturePaidClientActions } from "@/routes/actions.route";
import { onMounted } from "vue";
import PageLoader from "@/components/loaders/page.loader.vue";
import { FacturePaidTables } from "@/tables/facture_paid.tables";
import { useFacturePaidHook } from "@/hooks/comptabilites/facture_paid.hook.ts";
import DeleteLayout from "@/layouts/delete.layout.vue";
import { useUpdateStore } from "@/stores/update.store";
import FacturePaidModal from "@/components/modals/COMPTABILITE/facture_paid.modal.vue";
import { useRoute } from "vue-router";
const route = useRoute()

const {
  storeFacturePaids,
  FacturePaidDelete,
  FindFacturePaidOne,
  setFacturePaid,
} = useFacturePaidHook();

onMounted(() => {
  FindFacturePaidOne(route.query.id);
});
</script>
<style lang="scss" scoped></style>
