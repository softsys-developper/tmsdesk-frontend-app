<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="Système | Catégories">
          <template v-slot:created>
            <CategorieModal
              :name="useUpdateStore().isUpdate.is ? 'Ajouter un categorie' : ''"
              :title="useUpdateStore().isUpdate.is ? 'Modifier le categorie' : 'Modifier le categorie'"
            />
            <DeleteLayout
              name="Ajouter un categorie"
              title="Ajouter un nouvel categorie"
              :funDelete="CategorieDelete"
              :id="useUpdateStore().isDelete.id"
            />
          </template>
        </ContentLayout>

        <Table
          v-if="storeCategories.length != 0"
          :dataTables="storeCategories"
          :MenuActions="MenuCategorieActions"
          :display="CategorieTables"
        />

        <PageLoader
          :loading="setCategorie.loading"
          :data="storeCategories"
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
import CategorieModal from "@/components/modals/SYSTEME/categorie.modal.vue";
import { MenuCategorieActions } from "@/routes/actions.route";
import { onMounted } from "vue";
import PageLoader from "@/components/loaders/page.loader.vue";
import { CategorieTables } from "@/tables/categorie.tables";
import { useCategorieHook } from "@/hooks/SYSTEME/categorie.hook.ts";
import DeleteLayout from "@/layouts/delete.layout.vue";
import { useUpdateStore } from "@/stores/update.store";

const { FindCategorieAll, CategorieDelete, storeCategories, setCategorie } = useCategorieHook();



onMounted(() => {
  FindCategorieAll();
});
</script>
<style lang="scss" scoped></style>
