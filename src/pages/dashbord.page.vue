<template>
   <BaseLayout>
      <template v-slot:content>
         <div class="grid grid-cols-3 gap-2 w-full">
            <div v-for="DT_Menu in isApp == 'usimeca' ? MenuApp.filter(item => item.name != 'logistiques' && item.name != 'Système') : MenuApp ">
               <DashbordCard :content="DT_Menu" />
            </div>
         </div>
      </template>
   </BaseLayout>
</template>
<script lang="ts" setup>
import BaseLayout from '../layouts/base.layout.vue';
import DashbordCard from '../components/cards/dashbord.card.vue';
import { MenuApp } from '../routes/menu.route';
import { isApp } from '@/services/app.services';

   

</script>
<style lang="scss" scoped></style>
