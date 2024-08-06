<template>
    <BaseLayout>
        <template v-slot:content>
            <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
                <ContentLayout title="Parametre | jours feries">
                    <template v-slot:created>
                        <HolidayModal :name="'Ajouter jours ferie'" :title="useUpdateStore().isUpdate.is
                            ? 'Modifier jours ferie'
                            : 'Ajouter jours ferie'
                            " />

                        <DeleteLayout title="Ajouter un nouvel categorie" :funDelete="HolidayDelete"
                            :id="useUpdateStore().isDelete.id" />
                    </template>
                </ContentLayout>

                <Table v-if="useDataStore().Holiday.length != 0" :dataTables="storeHoliday" :MenuActions="MenuHolidayActions"
                    :display="HolidayTables" />

                <PageLoader :loading="setHoliday.loading" :data="useDataStore().Holiday" name="Aucun holidays" />
            </section>
        </template>
    </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import HolidayModal from "@/components/modals/SYSTEME/holiday.modal.vue";
import { MenuHolidayActions } from "@/routes/actions.route";
import { computed, onMounted } from "vue";
import { useDataStore } from "@/stores/data.store";
import PageLoader from "@/components/loaders/page.loader.vue";
import { HolidayTables } from "@/tables/SYSTEME/holiday.tables";
import { useHolidayHook } from "@/hooks/SYSTEME/holiday.hook";
import { useUpdateStore } from "@/stores/update.store";
import DeleteLayout from "@/layouts/delete.layout.vue";

const { FindHolidayAll, HolidayDelete, setHoliday } = useHolidayHook();
const storeHoliday = computed(() => {
    return useDataStore().Holiday;
});

onMounted(() => {
    FindHolidayAll();
});
</script>
<style lang="scss" scoped></style>