<template>
    <BaseLayout>
        <template v-slot:content>
            <section class="flex flex-col w-full gap-2 bg-white rounded-lg mb-4">
                <ContentLayout :title="`R. Humaines | Détail employé`">
                    <template v-slot:created> </template>
                </ContentLayout>

                <div class="flex w-11/12 m-auto object-cover">
                    <img :src="'https://apps.tmsdesk.com/employes/photos/' + Personal[0]['photo']" class="size-36 rounded-full" alt="">
                </div>

                <div class="w-11/12 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16 gap-4 ">

                  
               
                    

                    <div v-for="JI in InputKey">

                        <div class="flex flex-col gap-0 ">
                            <div class=" rounded-sm bg-gray-100 rounded-xs px-2 py-1">
                           
                                <span class="first-letter:uppercase font-black text-[12px] capitalize ">{{ JI }}</span>
                            </div>

                            <div class="border-[1px] p-3">
                                {{ Personal[0][JI] }}
                            </div>
                        </div>

                    </div>


                </div>


            </section>
        </template>
    </BaseLayout>

    <!-- {{ ProductAndServices }} -->
</template>
<script lang="ts" setup>
import BaseLayout from "@/layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { useApiServices } from "@/services/api.services";
// import { usePersonalHook } from "@/hooks/RH/personal.hook";
import { onMounted, ref } from "vue";
import { API_URL } from "@/routes/api.route";
import { useRoute } from "vue-router";
// import moment from "moment";

const route = useRoute()

const { showData } = useApiServices();
// const { setPersonal, CreatePersonal, PersonalUpdate } = usePersonalHook();
const Personal = ref()

const InputKey = ref()

const FindShowPersonal = () => {
    if (route.query.id) {
        showData(API_URL.USER_SHOW, '/' + route.query.id).then((data) => {
            Personal.value = [data.data].map((Personal: any) => ({
                photo: Personal.photo,
                matricule: Personal.matricule,
                nom: Personal.nom,
                prenoms: Personal.prenoms,
                email: Personal.email,
                telephone: Personal.telephone,
                'Type Contract': Personal.type_contrat,
                fonction: Personal.fonction,
                // role: Personal.utype,
                'Date de Début': Personal.date_debut,
                // date_creation: moment(Personal.created_at).format("l"),
            }));
            InputKey.value = Object.keys(Personal.value[0])
        })
    }
}


onMounted(() => {
    FindShowPersonal()

});
</script>
<style lang="scss" scoped></style>
