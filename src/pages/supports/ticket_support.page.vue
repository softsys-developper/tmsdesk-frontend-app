<template>
    <BaseLayout>
        <template v-slot:content>
            <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
                <ContentLayout title="Supports | Tickets">
                    <template v-slot:created>
                        <TicketModal :name="useUpdateStore().isUpdate.is ? 'Ajouter un ticket' : ''"
                            :title="useUpdateStore().isUpdate.is ? 'Modifier le ticket' : 'Modifier le ticket'" />
                        <DeleteLayout name="Ajouter un ticket" title="Ajouter un nouvel ticket"
                            :funDelete="TicketDelete" :id="useUpdateStore().isDelete.id" />
                    </template>
                </ContentLayout>

                <Table v-if="storeTickets.length != 0" :dataTables="storeTickets" :MenuActions="MenuTicketActions"
                    :display="TicketTables" />

                <PageLoader :loading="setTicket.loading" :data="storeTickets" name="Aucune transaction" />
            </section>
        </template>
    </BaseLayout>
</template>
<script lang="ts" setup>
import Table from "./../../components/tables/table.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import TicketModal from "@/components/modals/SUPPORT/ticket.modal.vue";
import { MenuTicketActions } from "@/routes/actions.route";
import { onMounted } from "vue";
import PageLoader from "@/components/loaders/page.loader.vue";
import { TicketTables } from "@/tables/SUPPORT/ticket.tables.ts";
import { useTicketHook } from "@/hooks/SUPPORT/ticket.hook.ts";
import DeleteLayout from "@/layouts/delete.layout.vue";
import { useUpdateStore } from "@/stores/update.store";

const { FindTicketAll, TicketDelete, storeTickets, setTicket } = useTicketHook();

onMounted(() => {
    FindTicketAll();
});
</script>
<style lang="scss" scoped></style>