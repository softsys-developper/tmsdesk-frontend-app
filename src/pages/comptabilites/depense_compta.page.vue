<template>
   <BaseLayout>
      <template v-slot:content>
         <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
            <ContentLayout title="COMPTABILITES | Transactions Caisse">
               <template v-slot:created>

                     <div class="flex gap-2 items-center ">
                        <div class="text-lg bg-orange-500 text-white px-4 py-1 rounded-md font-black">
                     <span class="font-bold uppercase">solde : </span>
                     {{ CountSolde }}
                  </div>

                  <DepenseModal
                     name="Nouvelle transaction"
                     title="Ajouter une nouvelle transaction"
                  />
                     </div>

               </template>
            </ContentLayout>
            <Table
               v-if="storeDepenses.length != 0"
               :dataTables="storeDepenses"
               :MenuActions="MenuClientActions"
               :display="DepenseTables"
            />

            <PageLoader
               :loading="setDepense.loading"
               :data="storeDepenses"
               name="Aucune depenses"
            />
         </section>
      </template>
   </BaseLayout>
   {{CountSolde}}
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import DepenseModal from '@/components/modals/depense.modal.vue';
import { MenuClientActions } from '@/routes/actions.route';
import { computed, onMounted, ref } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { DepenseTables } from '@/tables/depense.tables';
import {useDepenseHook} from "@/hooks/comptabilites/depense.hook.ts"

const { FindDepenseAll, storeDepenses, setDepense } = useDepenseHook();
const CoutSoldeRef = ref(0)

const CountSolde = computed(() => {
   CoutSoldeRef.value = 0
   storeDepenses.value.forEach((el:any) => {
      if(el?.type_transaction.includes('red')) {
         CoutSoldeRef.value = CoutSoldeRef.value - Number(el.montant)
      }else{
         CoutSoldeRef.value = CoutSoldeRef.value + Number(el.montant)
      }
   })
   return CoutSoldeRef.value
})

onMounted(() => {
    FindDepenseAll();
});
</script>
<style lang="scss" scoped></style>
