<template>
    <ModalLayout :Func="onSubmit" :loading="LoadingCreate">
        <template v-slot:form>
            <div class="w-full space-y-2">
                <div class="" v-for="fr in ProformaChangeStateForms">
                    <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type"
                        :placeholder="fr.placeholder" :select="fr.select" />
                </div>
            </div>
        </template>
    </ModalLayout>
</template>
<script lang="ts" setup>
import ModalLayout from "@/layouts/modal.layout.vue";

import { ref } from 'vue';
import { useProformaHook } from "@/hooks/CRM/proforma.hook";
// import { useUpdateStore } from "@/stores/update.store";
import { ProformaChangeStateForms } from "@/forms/CRM/proforma.forms";
//   import {  onMounted } from "vue";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useUtilHook } from "@/hooks/utils.hook";
import InForm from "@/components/forms/in.form.vue";
import { useModalStore } from "@/stores/modal.store";
import { useDataStore } from "@/stores/data.store";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const {  } = useProformaHook();
const { createData } = useApiServices();
const { StatusHtml, ServerError } = useUtilHook();


const LoadingCreate = ref(false)
const onSubmit = (e: any) => {

    LoadingCreate.value = true

    let values = new FormData(e.target);
    values.append('proformaId', `${useModalStore().ProformaId}`)

    createData(API_URL.PROFORMA_CHANGE_STATE, values).then((data:any) => {

        if (data) {
            LoadingCreate.value = false
            const isProforma: any = useDataStore().Proformas.map((el: any) => {
                const STATE = data.data?.etat
                if (el.id == useModalStore().ProformaId) {
                    el.status = STATE == 1
                        ? StatusHtml("En cours", "bg-yellow-400")
                        : STATE == 2
                            ? StatusHtml("Gagné", "bg-green-500")
                            : STATE == 4 ?
                                StatusHtml("Perdu", "bg-red-500")
                                : StatusHtml("Abandonné", "bg-gray-500")
                }
                return {
                    ...el,
                };
            });

            useDataStore().Proformas = isProforma;
            useModalStore().Proforma = false
            useModalStore().open = false
            useModalStore().ProformaId = null

            toast({
        title: "Proforma : Changement d'état...",
        description: data.message,
      });

        }

    }).catch((error:any) => {
        LoadingCreate.value = false
        ServerError(error, toast)
    })
};


</script>

<style lang="scss" scoped></style>