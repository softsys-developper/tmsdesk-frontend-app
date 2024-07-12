<template>
  <BaseLayout>
    <template v-slot:content>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-2 w-full"
        v-if="useModalStore().MenuSideBar && !useModalStore().Permissions.map((el:any) => el.name).includes('attribuer-permission-utilisateur')">
        <div v-for="DT_Menu in useModalStore().MenuSideBar">
          <DashbordCard :content="DT_Menu" />
        </div>
      </div>

      <AppStats v-else />
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import BaseLayout from "../layouts/base.layout.vue";
import DashbordCard from "../components/cards/dashbord.card.vue";
import { onMounted } from "vue";
import { useModalStore } from "@/stores/modal.store";
// import { isApp } from '@/services/app.services';
import AppStats from "@/statistics/app.stats.vue"


// const IsStats = ref(true)

onMounted(() => {

})

</script>
<style lang="scss" scoped></style>
