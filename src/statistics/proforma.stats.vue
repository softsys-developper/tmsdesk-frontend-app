<script setup lang="ts">
import { API_URL } from '@/routes/api.route';
import { useApiServices } from '@/services/api.services';
import { onMounted, ref, computed } from 'vue';

const InvoiceData: any = ref([
])

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";

const date: any = ref("");
const datepicker = ref<DatePickerInstance>(null);
const datepickers = computed(() => {
    if (datepicker) {
        SendFilter()
    }
});

const format = (date: any) => {
    // const day = date.getDate();
    // const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}`;
};


const SendFilter = () => {
    useApiServices()
        .readData(API_URL.STATS_PROFORMA + "?year=" + date.value.toString().split(' ')[3])
        .then(({ data }) => {
            if (data) {
                InvoiceData.value = data.map((el: any) => {
                    return {
                        year: el.mois,
                        gain: Math.floor(el.gain),
                        depense: Math.floor(el.depense),
                    };
                });
            }
        });
}


onMounted(() => {
    useApiServices().readData(API_URL.STATS_PROFORMA).then(({ data }) => {

        const colors = ['bg-blue-900', 'bg-blue-500', 'bg-green-300', 'bg-red-500']

        if (data) {
            const Key = Object.keys(data)
            console.log(Key.filter((i: any) => i.includes('Montant')))
            InvoiceData.value = Key.filter((i: any) => !i.includes('Montant')).map((el, index) => {
                return {
                    name: el,
                    count: data[el],
                    color: colors[index]
                }
            })
        }
    })
})





</script>

<template>

    <div class="bg-white flex flex-col px-4 pt-2 pb-4 gap-2  rounded-md w-full">

        <!--  -->
        <div class="flex justify-between items-center ">
            <!--  -->
            <div class="text-sm font-black uppercase"> Proformas </div>
            <!--  -->
            {{ datepickers }}



            <div class="flex flex-col gap-2 w-24 text-xs">
                <Datepicker v-model="date" :max-date="new Date()" :format="format" :year-only="true"
                    class="w-full text-[10px]" @change="SendFilter" ref="datepicker" />
            </div>
        </div>



        <!--  -->
        <div class="flex gap-4  w-full justify-between ">
            <!-- Turnovers -->
            <div class="grid grid-cols-2 gap-1 w-full">

                <div v-for="UJ in InvoiceData">

                    <div class="flex flex-col rounded-md px-3 py-2 h-[90px] w-full gap-2 text-white" :class="UJ.color">
                        <span class="text-3xl font-bold"> {{ UJ.count }}</span>
                        <span class="text-xs first-letter:uppercase "> {{ UJ.name.replace("Facture ", '') }} </span>
                    </div>

                </div>

            </div>


        </div>
    </div>

</template>

<style></style>
