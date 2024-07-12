<script setup lang="ts">
import TurnoverStats from "@/statistics/turnover.stats.vue"
import InvoiceStats from "@/statistics/invoice.stats.vue"
import ExpensiveStats from "@/statistics/expensive.stats.vue"
import BanqueStats from "@/statistics/banque.stats.vue"
import ProformaStats from "@/statistics/proforma.stats.vue"
</script>

<template>

    <div class="w-full flex gap-4 flex-col lg:flex-row">

        <div class="lg:w-9/12 w-full flex flex-col gap-4">

           

            <TurnoverStats />
            <div class=" gap-2 w-full grid grid-cols-2">
                <ExpensiveStats />
                <BanqueStats />
                <!-- <StockStats /> -->
            </div>
        </div>

        <div class=" flex lg:flex-col flex-col lg:grid-cols-1 items-start justify-start h-auto gap-2 lg:w-3/12 w-full ">
            <InvoiceStats />
            <!-- <DeliveryStats /> -->
            <ProformaStats />
        </div>

    </div>

</template>

<style></style>
