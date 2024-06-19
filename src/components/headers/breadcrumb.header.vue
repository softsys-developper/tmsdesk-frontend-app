<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbRoutes } from "@/routes/Breadcrumb.route";
import { MenuPersonal } from "@/routes/menu.route";
</script>

<template>
  <div class="flex justify-between w-11/12 m-auto items-center h-14 gap-16">
    <Breadcrumb class="text-lg min-w-max">
      <BreadcrumbList class="hidden">
        <BreadcrumbItem>
          <div
            class="bg-blue-500 size-7 flex justify-center items-center rounded-full cursor-pointer"
            @click="$router.go(-1)"
          >
            <i class="ri-arrow-left-line text-white text-lg"></i>
          </div>
          <RouterLink :to="{ name: 'HOME' }"> Tableau de bord </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator> </BreadcrumbSeparator>
        <BreadcrumbItem v-if="$route.name">
          <RouterLink :to="{ name: $route.name }">
            {{
              BreadcrumbRoutes.find((item: any) => item.route == $route.name)
                ? BreadcrumbRoutes.find(
                    (item: any) => item.route == $route.name
                  )?.title
                : $route.name
            }}
          </RouterLink>
        </BreadcrumbItem>
      </BreadcrumbList>

      <div
        class=""
        v-if="BreadcrumbRoutes.find((item: any) => item.route == $route.name)"
      >
        <BreadcrumbList>
          <div
            class="bg-blue-500 size-7 flex justify-center items-center rounded-full cursor-pointer"
            @click="$router.go(-1)"
          >
            <i class="ri-arrow-left-line text-white text-lg"></i>
          </div>
          <BreadcrumbSeparator> </BreadcrumbSeparator>
          <BreadcrumbItem
            v-for="BRead in BreadcrumbRoutes.find((item: any) => item.route == $route.name)?.title"
          >
            <RouterLink :to="{ name: BRead.route ?? '' }">
              {{ BRead.title }}
            </RouterLink>
            <BreadcrumbSeparator>
            </BreadcrumbSeparator>
          </BreadcrumbItem>
        </BreadcrumbList>
      </div>
    </Breadcrumb>
    <div>
      <div class="flex gap-4">
        <div v-for="item in MenuPersonal">
          <div class="flex gap-2 items-center min-w-max">
            <i class="text-2xl text-blue-500" :class="item.icon"></i>
            <span class="text-blue-500 text-base font-bold">
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
