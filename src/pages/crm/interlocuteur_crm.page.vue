

<template>
    <BaseLayout>
      <template v-slot:content>
        <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
          <ContentLayout v-if="useDataStore().Interlocuteurs" :title="'CRM | Liste Interlocuteurs '">
            <template v-slot:created>
              <InterlocuteurdModal
                :name="'Ajouter Interlocuteurs'"
                :title="
                  useUpdateStore().isUpdate.is
                    ? 'Modifier Interlocuteurs'
                    : 'Ajouter Interlocuteurs'
                "
              />
  
              <DeleteLayout
                :funDelete="InterlocuteurDelete"
                :id="useUpdateStore().isDelete.id"
              />
            </template>
          </ContentLayout>
  
          <Table
            v-if="useDataStore().Interlocuteurs.length != 0"
            :dataTables="storeInterlocuteurs"
            :MenuActions="MenuInterlocuteurActions"
            :display="InterlocuteurTables"
          />
  
          <PageLoader
            :loading="setInterlocuteur.loading"
            :data="useDataStore().Interlocuteurs"
            name="Aucun interlocuteurs"
          />
        </section>
      </template>
    </BaseLayout>
  </template>
  <script lang="ts" setup>
  import Table from "./../../components/tables/table.vue";
  import BaseLayout from "./../../layouts/base.layout.vue";
  import ContentLayout from "@/layouts/content.layout.vue";
  import InterlocuteurdModal from "@/components/modals/CRM/interlocuteur.modal.vue";
  import { MenuInterlocuteurActions } from "@/routes/actions.route";
  import { computed, onActivated, onMounted } from "vue";
  import { useDataStore } from "@/stores/data.store";
  import PageLoader from "@/components/loaders/page.loader.vue";
  import { InterlocuteurTables } from "@/tables/CRM/intercoluteur.tables";
  import { useInterlocuteurHook } from "@/hooks/CRM/interlocuteur.hook";
  import { useUpdateStore } from "@/stores/update.store";
  import DeleteLayout from "@/layouts/delete.layout.vue";
import { useRoute } from "vue-router";
import { API_URL } from "@/routes/api.route";


const route = useRoute()
  
  const { FindInterlocuteurOne,   InterlocuteurDelete, setInterlocuteur } = useInterlocuteurHook();
  const storeInterlocuteurs = computed(() => {
      return useDataStore().Interlocuteurs;
    });
  
  onActivated(() => {
    setInterlocuteur.loading = false
    useDataStore().Interlocuteurs = []
    FindInterlocuteurOne(route.query.type == 'prospect' ? API_URL.INTERLOCUTEUR_CLIENT_LIST : API_URL.INTERLOCUTEUR_FOURNISSUER_LIST, route.query?.id);
  });

  onMounted(() => {
    setInterlocuteur.loading = false
    useDataStore().Interlocuteurs = []
    FindInterlocuteurOne(route.query.type == 'prospect' ? API_URL.INTERLOCUTEUR_CLIENT_LIST : API_URL.INTERLOCUTEUR_FOURNISSUER_LIST, route.query?.id);
  });

  </script>
  <style lang="scss" scoped></style>
   