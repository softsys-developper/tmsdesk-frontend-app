<script setup lang="ts">
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbList,
   BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { MenuPersonal } from "@/routes/menu.route"
</script>

<template>
   <div class="flex justify-between w-11/12 m-auto items-center h-14">
      <Breadcrumb class="text-lg">
         <BreadcrumbList>
            <BreadcrumbItem>
               <RouterLink :to="{name: 'HOME'}" > Tableau de bord </RouterLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator> </BreadcrumbSeparator>
            <BreadcrumbItem v-if="$route.name">
            <RouterLink :to="{name: $route.name}" > {{$route.name}} </RouterLink>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
      <div>
        <div class="flex gap-4 ">
        
        <div  v-for="item in MenuPersonal">
         <div class="flex gap-2 items-center">
            <i class="text-2xl text-gray-800" :class="item.icon"></i>
            <span class="text-gray-800 text-base font-bold"> {{ item.name }} </span>
         </div>
        </div>
        
        </div>
      </div>
   </div>
</template>
