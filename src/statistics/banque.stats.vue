<script setup lang="ts">
import { LineChart } from "@/components/ui/chart-line";
import { API_URL } from "@/routes/api.route";
import { useApiServices } from "@/services/api.services";
import { onMounted, ref, computed } from "vue";
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

const ExpensiveData: any = ref([]);

const SendFilter = () => {
  useApiServices()
    .readData(API_URL.STATS_BANQUE + "?year=" + date.value.toString().split(' ')[3])
    .then(({ data }) => {
      if (data) {
        ExpensiveData.value = data.map((el: any) => {
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
  useApiServices()
    .readData(API_URL.STATS_BANQUE)
    .then(({ data }) => {
      if (data) {
        ExpensiveData.value = data.map((el: any) => {
          return {
            year: el.mois,
            gain: Math.floor(el.gain),
            depense: Math.floor(el.depense),
          };
        });
      }
    });
});
</script>

<template>
  <div class="bg-white h-[457px] rounded-md">
    <div class="flex justify-between px-4 py-2 items-center">
      <!--  -->
      <div class="text-sm font-black uppercase"> Banques</div>
      <!--  -->
      {{datepickers}}

      

      <div class="flex flex-col gap-2 w-32">
        <Datepicker
          v-model="date"
          :max-date="new Date()"
          :format="format"
          :year-only="true"
          class="w-full"
          @change="SendFilter"
          ref="datepicker"
        />
      </div>
    </div>

    <LineChart
      :data="ExpensiveData"
      index="year"
      :colors="['green', 'red']"
      :categories="['gain', 'depense']"
      class="h-[357px]"
      :y-formatter="
        (tick) => {
          return typeof tick === 'number'
            ? ` ${new Intl.NumberFormat('us').format(tick)} `
            : '';
        }
      "
    />
  </div>
</template>
