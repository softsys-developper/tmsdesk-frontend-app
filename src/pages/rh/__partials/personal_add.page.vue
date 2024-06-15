<template>
    <BaseLayout>
        <template v-slot:content>
            <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-4">
                <ContentLayout title="Employer | Creation ">
                    <template v-slot:created> </template>
                </ContentLayout>

                <form @submit.prevent="onSubmit" class=" w-11/12 m-auto pb-32">

                    <div class="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 ">
                        <div class="" v-for="fr in PersonalForms">
                            <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type"
                                :placeholder="fr.placeholder" :select="fr.select" />
                        </div>
                    </div>


                    <div class="p-8 flex justify-between w-full">
                        <span class=""></span>
                        <button type="submit" class="bg-gray-800 px-4 py-2 font-bold text-white rounded-md"
                            :disabled="setPersonal.loadingCreate">
                            <SpinnerLoader size="w-6 h-6" v-if="setPersonal.loadingCreate" />
                            <span class="" v-else>Crée la proforma</span>
                        </button>
                    </div>
                </form>

            </section>
        </template>
    </BaseLayout>

    <!-- {{ ProductAndServices }} -->
</template>
<script lang="ts" setup>
import BaseLayout from "@/layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { PersonalForms } from "@/forms/RH/personal.froms";
import InForm from "@/components/forms/in.form.vue";
import { useApiServices } from "@/services/api.services";
import { usePersonalHook } from "@/hooks/RH/personal.hook";
import SpinnerLoader from '@/components/loaders/spinner.loading.vue';
import { ref, onMounted } from "vue";
import { API_URL } from "@/routes/api.route";

const { readData } = useApiServices()

const { setPersonal, CreatePersonal } = usePersonalHook();

const onSubmit = (e: any) => {
    const values = new FormData(e.target.value)
    CreatePersonal(values);
};


const Salaires: any = ref([]);

function remplacerObjetDansTableau(tableau: any, proprieteRecherche: any, valeurRecherche: any, nouvelObjet: any) {
    const index = tableau.findIndex((obj: any) => obj[proprieteRecherche] === valeurRecherche);
    if (index !== -1) {
        tableau[index].select = nouvelObjet;
    }
}

onMounted(() => {
    readData(API_URL.ROLE_LIST).then((data) => remplacerObjetDansTableau(PersonalForms, 'name', 'utype', data.datas));
    readData(API_URL.SALAIRE_LIST).then((data) => (Salaires.value = data.datas));
});


</script>
<style lang="scss" scoped></style>