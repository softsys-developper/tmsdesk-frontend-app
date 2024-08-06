<template>
  <div class="w-11/12 m-auto flex flex-col gap-4 h-full text-black min-w-max pb-32 z-40">
    <!-- <div class="h-24 rounded-md bg-black">.</div> -->

    <div v-for="menu in useModalStore().MenuSideBar" class="">
      <div
        class="flex flex-col p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-gray-50/50"
        @click="isClose(menu)">
        <div class="flex justify-between cursor-pointer" @click="Redirect(menu)">
          <!-- Menu button -->
          <div class="flex gap-2 justity-center items-center transition duration-75">
            <img :src="menu.icon"
              class="h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              alt="" />
            <div class="text-base font-bold">{{ menu.name }} </div>
          </div>

          <div class="" v-if="menu.children?.length != 0">
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <!-- <BtnMore :isNotBg="true" :name="menu.name" :title="menu.name" :dataDropMenu="menu.children" /> -->
        </div>
        <!--   -->
        <!-- Menu Link -->
        <div class="flex flex-col gap-1 py-4 gap-1transition duration-75 cursor-pointer " v-if="
          (useModalStore().isOpenMenu == menu.name ||
            menu.route == $route.name) &&
          menu.children?.length != 0
        ">
          <div v-for="ch in menu.children">
            <RouterLink :to="{ name: ch.route }" @click="ChangeMenu(ch)"
              class="flex items-center px-4 font-bold text-sm p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              :class="useModalStore().isOpenSubMenu == ch.name
                ? 'bg-gray-200 dark:bg-gray-700'
                : ''
                ">
              {{ ch.name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>





  </div>

  <!-- <BtnMore  /> -->
</template>
<script lang="ts" setup>
// import { ref } from 'vue';
import { API_URL } from "@/routes/api.route";
import { useApiServices } from "@/services/api.services";
import { useModalStore } from "@/stores/modal.store";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// import BtnMore from "@/components/mores/btn.more.vue";
const props = defineProps(["content"]);
const router = useRouter();
const route = useRoute()

const isClose = (menu: any) => {
  if (useModalStore().isOpenMenu == menu.name && menu.route == route.name) {
    useModalStore().isOpenMenu = ''
  } else {
    useModalStore().isOpenMenu = menu.name
  }
}

const ChangeMenu = (ch: any) => {
  useModalStore().isOpenSubMenu = ch.name
  useModalStore().isMenu = !useModalStore().isMenu
}

const Redirect = (menu: any) => {
  if (menu.children.length == 0) {
    router.push({ name: menu.route });
  }
};

const { readData } = useApiServices()
const PermissionRole: any = ref(<any>[])
const GetUserRolePermission = () => {


  readData(API_URL.PERMISSIONS_USER_CONNECTER)
    .then((data: any) => {
      PermissionRole.value = data.datas
      useModalStore().Permissions = data.datas
      useModalStore().MenuSideBar = props.content.map((menuItem: any) => {
        return {
          ...menuItem,
          children: menuItem.children.filter((child: any) => PermissionRole.value.some((p: any) => p.name === child.permission))
        };
      }).filter((menuItem: any) => menuItem.children.length > 0);


    })
    .catch(() => {
      // state.loading = false;
    });
}



// const dropdown = () => {
//   document.querySelector("#submenu")?.classList.toggle("hidden");
//   document.querySelector("#arrow")?.classList.toggle("rotate-0");
// }


// const openSidebar = () => {
//   document.querySelector(".sidebar")?.classList.toggle("hidden");
// }



onMounted(() => {

  if (useModalStore().MenuSideBar.length == 0) {
    GetUserRolePermission()
  }
})

</script>
<style lang="scss" scoped></style>
