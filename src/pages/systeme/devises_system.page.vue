<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="Système | Devises">
          <template v-slot:created>
            <!-- <DeviseModal
                      name="Ajouter un devise"
                      title="Ajouter un nouvel devise"
                   /> -->
          </template>
        </ContentLayout>
        <Table
          v-if="storeDevises.length != 0"
          :dataTables="storeDevises"
          :MenuActions="MenuClientActions"
          :display="DeviseTables"
        />

        <PageLoader
          :loading="setDevise.loading"
          :data="storeDevises"
          name="Aucune transaction"
        />
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
// import DeviseModal from '@/components/modals/devise.modal.vue';
import { MenuClientActions } from "@/routes/actions.route";
import { onMounted } from "vue";
import PageLoader from "@/components/loaders/page.loader.vue";
import { DeviseTables } from "@/tables/devise.tables";
import { useDeviseHook } from "@/hooks/SYSTEME/devise.hook.ts";

const { FindDeviseAll, storeDevises, setDevise } = useDeviseHook();

onMounted(() => {
  FindDeviseAll();
});
</script>
<style lang="scss" scoped></style>
