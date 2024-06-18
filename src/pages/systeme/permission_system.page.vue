<template>
    <BaseLayout>
        <template v-slot:content>
            <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
                <ContentLayout title="Parametre | Permissions">
                    <template v-slot:created>
                        <!-- <ClientdModal
                       name="Nouveau Proforma"
                       title="Nouveau Proforma"
                    /> -->


                    </template>
                </ContentLayout>


                <div class="w-11/12 m-auto flex flex-col gap-6" v-if="useDataStore().Permissions">
                    <div class="" v-for="Permission in Object.keys(useDataStore().Permissions)">
                        <div class="flex flex-col gap-2 mb-4">
                            <div class="">
                                <span class="text-base font-extrabold uppercase">{{ Permission }}</span>
                            </div>
                            <div class="grid lg:grid-cols-3 grid-cols-2 gap-4">

                                <div class="" v-for="perm in useDataStore().Permissions[Permission]">
                                    <div class="flex items-start ">
                                        <div class="mb-[0.5rem] block min-h-[1.5rem] ps-[1.5rem]">
                                            <input
                                                class="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                                                type="checkbox" value="" :id="perm.name" />
                                            <label :for="perm.name"
                                                class="text-base capitalize text-gray-500 ms-3 dark:text-neutral-400">{{
                                                    perm.name }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Separator clas="pt-8" />
                        </div>
                    </div>
                </div>
                <PageLoader :loading="state.loading" :data="useDataStore().Permissions" name="Aucun Proforma" />
            </section>
        </template>
    </BaseLayout>
</template>
<script lang="ts" setup>
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { useApiServices } from '@/services/api.services';
import { onMounted, reactive, ref } from 'vue';
import { API_URL } from '@/routes/api.route';
import { useDataStore } from '@/stores/data.store';
import PageLoader from '@/components/loaders/page.loader.vue';
import Separator from '@/components/ui/separator/Separator.vue';

const { readData } = useApiServices();
const state = reactive({
    loading: false,
});

// const StatusHtml = (name: string, bg: string) => {
//     return `<span class="text-sm font-bold flex text-white min-w-max max-w-min px-2 py-1 rounded-md text-center ${bg}" >${name}</span>`
// }

interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

const permissions = ref(<Permission[]>[])
// Tableau d'objets permissions


// Fonction pour catégoriser les permissions par type d'action
function categoriserPermissions(permissions: Permission[]): { [key: string]: Permission[] } {
    const categories: { [key: string]: Permission[] } = {};

    permissions.forEach(permission => {
        // Extraire l'action à partir du nom de la permission
        let action = permission.name.split('-')[permission.name.split('-').length - 1]; // Extrait la première partie du nom

        action = action.endsWith('s') ? action.substring(0, (action.length - 1)) : action
        console.log(action, action.length)

        if (!categories[action]) {
            categories[action] = [];
        }
        categories[action].push(permission);
    });

    return categories;
}



const FindAllClient = () => {
    state.loading = true;
    readData(API_URL.PERMISSIONS_LIST)
        .then((data: any) => {
            permissions.value = data.data
            useDataStore().Permissions = categoriserPermissions(permissions.value);

            state.loading = false;
        })
        .catch(() => {
            state.loading = false;
        });
};

onMounted(() => {
    FindAllClient();
});
</script>
<style lang="scss" scoped></style>