<script setup lang="ts">
import { API_URL } from '@/routes/api.route';
import { useApiServices } from '@/services/api.services';
import { onMounted, ref } from 'vue';

const GlobalData: any = ref([
])

onMounted(() => {
    useApiServices().readData(API_URL.STATS_TURNOVER).then(({ data }) => {

        if (data) {

            const Key = Object.keys(data)
            GlobalData.value = Key.filter((i: any) => !i.includes('Montant')).map((el) => {
                return {
                    name: el,
                    count: data[el],
                }
            })
        }


    })
})

</script>

<template>

    <div class="bg-white flex flex-col px-4 pt-2 pb-3 rounded-md">

        <!--  -->
        <div class="flex justify-between items-center ">
            <!--  -->
            <div class="text-sm font-black uppercase"> Chiffre d'affaires </div>
            <!--  -->
            <div class="flex gap-2">
                <i class="ri-calendar-2-line  text-xl"></i>
            </div>
        </div>

        <!--  -->
        <div class="flex gap-4 pt-4 w-full justify-between ">
            <!-- Turnovers -->
            <div v-for="turnover in GlobalData">
                <div class="flex flex-col justify-center items-center">
                    <span class="text-2xl font-black"> {{ `${turnover.name == "Chiffre d'Affaire" ? new
                        Intl.NumberFormat('de-DE',
                            { style: 'currency', currency: 'GNF' }).format(turnover.count) : `${turnover.count} ${turnover.name}(s)`}` }} </span>
                    <!-- <span class="text-xs "> {{ turnover.name }} </span> -->
                </div>
            </div>
        </div>
    </div>

</template>

<style></style>
