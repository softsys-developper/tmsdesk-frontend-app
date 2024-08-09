<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="R. Humaines | Paiements salaires">
               <template v-slot:created>
                  <div class="flex gap-2">

                     
                     <div class="flex gap-2 w-32 text-xs">
                        <Datepicker v-model="date" :max-date="new Date()" :format="format" :year-only="true"
                           class="w-full text-xs"  ref="datepicker" />
                     </div>

                     {{datepickers}}
                     <button class="bg-blue-500 px-3 rounded-lg text-base text-white font-bold flex items-center gap-1">
                        <i class="ri-download-cloud-line"></i>
                        <span class="">Telecharger</span>
                     </button>
                     <PaidModal name="Paiement" :title="useUpdateStore().isUpdate.is
                        ? 'Modifier paiement de salaire'
                        : 'Payer un salaire'
                        " />
                  </div>

                  <DeleteLayout :funDelete="PaidDelete" :id="useUpdateStore().isDelete.id" />
               </template>
            </ContentLayout>

            <Table v-if="useDataStore().Paids.length != 0" :dataTables="useDataStore().Paids"
               :MenuActions="MenuPaidActions" :display="PaidTables" />

            <PageLoader :loading="setPaid.loading" :data="useDataStore().Paids" name="Aucun Paid" />
         </section>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { MenuPaidActions } from '@/routes/actions.route';
import { onMounted, ref, computed } from 'vue';
import { useDataStore } from '@/stores/data.store';
import PageLoader from '@/components/loaders/page.loader.vue';
import { PaidTables } from '@/tables/paid.table';
import { useUpdateStore } from '@/stores/update.store';
import { usePaidHook } from '@/hooks/RH/paid.hook';
import DeleteLayout from '@/layouts/delete.layout.vue';
import PaidModal from '@/components/modals/RH/paid.modal.vue';
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";
import moment from 'moment';


const date: any = ref("");
const datepicker = ref<DatePickerInstance>(null);


const format = (date: any) => {
   //  const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}-${year}`;
};

const datepickers = computed(() => {
    if (datepicker) {
      useDataStore().Paids = useDataStore().Paids.filter((el:any) => {
         el.date_paiement.includes(moment(date.value).format('DD-MM-YYYY'))
      })
    }
});

const { FindPaidAll, PaidDelete, setPaid } = usePaidHook();

onMounted(() => {
   FindPaidAll();
});


</script>
<style lang="scss" scoped></style>
