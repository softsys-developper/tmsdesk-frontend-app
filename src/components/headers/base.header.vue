<template>
   <section class="text-white flex flex-col w-full fixed z-40 top-0">
      <div class="h-16 w-full bg-black">
         <!--  -->
         <div class="flex items-center w-11/12 m-auto h-full justify-between">
            <RouterLink :to="{name: 'HOME'}" class="text-2xl font-black"> {{AppService().name}} </RouterLink>

            <div class="flex gap-4">
               <!-- Notifications -->
               <div class="flex gap-3 relative items-center">
                  <div
                     class="absolute bg-red-500 size-5 flex justify-center items-center rounded-full bottom-3 left-2"
                  >
                     <span class="text-[8px] font-bold">99</span>
                  </div>
                  <i class="ri-notification-2-line"></i>
                  <span class="text-sm font-bold">Notifications</span>
               </div>

               <!-- Profile de user connecter -->
               <div class="flex gap-2 items-center text-black w-full" >
                  <Avatar
                     class="bg-white rounded-full size-8 flex justify-center items-center"
                  >
                     <AvatarImage
                        src="https://github.com/radix-vue.png"
                        alt="@radix-vue"
                     />
                     <AvatarFallback class="text-xs">LB</AvatarFallback>
                  </Avatar>

                  <BtnMore
                     name="Laurant Binaté"
                     title="Profile"
                     :dataDropMenu="MenuProfile"
                     actions="true"
                  />
               </div>
            </div>
         </div>
      </div>

      <div class="bg-white h-12">
         <MenuHeaderCard :content="MenuApp" />
      </div>

      <!-- Breadcrumb -->

      <div class="bg-white border-t-[1px]">
         <BreadcumbHeader />
      </div>
   </section>
</template>
<script lang="ts" setup>
import MenuHeaderCard from '@/components/cards/menu_header.card.vue';
import { MenuApp, MenuProfile } from '@/routes/menu.route';
import BreadcumbHeader from '@/components/headers/breadcrumb.header.vue';
import BtnMore from '../mores/btn.more.vue';
import { AppService } from '@/services/app.services'
</script>
<style lang="scss" scoped></style>
