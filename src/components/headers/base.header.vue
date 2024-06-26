<template>
  <section class="text-white flex flex-col sticky top-0 z-30 right-0 top-0">
    <div class="h-16 bg-black">
      <!--  -->
      <div class="flex items-center w-11/12 m-auto h-full justify-between">
        <div class="lg:flex hidden"></div>


        <div class="flex items-center  cursor-pointer gap-2 ">
          <span></span>
          <span class="lg:hidden" @click="
            useModalStore().isMenu
              ? (useModalStore().isMenu = false)
              : (useModalStore().isMenu = true)
            "><i class="ri-menu-2-fill"></i></span>
          <RouterLink :to="{ name: 'HOME' }" class="text-xl font-black truncate lg:w-full w-36 ">

            {{ AppService().name }}
          </RouterLink>
        </div>

        <div class="flex items-center  justify-end gap-4">
          <!-- Notifications -->
          <div class="flex gap-3 relative items-center  ">
            <div class="absolute bg-red-500 size-5 flex justify-center items-center rounded-full bottom-3 left-2">
              <span class="text-[8px] font-bold">99</span>
            </div>
            <i class="ri-notification-2-line text-2xl"></i>
            <span class="text-sm font-bold md:flex hidden">Notifications</span>
          </div>

          <Avatar class="bg-white rounded-full hidden size-8  justify-center items-center">
            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
            <AvatarFallback class="text-xs">LB</AvatarFallback>
          </Avatar>

          <!-- Profile de user connecter -->
          <div class="flex gap-2 items-center text-black ">


            <div class="hidden lg:flex z-50 w-full">
              <BtnMore :name="USER?.name" title="Profile" :dataDropMenu="MenuProfile" actions="true" />
            </div>

            <div class="flex lg:hidden z-50 w-full">
              <BtnMore name="" title="Profile" :dataDropMenu="MenuProfile" actions="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Breadcrumb -->

  <div class="bg-white border-t-[1px] w-full overflow-x-scroll overflow-hidden no-scrollbar">
    <BreadcumbHeader />
  </div>
</template>
<script lang="ts" setup>
import { MenuProfile } from "@/routes/menu.route";
import BreadcumbHeader from "@/components/headers/breadcrumb.header.vue";
import BtnMore from "../mores/btn.more.vue";
import { AppService } from "@/services/app.services";
import { useModalStore } from "@/stores/modal.store";
import Avatar from "../ui/avatar/Avatar.vue";
import AvatarFallback from "../ui/avatar/AvatarFallback.vue";
import { onMounted, ref } from "vue";

const USER = ref()

onMounted(() => {
  USER.value = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : { name: 'Laurant Binaté' }
  console.log(USER.value)
})

</script>
<style lang="css" scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
