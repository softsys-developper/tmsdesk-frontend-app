<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="R. Humaines | Paiements salaires">
               <template v-slot:created>
                  <PaidModal name="Paiement" :title="useUpdateStore().isUpdate.is
                        ? 'Modifier paiement'
                        : 'Ajouter paiement'
                     " />

                  <DeleteLayout :funDelete="PaidDelete" :id="useUpdateStore().isDelete.id" />
               </template>
            </ContentLayout>

            <Table v-if="useDataStore().Paids.length != 0" :dataTables="useDataStore().Paids"
               :MenuActions="MenuPaidActions" :display="PaidTables" />

            <PageLoader :loading="setPaid.loading" :data="useDataStore().Paids" name="Aucun Paid" />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { MenuPaidActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import { useDataStore } from '@/stores/data.store';
import PageLoader from '@/components/loaders/page.loader.vue';
import { PaidTables } from '@/tables/paid.table';
import { useUpdateStore } from '@/stores/update.store';
import { usePaidHook } from '@/hooks/RH/paid.hook';
import DeleteLayout from '@/layouts/delete.layout.vue';
import PaidModal from '@/components/modals/RH/paid.modal.vue';



const { FindPaidAll, PaidDelete, setPaid } = usePaidHook();

onMounted(() => {
   FindPaidAll();
});


</script>
<style lang="scss" scoped></style>
