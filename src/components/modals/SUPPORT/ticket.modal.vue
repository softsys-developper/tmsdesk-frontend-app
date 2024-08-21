<template>
    <ModalLayout :Func="onSubmit" :loading="setTicket.loadingCreate" permissions="ajouter-prospect">
        <template v-slot:form>
            <div class="w-full space-y-2">
                <div class="" v-for="fr in TicketForms">
                    <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type"
                        :placeholder="fr.placeholder" :select="fr.select" />
                </div>
            </div>
        </template>
    </ModalLayout>
</template>
<script lang="ts" setup>
import ModalLayout from "@/layouts/modal.layout.vue";
import { useTicketHook } from "@/hooks/SUPPORT/ticket.hook";
import { useUpdateStore } from "@/stores/update.store";
import { TicketForms } from "@/forms/SUPPORT/ticket.forms";
import InForm from "../../forms/in.form.vue";
import { onMounted } from "vue";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useUtilHook } from "@/hooks/utils.hook";

const { CreateTicket, TicketUpdate, setTicket } = useTicketHook();
const { readData } = useApiServices()
const { remplacerObjetDansTableau } = useUtilHook()

const onSubmit = (e: any) => {
    console.log(useUpdateStore().isUpdate)
    let values = new FormData(e.target);
    if (useUpdateStore().isUpdate.is) {
        TicketUpdate(useUpdateStore().isUpdate.id, values);
    } else {
        CreateTicket(values);
    }
};

onMounted(() => {
    readData(API_URL.PROSPECT_LIST).then((data) => remplacerObjetDansTableau(TicketForms, 'name', 'prospect', data.datas))
})

</script>
<style lang="scss" scoped></style>