<template>
  <div class="w-11/12 m-auto flex flex-col gap-4 h-full text-black min-w-max pb-32 z-40">
    <SidebarMenu v-for="(menu, index) in useModalStore().MenuSideBar" :key="index" :menu="menu" :index="index" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useModalStore } from "@/stores/modal.store";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import SidebarMenu from '@/components/sidebar/sidebarMenu.vue'; // Créez un composant séparé pour chaque menu

const props = defineProps(["content"]);
const PermissionRole = ref<any[]>([]);

const { readData } = useApiServices();
const GetUserRolePermission = async () => {
  try {
    const data = await readData(API_URL.PERMISSIONS_USER_CONNECTER);
    PermissionRole.value = data.datas;
    useModalStore().Permissions = data.datas;
    useModalStore().MenuSideBar = props.content
      .map((menuItem: any) => ({
        ...menuItem,
        children: menuItem.children.filter((child: any) =>
          PermissionRole.value.some((p: any) => p.name === child.permission)
        ),
      }))
      .filter((menuItem: any) => menuItem.children.length > 0);
  } catch (error) {
    console.error("Failed to load permissions:", error);
  }
};

onMounted(() => {
  if (!useModalStore().MenuSideBar.length) {
    GetUserRolePermission();
  }else{

  }
});

</script>

<style lang="scss" scoped></style>
