<template>
    <BaseLayout>
        <template v-slot:content>
            <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-4">
                <ContentLayout title="Proforma | Creation ">
                    <template v-slot:created> </template>
                </ContentLayout>

                <form @submit.prevent="onSubmit" class=" w-11/12 m-auto ">

                    <div class="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 ">
                        <div class="" v-for="fr in ProformaBCForms">
                            <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type"
                                :placeholder="fr.placeholder" :select="fr.select" />
                        </div>
                    </div>


                    <div class="p-8 flex justify-between w-full">
                        <span class=""></span>
                        <button type="submit" class="bg-gray-800 px-4 py-2 font-bold text-white rounded-md"
                            :disabled="setProformaBC.loadingCreate">
                            <SpinnerLoader size="w-6 h-6" v-if="setProformaBC.loadingCreate" />
                            <span class="" v-else>Crée un employer</span>
                        </button>
                    </div>
                </form>

            </section>
        </template>
    </BaseLayout>

    <!-- {{ ProductAndServices }} -->
</template>
<script lang="ts" setup>
import SpinnerLoader from "@/components/loaders/spinner.loading.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useToast } from "@/components/ui/toast/use-toast";
import { reactive } from "vue";
import { ProformaBCForms } from "@/forms/CRM/proforma.forms";
const { toast } = useToast();

const { createData } = useApiServices();
const setProformaBC = reactive({
    loadingCreate: false
})


const onSubmit = (e: any) => {

    const values = new FormData(e.target)

    createData(API_URL.PROFORMA_CREATE, values).then(() => {
        toast({})
    })
}


</script>
<style lang="scss" scoped></style>