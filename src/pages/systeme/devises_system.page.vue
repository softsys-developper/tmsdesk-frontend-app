<template>
  <BaseLayout>
     <template v-slot:content>
        <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
           <ContentLayout title="COMPTABILITES | Devise">
              <template v-slot:created>
                 <DeviseModal name="Ajouter une devise" :title="useUpdateStore().isUpdate.is
                       ? 'Modifier Devises'
                       : 'Ajouter Devises'
                    " />

                 <DeleteLayout title="Ajouter un nouvel categorie" :funDelete="DeviseDelete"
                    :id="useUpdateStore().isDelete.id" />
              </template>
           </ContentLayout>
           <Table v-if="storeDevises.length != 0" :dataTables="storeDevises" :MenuActions="MenuDeviseActions"
              :display="DeviseTables" />

           <PageLoader :loading="setDevise.loading" :data="storeDevises" name="Aucune transaction" />
        </section>
     </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import Table from '@/components/tables/table.vue';
import BaseLayout from '@/layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { MenuDeviseActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { DeviseTables } from '@/tables/devise.tables';
import { useDeviseHook } from '@/hooks/SYSTEME/devise.hook.ts';
import { useUpdateStore } from '@/stores/update.store';
import DeviseModal from '@/components/modals/SYSTEME/devise.modal.vue';
import DeleteLayout from '@/layouts/delete.layout.vue';


const { FindDeviseAll, storeDevises, DeviseDelete, setDevise } = useDeviseHook();

onMounted(() => {
  FindDeviseAll();
});
</script>
<style lang="scss" scoped></style>