<template>
    <BaseLayout>
        <template v-slot:content>
            <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
                <ContentLayout title="Logistique | Détails Livraison">
                    <template v-slot:created>
                        <DeleteLayout :funDelete="FindBCLivraisonDetailDelete" :id="useUpdateStore().isDelete.id" />
                        <!-- <RouterLink :to="{ name: 'LOGISC_BC_PARTENAIRES_ADD' }"
                      class="bg-orange-500 font-bold py-2 px-4 rounded-md text-white flex gap-1 items-center">
                      <i class="ri-add-line text-sm"></i>
                      <span class="hidden lg:flex">Nouveau livraison</span>
                   </RouterLink> -->
                    </template>
                </ContentLayout>
                <Table v-if="storeBCLivraisonDetails.length != 0" :dataTables="storeBCLivraisonDetails"
                    :MenuActions="MenuBCLivraisonDetailActions" :display="BCLivraisonDetailTables" />

                <PageLoader :loading="setBCLivraisonDetail.loading" :data="storeBCLivraisonDetails"
                    name="Aucune BCLivraisonDetail" />
            </section>
        </template>
    </BaseLayout>
</template>
<script lang="ts" setup>
import Table from './../../components/tables/table.vue';
import BaseLayout from './../../layouts/base.layout.vue';
import ContentLayout from '@/layouts/content.layout.vue';
import { MenuBCLivraisonDetailActions } from '@/routes/actions.route';
import { onMounted } from 'vue';
import PageLoader from '@/components/loaders/page.loader.vue';
import { BCLivraisonDetailTables } from '@/tables/LOGISTIQUE/bc_livraison_detail.tables';
import { useBCLivraisonDetailHook } from '@/hooks/LOGISTIQUE/bc_livraison_detail.hook';
import DeleteLayout from '@/layouts/delete.layout.vue';
import { useUpdateStore } from '@/stores/update.store';
import { useRoute } from 'vue-router';

const route = useRoute()

const { storeBCLivraisonDetails, FindBCLivraisonDetailOne, FindBCLivraisonDetailDelete, setBCLivraisonDetail } = useBCLivraisonDetailHook();

onMounted(() => {
    FindBCLivraisonDetailOne(route.query?.id);
});
</script>
<style lang="scss" scoped></style>