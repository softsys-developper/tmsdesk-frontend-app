<script setup lang="ts">
import { reactive } from 'vue';



const Status = reactive([

    {
        name: 'En cours'
    },
    {
        name: 'Terminer'
    },
])

</script>

<template>

    <div class="bg-white flex flex-col px-4 pt-2 pb-4 gap-2  rounded-md w-full " >

        <!--  -->
        <div class="flex justify-between items-center ">
            <!--  -->
            <div class="text-sm font-black uppercase"> Livraisons </div>
            <!--  -->
            <div class="flex gap-2">
                <i class="ri-calendar-2-line  text-xl"></i>
            </div>
        </div>

        <div class=" gap-2 grid grid-cols-2">
            <div v-for="status in Status">
                <div class="text-[10px] font-black py-1 rounded-sm min-w-max text-center bg-gray-200 px-2">
                    {{ status.name }}
                </div>
            </div>
        </div>

        <!--  -->
        <div class="flex gap-4 pt-4 w-full justify-between ">
            <!-- Turnovers -->

            <div class="flex flex-col justify-center items-center">
                <span class="text-4xl font-black">50</span>
                <span class="text-xs "> En attente </span>
            </div>

        </div>
    </div>

</template>

<style></style>
