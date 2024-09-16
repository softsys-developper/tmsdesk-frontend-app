<template>

<div class="bg-black/20 w-full h-full fixed inset-0 z-40 lg:hidden" @click="useModalStore().isMenu = !useModalStore().isMenu" v-if="!useModalStore().isMenu "></div>
  <aside id="sidebar-multi-level-sidebar"
    class="fixed top-0 left-0 z-40 w-56 h-screen transition-transform sm:translate-x-0 shadow-right shadow-xl "
    :class="useModalStore().isMenu ? '-translate-x-full ' : 'translate-x-0'" aria-label="Sidebar">
    <div class="h-full px-3  overflow-y-auto bg-white dark:bg-gray-800 py-8">


      <div class=" mb-4">
        <img class="h-16" src="/images/logo/tms.png" alt="">
      </div>

      <MenuHeaderCard
        :content="isApp == 'usimeca' ? MenuApp.filter(item => item.name != 'Proforma' && item.name != 'logistiques' && item.name != 'Systèmes' && item.name != 'Utilisateurs') : MenuApp" />

    </div>
  </aside>

  <div class="p-0 sm:ml-56 ">
    <div class="p-0 rounded-lg dark:border-gray-700">
      <slot name="content" />
    </div>
  </div>
</template>
<script setup lang="ts">

import MenuHeaderCard from "@/components/cards/menu_header.card.vue";
import { MenuApp } from '@/routes/menu.route';
import { useModalStore } from "@/stores/modal.store";
import { isApp } from '@/services/app.services';

</script>
<style lang="scss" scoped></style>
