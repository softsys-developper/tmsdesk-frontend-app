<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-4">
        <ContentLayout
          :title="`R. Humaines | ${
            $route.query.id ? 'Modification stagiaire' : 'Création stagiaire'
          }`"
        >
          <template v-slot:created> </template>
        </ContentLayout>

        <form @submit.prevent="onSubmit" class="w-11/12 m-auto">
          <div class="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4">
            <div class="" v-for="fr in StagiaireForms">
              <InForm
                :title="fr.label"
                :name="fr.name"
                :label="fr.label"
                :type="fr.type"
                :placeholder="fr.placeholder"
                :select="fr.select"
              />
            </div>
          </div>

          <div class="p-8 flex justify-between w-full">
            <span class=""></span>
            <button
              type="submit"
              class="bg-gray-800 px-4 py-2 font-bold text-white rounded-md"
              :disabled="setStagiaire.loadingCreate"
            >
              <SpinnerLoader size="w-6 h-6" v-if="setStagiaire.loadingCreate" />
              <span class="" v-else>
                {{
                  route.query.id ? "Modifier un stagiaire" : "Créer un stagiaire"
                }}
              </span>
            </button>
          </div>
        </form>
      </section>
    </template>
  </BaseLayout>

  <!-- {{ ProductAndServices }} -->
</template>
<script lang="ts" setup>
import BaseLayout from "@/layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { StagiaireForms } from "@/forms/RH/stagiaire.forms";
import InForm from "@/components/forms/in.form.vue";
import { useApiServices } from "@/services/api.services";
import { useStagiaireHook } from "@/hooks/RH/stagiaire.hook";
import SpinnerLoader from "@/components/loaders/spinner.loading.vue";
import { onMounted } from "vue";
import { API_URL } from "@/routes/api.route";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { readData, showData } = useApiServices();
const { setStagiaire, CreateStagiaire, StagiaireUpdate } = useStagiaireHook();

const onSubmit = (e: any) => {
  const values = new FormData(e.target);
  if (!route.query.id) {
    CreateStagiaire(values, route.query.id, route, router);
  } else {
    StagiaireUpdate(route.query.id, values, () => {
      router.push({ name: "RH_PERSONAL" });
    });
  }
};

const FindShowStagiaire = () => {
  if (route.query.id) {
    showData(API_URL.STAGE_SHOW, "/" + route.query.id).then((data) => {
      const PERSONAL: any = data.data;
      const InputKey = Object.keys(PERSONAL).filter((el) => {
        return el != "photo" && el != "fiche_poste" && el != "contrat";
      });

      InputKey?.forEach((el) => {
        let UpdateInput: any = document.querySelector(`#${el}`);

        if (UpdateInput != null) {
          console.log(UpdateInput);
          UpdateInput.value = PERSONAL[el];
        }
      });

      setTimeout(() => {
        // const solde_conge_annuel:any = document.querySelector(`#solde_conge_annuel`)
        const service: any = document.querySelector(`#service`);
        const salaire: any = document.querySelector(`#salaire`);
        // solde_conge_annuel.value = PERSONAL['solde_conge_annuel']
        service.value = PERSONAL["service_id"];
        salaire.value = PERSONAL["salaire_id"];
      }, 500);
    });
  }
};

function remplacerObjetDansTableau(
  tableau: any,
  proprieteRecherche: any,
  valeurRecherche: any,
  nouvelObjet: any
) {
  const index = tableau.findIndex(
    (obj: any) => obj[proprieteRecherche] === valeurRecherche
  );
  if (index !== -1) {
    tableau[index].select = nouvelObjet;
  }
}

onMounted(() => {
  FindShowStagiaire();
  readData(API_URL.SERVICE_LIST).then((data) =>
    remplacerObjetDansTableau(
      StagiaireForms,
      "name",
      "service",
      data.datas.map((el: any) => ({ id: el.id, libelle: el.libelle }))
    )
  );
});
</script>
<style lang="scss" scoped></style>
