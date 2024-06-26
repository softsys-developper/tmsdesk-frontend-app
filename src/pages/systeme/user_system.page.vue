<template>
    <BaseLayout>
       <template v-slot:content>
          <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
             <ContentLayout title="Parametre | utilisateurs">
                <template v-slot:created>
                   <UserModal
                      name="Nouvel utilisateur"
                      :title="useUpdateStore().isUpdate.is
                            ? 'Modifier utilisateurs'
                            : 'Ajouter utilisateurs'
                            " />

                        <DeleteLayout title="Ajouter un nouvel categorie" :funDelete="UserDelete"
                            :id="useUpdateStore().isDelete.id" />
                </template>
             </ContentLayout>
 
             <Table
                v-if="useDataStore().Users.length != 0"
                :dataTables="useDataStore().Users"
                :MenuActions="MenuUserActions"
                :display="UserTables"
             />
 
             <PageLoader
                :loading="setUser.loading"
                :data="useDataStore().Users"
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
 import { MenuUserActions } from '@/routes/actions.route';
 import { useApiServices } from '@/services/api.services';
 import { onMounted } from 'vue';
//  import { API_URL } from '@/routes/api.route';
 import { useDataStore } from '@/stores/data.store';
 import PageLoader from '@/components/loaders/page.loader.vue';
 import {  UserTables } from '@/tables/personal.table';
 import UserModal from '@/components/modals/SYSTEME/user.modal.vue';
import { useUpdateStore } from '@/stores/update.store';
import { useUserHook } from '@/hooks/PARAMETRE/user.hook';
import DeleteLayout from '@/layouts/delete.layout.vue';
 
 const {  } = useApiServices();
 const { FindUserAll, UserDelete, setUser } = useUserHook();


onMounted(() => {
    FindUserAll();
});
 </script>
 <style lang="scss" scoped></style>
 