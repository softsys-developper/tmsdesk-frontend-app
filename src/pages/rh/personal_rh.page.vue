<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="R. Humaines | Employés">
               <template v-slot:created>
                  <!-- <PersonalModal
                   useUpdateStore().isUpdate.is
                  ? 'Modifier Clients'
                  : 'Ajouter Clients'
              "
            />-->

                  <DeleteLayout title="Ajouter un nouvel categorie" :funDelete="PersonalDelete"
                     :id="useUpdateStore().isDelete.id" />

                  <RouterLink :to="{ name: 'RH_PERSONAL_ADD' }"
                     class="bg-gray-700 font-bold py-2 px-4 rounded-md text-white flex gap-1 items-center">
                     <i class="ri-add-line text-sm"></i>
                     <span class="hidden lg:flex">Nouvel employer</span>
                  </RouterLink>


               </template>
            </ContentLayout>

            <Table v-if="useDataStore().Personals.length != 0" :dataTables="useDataStore().Personals"
               :MenuActions="MenuPersonalActions" :display="PersonalTables" />

            <PageLoader :loading="setPersonal.loading" :data="useDataStore().Personals" name="Aucun Paid" />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { MenuPersonalActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import { useDataStore } from '@/stores/data.store';
import PageLoader from '@/components/loaders/page.loader.vue';
import { PersonalTables } from '@/tables/personal.table';
import { usePersonalHook } from '@/hooks/RH/personal.hook';
import { useUpdateStore } from '@/stores/update.store';
import DeleteLayout from '@/layouts/delete.layout.vue';
// import PersonalModal from '@/components/modals/personal.modal.vue';

const { PersonalDelete, FindPersonalAll, setPersonal } = usePersonalHook()

onMounted(() => {
   FindPersonalAll();
});
</script>
<style lang="scss" scoped></style>
