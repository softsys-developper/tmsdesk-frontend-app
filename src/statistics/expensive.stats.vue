<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import { API_URL } from '@/routes/api.route';
import { useApiServices } from '@/services/api.services';
import { onMounted, ref } from 'vue';

const ExpensiveData:any = ref( [])

onMounted(() => {
    useApiServices().readData(API_URL.STATS_CAISSE)
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
})

</script>

<template>
    <div class="bg-white h-[350px] rounded-md">

        <div class="flex justify-between px-4 py-2 items-center">
            <!--  -->
            <div class="text-sm font-black uppercase"> Dépenses </div>
            <!--  -->
            <div class="flex gap-2">
                <i class="ri-calendar-2-line  text-xl"></i>
            </div>
        </div>

        <LineChart :data="ExpensiveData" index="year" :colors="['green', ' red']" :categories="['gain', 'depense']" class="h-[250px]" :y-formatter="(tick) => {
            return typeof tick === 'number'
                ? ` ${new Intl.NumberFormat('us').format(tick)} GNF`
                : ''
        }" />
    </div>
</template>