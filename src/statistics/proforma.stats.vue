<script setup lang="ts">
import { API_URL } from '@/routes/api.route';
import { useApiServices } from '@/services/api.services';
import { onMounted, ref } from 'vue';

const InvoiceData: any = ref([
])

onMounted(() => {
    useApiServices().readData(API_URL.STATS_PROFORMA).then(({data}) => {

        const colors = ['bg-blue-900', 'bg-blue-500', 'bg-green-300', 'bg-red-500']

        if(data){
            const Key  = Object.keys(data)
            console.log(Key.filter((i:any) =>  i.includes('Montant')))
             InvoiceData.value = Key.filter((i:any) => !i.includes('Montant')).map((el, index) => {
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
            <div class="flex gap-2">
                <i class="ri-calendar-2-line  text-xl"></i>
            </div>
        </div>

  

        <!--  -->
        <div class="flex gap-4 pt-4 w-full justify-between ">
            <!-- Turnovers -->
            <div class="grid grid-cols-2 gap-1">

                <div v-for="UJ in InvoiceData" >
                   
                    <div class="flex flex-col rounded-md p-3 h-[100px] gap-2 text-white" :class="UJ.color" >
                        <span class="text-3xl font-bold"> {{ UJ.count }}</span>
                        <span class="text-xs first-letter:uppercase ">  {{ UJ.name.replace("Facture ", '') }} </span>
                    </div>

                </div>

            </div>
          

        </div>
    </div>

</template>

<style></style>
