<script setup lang="ts">
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import {
   Pagination,
   PaginationEllipsis,
   PaginationFirst,
   PaginationLast,
   PaginationList,
   PaginationListItem,
   PaginationNext,
   PaginationPrev,
} from '@/components/ui/pagination';

import { Button } from '@/components/ui/button';
import BtnMore from '../mores/btn.more.vue';
// import {
//    Select,
//    SelectContent,
//    SelectGroup,
//    SelectItem,
//    SelectLabel,
//    SelectTrigger,
//    SelectValue,
// } from '@/components/ui/select';
import { Search } from 'lucide-vue-next';
import { computed, ref, watch } from 'vue';
import { AppService } from '@/services/app.services';

const props = defineProps(['MenuActions', 'dataTables', 'display']);

const OnSearchValue = ref()
const searchQ = ref('');
const PerPage = ref('5');
const isPage = ref(0);

const _OnSearchValue = computed(() => {
   OnSearchValue.value = props.dataTables
})


const PerOptions = [5, 10, 25, 50, 100, 150, 250];

watch(searchQ, (newQ) => {
   if (newQ) {
      const searchQuery = newQ.toLowerCase();
      const filtereddataTables = props.dataTables.filter((invoice: any) => {
         return props.display.some((key: any) => {
            console.log(invoice[key.field]);
            const value = invoice[key?.field].toString().toLowerCase();
            console.log(value);
            return value.includes(searchQuery);
         });
      });
      OnSearchValue.value = filtereddataTables;
   } else {
      OnSearchValue.value = props.dataTables;
   }
});

const IsPageFun = () => {
   isPage.value = 0
};
</script>

<template>
   <!--  -->
   {{ _OnSearchValue }}
   <div class="flex justify-between gap-2 lg:px-8 px-4">
      <div class="relative w-full lg:w-4/12 max-w-base items-center border-[1px] rounded-lg">
         <Input id="search" type="text" placeholder="Search..." @input="(e: any) => searchQ = e.target.value"
            class="pl-10 py-2 rounded-md w-full outline-none" />
         <span class="absolute start-0 top-[10px] flex items-center justify-center px-2">
            <Search class="size-5 rela  text-muted-foreground" />
         </span>
      </div>

      <div class="flex items-center justify-center gap-1">
         <label class="hidden lg:flex" for="">Entrées: </label>
         <select class="py-2 px-3 border-[1px] rounded-md" name="" id="" v-model="PerPage" @change="IsPageFun">
            <option v-for="Per in PerOptions" :value="`${Per}`">
               {{ Per }}
            </option>
         </select>
         <!-- <Select v-model="PerPage" @change="IsPageFun">
            <SelectTrigger class="w-[180px] bg-white">
               <SelectValue placeholder="Selectionner l'affichage d'entrée" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectLabel>Les entrées</SelectLabel>
                  <SelectItem
                     v-for="Per in PerOptions"
                     :value="`${Per}`"
                  >
                     {{ Per }}
                  </SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select> -->
      </div>
   </div>

   <Table class="bg-white">
      <!-- <TableCaption>A list of your recent dataTables.</TableCaption> -->
      <TableHeader class="bg-blue-200 px-8">
         <TableRow class="font-black">
            <TableHead class="font-black text-sm first-letter:uppercase" v-for="head in display">
               {{ head.label }}
            </TableHead>
            <TableHead class="text-right text-sm font-black"> Actions </TableHead>
         </TableRow>
      </TableHeader>
      <TableBody class="w-full">
         <!-- <TableRow class=" "
            v-for="(invoice, index) in OnSearchValue?.slice(
               isPage != 0 ? isPage * PerPage - PerPage : isPage,
               isPage != 0 ? PerPage * isPage : PerPage
            )"
            :key="invoice.invoice"
         > -->

         <TableRow class="text-base font-medium " v-for="invoice in OnSearchValue?.slice(
            isPage != 0
               ? Number(isPage) * Number(PerPage) - Number(PerPage)
               : isPage,
            isPage != 0 ? Number(PerPage) * isPage : PerPage
         )" :key="invoice.invoice">

            <TableCell class="font-medium text-base"
               v-for="b in Object.keys(invoice).filter(el => display.some((d: any) => d.field === el))"
               v-html="invoice[b] && invoice[b]?.length >= 15 && b != 'status' && display.length > 6 ? invoice[b].substring(0, 15) + '...' : invoice[b]">
            </TableCell>

            <TableCell class="text-right ">
               <div class="w-full flex justify-end" v-if="MenuActions">

                  <BtnMore :id="invoice.id" name="Actions" :actions="true" title="Action"
                     :data-drop-menu="MenuActions" />
               </div>
            </TableCell>
         </TableRow>
      </TableBody>
   </Table>

   <div class="flex lg:justify-between flex-col lg:flex-row p-4 gap-2">
      <span class="text-xs font-extrabold uppercase"> {{ AppService().name }} </span>

      <Pagination v-slot="{ page }" :total="OnSearchValue?.length" :sibling-count="1" :itemsPerPage="Number(PerPage)"
         show-edges :default-page="1">
         <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst @click="isPage = 1" />
            <PaginationPrev @click="isPage = isPage - 1" />

            <template v-for="(item, index) in items">
               <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                  <Button class="w-10 h-10 p-0" :class="item.value === page ? 'bg-blue-500' : 'bg-gray-100 text-gray-500'"
                     @click="isPage = item.value">
                     {{ item.value }}
                  </Button>
               </PaginationListItem>
               <PaginationEllipsis v-else :key="item.type" :index="index" />
               <!-- {{item}} -->
            </template>

            <PaginationNext @click="isPage = isPage + 1" />
            <PaginationLast @click="isPage = items.length" />
         </PaginationList>
      </Pagination>
   </div>
</template>
