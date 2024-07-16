<script setup lang="ts">
import { API_URL } from "@/routes/api.route";
import { useApiServices } from "@/services/api.services";
import { onMounted, ref, computed, reactive } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";


const date: any = ref("");
const datepicker = ref<DatePickerInstance>(null);
const DataToFilt = reactive({
    date_1: '',
    date_2: ''
})
const datepickers = computed(() => {
    if (datepicker && !DataToFilt.date_1.includes('undefined') && !DataToFilt.date_2.includes('undefined')) {
        SendFilter()
        // DataToFilt.date_1 = ''
        // DataToFilt.date_2 = ''
    }
});



const format = (date: any) => {
    const day1 = date[0].getDate();
    const month1 = date[0].getMonth() + 1;
    const year1 = date[0].getFullYear();


    const day2 = date[1]?.getDate();
    const month2 = date[1]?.getMonth() + 1;
    const year2 = date[1]?.getFullYear();

    DataToFilt.date_1 = `${year1}/${month1}/${day1}`
    DataToFilt.date_2 = `${year2}/${month2}/${day2}`

    return `${day1}/${month1}/${year1} - ${day2}/${month2}/${year2}`;
};

const SendFilter = () => {
    useApiServices()
        .readData(API_URL.STATS_TURNOVER + "?date1=" + DataToFilt.date_1 + '&date2=' + DataToFilt.date_2)
        .then(({ data }) => {
            if (data) {
                const Key = Object.keys(data);
                GlobalData.value = Key.filter((i: any) => !i.includes("Montant")).map(
                    (el) => {
                        return {
                            name: el,
                            count: data[el],
                        };
                    }
                );
            }
        });
};

const GlobalData: any = ref([]);
const colors = ['text-black', 'text-blue-500', 'text-blue-800']

onMounted(() => {
    useApiServices()
        .readData(API_URL.STATS_TURNOVER)
        .then(({ data }) => {
            if (data) {
                const Key = Object.keys(data);
                GlobalData.value = Key.filter((i: any) => !i.includes("Montant")).map(
                    (el) => {
                        return {
                            name: el,
                            count: data[el],
                        };
                    }
                );
            }
        });
});
</script>

<template>
    <div class="bg-white flex flex-col px-4 pt-2 pb-3 rounded-md">
        {{ datepickers }}
        <!--  -->
        <div class="flex justify-between items-center">
            <!--  -->
            <div class="text-sm font-black uppercase"> Statistiques</div>
            <!--  -->
            <div class="flex gap-2 w-56 text-xs">
                <Datepicker v-model="date" :max-date="new Date()" :format="format" :year-only="true" class="w-full text-xs"
                    range :partial-range="false" ref="datepicker" />
            </div>
        </div>

        <!--  -->
        <div class="flex gap-4 pt-4 w-full justify-between">

         

            <!-- Turnovers -->
            <div v-for="(turnover, index) in GlobalData">
                

                    <div class="bg-">
                        <div class="">
                            <img src="" alt="">
                        </div>
                        <div class="flex flex-col">
                            <span class="text-bold text-3xl" :class="colors[index]" > {{  `${turnover.name == "Chiffre d'Affaire"
                                ? new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "CFA",
                                }).format(turnover.count)
                                : `${turnover.count}`
                            }` }} </span>
                            <span class="text-sm font-ligth"> {{turnover.name}}(s) </span>
                            <!-- <span class=""> {{turnover.name}}(s) </span> -->
                        </div>
                    </div>

                    <!-- <span class="text-2xl font-black">
                        {{
                            `${turnover.name == "Chiffre d'Affaire"
                                ? new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "CFA",
                                }).format(turnover.count)
                                : `${turnover.count} ${turnover.name}(s)`
                            }`
                        }}
                    </span> -->
                    <!-- <span class="text-xs "> {{ turnover.name }} </span> -->
                </div>
            </div>
       
    </div>
</template>

<style></style>
