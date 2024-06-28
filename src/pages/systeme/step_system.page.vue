<template>
    <BaseLayout>
       <template v-slot:content>
          <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
             <ContentLayout title="COMPTABILITES | StepProspect">
                <template v-slot:created>
                   <StepProspectModal name="Ajouter l\'étape du prospect" :title="useUpdateStore().isUpdate.is
                      ? 'Modifier l\'étape du prospect'
                      : 'Ajouter l\'étape du prospect'
                      " />
 
                   <DeleteLayout title="Ajouter un nouvel categorie" :funDelete="StepProspectDelete"
                      :id="useUpdateStore().isDelete.id" />
                </template>
             </ContentLayout>
             <Table v-if="storeStepProspects.length != 0" :dataTables="storeStepProspects" :MenuActions="MenuStepProspectActions"
                :display="StepProspectTables" />
 
             <PageLoader :loading="setStepProspect.loading" :data="storeStepProspects" name="Aucune transaction" />
          </section>
       </template>
    </BaseLayout>
 </template>
 <script lang="ts" setup>
 import Table from '@/components/tables/table.vue';
 import BaseLayout from '@/layouts/base.layout.vue';
 import ContentLayout from '@/layouts/content.layout.vue';
 import { MenuStepProspectActions } from '@/routes/actions.route';
 import { onMounted } from 'vue';
 import PageLoader from '@/components/loaders/page.loader.vue';
 import { StepProspectTables } from '@/tables/SYSTEME/step_prospect.table';
 import { useStepProspectHook } from '@/hooks/SYSTEME/step_prospect.hook.ts';
 import { useUpdateStore } from '@/stores/update.store';
 import StepProspectModal from '@/components/modals/SYSTEME/step_prospect.modal.vue';
 import DeleteLayout from '@/layouts/delete.layout.vue';
 
 const { FindStepProspectAll, storeStepProspects, StepProspectDelete, setStepProspect } = useStepProspectHook();
 
 onMounted(() => {
    FindStepProspectAll();
 });
 </script>
 <style lang="scss" scoped></style>