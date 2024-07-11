<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'

const data = [
  {
    'year': 'Jan',
    'Export Growth Rate': 2.04,
    // 'Import Growth Rate': 1.53,
  },

  {
    'year': "Decembre",
    'Export Growth Rate': 12.81,
    // 'Import Growth Rate': 13.72,
  },
 
  {
    'year': "Decembre",
    'Export Growth Rate': 52.81,
    // 'Import Growth Rate': 13.72,
  },
 
]
</script>

<template>
 <div class="bg-white h-[350px] rounded-md">

    <div class="flex justify-between px-4 py-2 items-center">
            <!--  -->
            <div class="text-sm font-black uppercase"> Stocks</div>
            <!--  -->
            <div class="flex gap-2">
                <i class="ri-calendar-2-line  text-xl"></i>
            </div>
        </div>

    <LineChart
    :data="data"
    index="year"
    :categories="['Export Growth Rate']"
    class="h-[250px]"
    :y-formatter="(tick) => {
      return typeof tick === 'number'
        ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
        : ''
    }"
  />
 </div>
</template>