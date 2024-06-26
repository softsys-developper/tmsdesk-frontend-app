<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="R. Humaines | Salaires">
               <template v-slot:created>
                  <SalaireModal
                     name="Ajouter un salaire"
                     :title="useUpdateStore().isUpdate.is
                        ? 'Modifier salaire'
                        : 'Ajouter salaire'
                     " />

                  <DeleteLayout :funDelete="SalaireDelete" :id="useUpdateStore().isDelete.id" />
               </template>
            </ContentLayout>

            <Table
               v-if="useDataStore().Salary.length != 0"
               :dataTables="useDataStore().Salary"
               :MenuActions="MenuSalaryActions"
               :display="SalaryTables"
            />

            <PageLoader
               :loading="setSalaire.loading"
               :data="useDataStore().Salary"
               name="Aucun Paid"
            />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { MenuSalaryActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import { useDataStore } from '@/stores/data.store';
import PageLoader from '@/components/loaders/page.loader.vue';
import { SalaryTables } from '@/tables/salary.table';
import SalaireModal from '@/components/modals/salaire.modal.vue';
import { useSalaireHook } from '@/hooks/RH/salary.hook';
import { useUpdateStore } from '@/stores/update.store';
import DeleteLayout from '@/layouts/delete.layout.vue';


const { FindSalaireAll, SalaireDelete, setSalaire } = useSalaireHook()


onMounted(() => {
   FindSalaireAll();
});
</script>
<style lang="scss" scoped></style>
