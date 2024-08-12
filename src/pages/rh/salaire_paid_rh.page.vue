<template>
   <BaseLayout>
     <template v-slot:content>
       <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
         <ContentLayout title="R. Humaines | Paiements salaires">
           <template v-slot:created>
             <div class="flex gap-2">
               <div class="flex gap-2 w-32 text-xs">
                 <Datepicker
                   v-model="date"
                   :max-date="new Date()"
                   :format="format"
                   :year-only="true"
                   class="w-full text-xs"
                   ref="datepicker"
                 />
               </div>
 
               {{ datepickers }}
               <Button @click="PaidDivPdf" :disabled="useDataStore().Paids.lenght != 0"
                 class="bg-blue-500 px-3 rounded-lg text-base text-white font-bold flex items-center gap-1"
               >
                 <i class="ri-download-cloud-line"></i>
                 <span class="">Télécharger</span>
               </Button>
               <PaidModal
                 name="Paiement"
                 :title="
                   useUpdateStore().isUpdate.is
                     ? 'Modifier paiement de salaire'
                     : 'Payer un salaire'
                 "
               />
             </div>
 
             <DeleteLayout
               :funDelete="PaidDelete"
               :id="useUpdateStore().isDelete.id"
             />
           </template>
         </ContentLayout>
 

         <div id="PaidDivPdf">
            <Table
           v-if="useDataStore().Paids.length != 0"
           :dataTables="useDataStore().Paids"
           :MenuActions="MenuPaidActions"
           :display="PaidTables"
         />
         </div>
         
 
         <PageLoader
           :loading="setPaid.loading"
           :data="useDataStore().Paids"
           name="Aucun Paid"
         />
       </section>
     </template>
   </BaseLayout>
 </template>
 <script lang="ts" setup>
 import Table from "./../../components/tables/table.vue";
 import BaseLayout from "./../../layouts/base.layout.vue";
 import ContentLayout from "@/layouts/content.layout.vue";
 import { MenuPaidActions } from "@/routes/actions.route";
 import { onMounted, ref, computed } from "vue";
 import { useDataStore } from "@/stores/data.store";
 import PageLoader from "@/components/loaders/page.loader.vue";
 import { PaidTables } from "@/tables/paid.table";
 import { useUpdateStore } from "@/stores/update.store";
 import { usePaidHook } from "@/hooks/RH/paid.hook";
 import DeleteLayout from "@/layouts/delete.layout.vue";
 import PaidModal from "@/components/modals/RH/paid.modal.vue";
 import Datepicker from "@vuepic/vue-datepicker";
 import "@vuepic/vue-datepicker/dist/main.css";
 import type { DatePickerInstance } from "@vuepic/vue-datepicker";
 import moment from "moment";
 
 const date: any = ref("");
 const datepicker = ref<DatePickerInstance>(null);
 
 const format = (date: any) => {
   //  const day = date.getDate();
   const month = date.getMonth() + 1;
   const year = date.getFullYear();
   return `${month}-${year}`;
 };

 
import html2pdf from 'html2pdf.js';
import Button from "@/components/ui/button/Button.vue";

const PaidDivPdf = () => {
  const element = document.getElementById('PaidDivPdf');
  if (element) {
    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { dpi: 75, scale: 2, letterRendering: true },
        jsPDF: { orientation: 'portrait', unit: 'in', format: 'a4' },
        // pdfCallback: pdfCallback
      }).save();

  }
}
 
 const datepickers = computed(() => {
   if (datepicker) {
     console.log(stateIsCache.value);
     if (date.value != "") {
       useDataStore().Paids = stateIsCache.value.filter((el: any) => {
         return el.date_paiement
           .toString()
           .includes(moment(date.value).format("DD/MM/YYYY").toString());
       });
     } else {
       useDataStore().Paids = stateIsCache.value;
     }
   }
 });
 
 const { FindPaidAll, PaidDelete, setPaid, stateIsCache } = usePaidHook();
 
 onMounted(() => {
   FindPaidAll();
 });
 </script>
 <style lang="scss" scoped></style>
 