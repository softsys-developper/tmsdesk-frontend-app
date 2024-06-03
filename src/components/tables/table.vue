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
import { ref, watch } from 'vue';

const props = defineProps(['MenuActions', 'dataTables', 'display']);

const OnSearchValue = ref();
const searchQ = ref('');
const PerPage = ref('5');
const isPage = ref(0);
OnSearchValue.value = props.dataTables;

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
   <div class="flex justify-between gap-2 px-8">
      <div
         class="relative w-full max-w-sm items-center border-[1px] rounded-lg"
      >
         <Input
            id="search"
            type="text"
            placeholder="Search..."
            @input="(e:any) => searchQ = e.target.value"
            class="pl-10 py-2 rounded-md w-full outline-none"
         />
         <span
            class="absolute start-0 top-[10px] flex items-center justify-center px-2"
         >
            <Search class="size-5 rela top-1 text-muted-foreground" />
         </span>
      </div>

      <div class="flex items-center justify-center gap-1">
      <label for="">Entrées: </label>
         <select class="py-1 px-3 border-[1px] rounded-md" name="" id="" v-model="PerPage" @change="IsPageFun">
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
         <TableRow class="font-bold">
            <TableHead
               class="font-bold text-base first-letter:uppercase"
               v-for="head in display"
            >
               {{ head.label }}
            </TableHead>
            <TableHead class="text-right font-bold"> Actions </TableHead>
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

         <TableRow
            class="text-base"
            v-for="invoice in OnSearchValue?.slice(
               isPage != 0
                  ? Number(isPage) * Number(PerPage) - Number(PerPage)
                  : isPage,
               isPage != 0 ? Number(PerPage) * isPage : PerPage
            )"
            :key="invoice.invoice"
         >
            <TableCell
               class="font-medium w-[300px]"
               v-for="b in Object.keys(invoice).filter(el => display.some((d:any) => d.field === el))"
               v-html="invoice[b]"
            >
            </TableCell>

            <TableCell class="text-right w-[300px]">
               <div class="w-full flex justify-end" v-if="MenuActions">
                  <BtnMore
                     name="Actions"
                     :actions="true"
                     title="Action"
                     :data-drop-menu="MenuActions"
                  />
               </div>
            </TableCell>
         </TableRow>
      </TableBody>
   </Table>

   <div class="flex justify-between p-4">
      <span class=""> {{ isPage }} </span>

      <Pagination
         v-slot="{ page }"
         :total="OnSearchValue?.length"
         :sibling-count="1"
         :itemsPerPage="Number(PerPage)"
         show-edges
         :default-page="1"
      >
         <PaginationList v-slot="{ items }" class="flex items-center gap-1">
            <PaginationFirst @click="isPage = 1" />
            <PaginationPrev @click="isPage = isPage - 1" />

            <template v-for="(item, index) in items">
               <PaginationListItem
                  v-if="item.type === 'page'"
                  :key="index"
                  :value="item.value"
                  as-child
               >
                  <Button
                     class="w-10 h-10 p-0"
                     :variant="item.value === page ? 'default' : 'outline'"
                     @click="isPage = item.value"
                  >
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
