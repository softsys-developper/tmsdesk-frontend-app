<template>
    <BaseLayout>
        <template v-slot:content>
            <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
                <ContentLayout title="CRM | Roles">
                    <template v-slot:created>
                        <RoleModal :name="'Ajouter Roles'" :title="useUpdateStore().isUpdate.is
                            ? 'Modifier Roles'
                            : 'Ajouter Roles'
                            " />

                        <DeleteLayout title="Ajouter un nouvel categorie" :funDelete="RoleDelete"
                            :id="useUpdateStore().isDelete.id" />
                    </template>
                </ContentLayout>

                <Table v-if="useDataStore().Roles.length != 0" :dataTables="storeRoles" :MenuActions="MenuRoleActions"
                    :display="RoleTables" />

                <PageLoader :loading="setRole.loading" :data="useDataStore().Roles" name="Aucun roles" />
            </section>
        </template>
    </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import RoleModal from "@/components/modals/role.modal.vue";
import { MenuRoleActions } from "@/routes/actions.route";
import { computed, onMounted } from "vue";
import { useDataStore } from "@/stores/data.store";
import PageLoader from "@/components/loaders/page.loader.vue";
import { RoleTables } from "@/tables/role.tables";
import { useRoleHook } from "@/hooks/SYSTEME/role.hook";
import { useUpdateStore } from "@/stores/update.store";
import DeleteLayout from "@/layouts/delete.layout.vue";

const { FindRoleAll, RoleDelete, setRole } = useRoleHook();
const storeRoles = computed(() => {
    return useDataStore().Roles;
});

onMounted(() => {
    FindRoleAll();
});
</script>
<style lang="scss" scoped></style>