<script setup lang="ts">
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Fun_Actions } from "@/services/action.services"

defineProps(['name', 'title', 'dataDropMenu', 'actions', 'isNotBg', 'id']);


</script>

<template>
   <DropdownMenu  >
      <DropdownMenuTrigger
         class="text-xs font-bold max-w-8/12 px-2 py-2 rounded-md flex justify-between items-center gap-1"
         :class="isNotBg ? '' : dataDropMenu.length != 0 ? 'bg-orange-400  text-white'  : 'bg-orange-200  text-white'"
         :disabled="dataDropMenu.length == 0 ? true : false"
      >
      
         <span class="text-base" v-if="title == 'Profile'">
            {{ name }}
         </span> 
          <i :class="title == 'Profile' ? 'ri-arrow-down-s-line' : ''"></i>
           <i :class="'ri-more-line'" v-if=" name == 'Actions'" ></i>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
         <DropdownMenuLabel> {{ title }} </DropdownMenuLabel>
         <DropdownMenuSeparator />
         <DropdownMenuItem v-for="Menu in dataDropMenu" class="">
         
            <RouterLink
               :to="{ name: Menu.route }"
               class="flex gap-1 items-center w-full"
               v-if="!actions"
            >
               <i :class="Menu.icon" class="text-lg"></i>
               <span class=""> {{ Menu.name }}</span>
            </RouterLink>

           <div v-else>  
            <div class="flex gap-1 items-center" @click="Fun_Actions(Menu, id, $router)" >
               <i :class="Menu.icon" class="text-lg "></i>
               <span class="text-base font-sans"> {{ Menu.name }}</span>
            </div>
           </div>
         </DropdownMenuItem>
      </DropdownMenuContent>
   </DropdownMenu>
</template>
