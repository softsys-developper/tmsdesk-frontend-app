<script setup lang="ts">
import { LineChart } from "@/components/ui/chart-line";
import { API_URL } from "@/routes/api.route";
import { useApiServices } from "@/services/api.services";
import { onMounted, ref } from "vue";

const ExpensiveData: any = ref([]);

onMounted(() => {
  useApiServices()
    .readData(API_URL.STATS_BANQUE)
    .then(({ data }) => {
      if (data) {
        ExpensiveData.value = data.map((el: any) => {
          return {
            year: el.mois,
            gain: el.gain,
            depense: Math.floor(el.depense),
          };
        });
      }
    });
});
</script>

<template>
  <div class="bg-white h-[350px] rounded-md">
    <div class="flex justify-between px-4 py-2 items-center">
      <!--  -->
      <div class="text-sm font-black uppercase">Transactions Banques</div>
      <!--  -->
      <div class="flex gap-2">
        <label for=""><i class="ri-calendar-2-line text-xl"></i></label>
        <input type="date" id="BanqueStats" >
      </div>
    </div>

    <LineChart
      :data="ExpensiveData"
      index="year"
      :colors="['green', 'red']"
      :categories="['gain', 'depense']"
      class="h-[250px]"
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
