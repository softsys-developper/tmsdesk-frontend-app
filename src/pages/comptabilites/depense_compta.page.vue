<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Transactions Caisse">
               <template v-slot:created>

                  <div class="flex gap-2 items-center ">
                     <div class="lg:text-lg text-base bg-orange-500 text-white px-4 py-1 rounded-md font-black">
                        <span class="font-bold uppercase">solde : </span>
                        {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'CFA' }).format(
    CountSolde,
  )  }}
                     </div>
                     <DepenseModal  name="Nouvelle transaction" :title="useUpdateStore().isUpdate.is
                           ? 'Modifier la transaction'
                           : 'Ajouter une transaction'
                        " />

                     <DeleteLayout :funDelete="DepenseDelete" :id="useUpdateStore().isDelete.id" />
                  </div>

               </template>
            </ContentLayout>
            <Table v-if="storeDepenses.length != 0" :dataTables="storeDepenses" :MenuActions="MenuDepenseActions"
               :display="DepenseTables" />

            <PageLoader :loading="setDepense.loading" :data="storeDepenses" name="Aucune depenses" />
         </section>
      </template>
   </BaseLayout>
   {{ CountSolde }}
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import DepenseModal from '@/components/modals/depense.modal.vue';
import { MenuDepenseActions } from '@/routes/actions.route';
import { computed, onMounted, ref } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { DepenseTables } from '@/tables/depense.tables';
import { useDepenseHook } from "@/hooks/comptabilites/depense.hook.ts"
import DeleteLayout from '@/layouts/delete.layout.vue';
import { useUpdateStore } from '@/stores/update.store';

const { FindDepenseAll, storeDepenses, DepenseDelete, setDepense } = useDepenseHook();
const CoutSoldeRef = ref(0)

const CountSolde = computed(() => {
   CoutSoldeRef.value = 0

   if(storeDepenses.value){
      storeDepenses.value.forEach((el: any) => {
        
      if (el?.type_transaction.includes('sortie')) {
         CoutSoldeRef.value = CoutSoldeRef.value - Number(el.montant_trs)
      } else {
         CoutSoldeRef.value = CoutSoldeRef.value + Number(el.montant_trs)
      }
   })
   }
   
   return CoutSoldeRef.value
})

onMounted(() => {
   FindDepenseAll();
});
</script>
<style lang="scss" scoped></style>
