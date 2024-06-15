<template>
  <div
    class="w-11/12 m-auto flex flex-col gap-4 h-full text-black min-w-max pb-32"
  >
    <!-- <div class="h-24 rounded-md bg-black">.</div> -->

    <div v-for="menu in content" class="">
      <div
        class="flex flex-col p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-gray-50/50"
        @click="useModalStore().isOpenMenu = menu.name"
      >
        <div
          class="flex justify-between cursor-pointer"
          @click="Redirect(menu)"
        >
          <!-- Menu button -->
          <div
            class="flex gap-2 justity-center items-center transition duration-75"
          >
            <img
              :src="menu.icon"
              class="h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              alt=""
            />
            <div class="text-base font-bold">{{ menu.name }} </div>
          </div>

          <div class="" v-if="menu.children?.length != 0">
            <i class="ri-arrow-down-s-line"></i>
          </div>
          <!-- <BtnMore :isNotBg="true" :name="menu.name" :title="menu.name" :dataDropMenu="menu.children" /> -->
        </div>

        <!-- Menu Link -->
        <div
          class="flex flex-col gap-1 py-4 gap-1transition duration-75 cursor-pointer "
          v-if="
            (useModalStore().isOpenMenu == menu.name ||
              menu.route == $route.name) &&
            menu.children?.length != 0
          "
        >
          <div v-for="ch in menu.children">
            <RouterLink
              :to="{ name: ch.route }"
              @click="useModalStore().isOpenSubMenu = ch.name"
              class="flex items-center px-4 font-bold text-sm p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
              :class="
                useModalStore().isOpenSubMenu == ch.name
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : ''
              "
            >
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
import { useModalStore } from "@/stores/modal.store";
import { useRouter } from "vue-router";

// import BtnMore from "@/components/mores/btn.more.vue";
defineProps(["content"]);
const router = useRouter();

const Redirect = (menu: any) => {
  if (menu.children.length == 0) {
    router.push({ name: menu.route });
  }
};
</script>
<style lang="scss" scoped></style>
