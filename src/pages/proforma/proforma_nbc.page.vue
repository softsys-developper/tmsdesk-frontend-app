<template>
    <BaseLayout>
        <template v-slot:content>
            <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-4">
                <ContentLayout title="Proforma | Ajouter un NBC ">
                    <template v-slot:created> </template>
                </ContentLayout>

                <form @submit.prevent="onSubmit" class="w-11/12 m-auto">
                    <div class="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4">
                        <div class="" v-for="fr in ProformaBCForms">
                            <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type"
                                :placeholder="fr.placeholder" :select="fr.select" />
                        </div>
                    </div>

                    <div class="flex justify-between w-full py-8">
                        <span class=""></span>
                        <button type="submit" class="bg-gray-800 px-4 py-2 font-bold text-white rounded-md"
                            :disabled="setNBC.loadingCreate">
                            <SpinnerLoader size="w-6 h-6" v-if="setNBC.loadingCreate" />
                            <span class="" v-else>Ajouter un NBC</span>
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
import { ProformaBCForms } from "@/forms/CRM/proforma.forms";
import InForm from "@/components/forms/in.form.vue";
import { useNBCHook } from "@/hooks/CRM/NBC.hook";
import { useRoute, useRouter } from "vue-router";

const { CreateNBC, setNBC } = useNBCHook()
const route = useRoute()
const router = useRouter()

const onSubmit = (e: any) => {
    const values = new FormData(e.target);
    values.append('id', JSON.stringify(Number(route.query.id)))
    CreateNBC(values, () => {
        router.push({name: 'PROFORMA_LIST'})
    })
};
</script>
<style lang="scss" scoped></style>
