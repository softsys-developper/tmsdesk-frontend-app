<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="Proforma | Listes"> </ContentLayout>

        <div class="">
          <!--  -->
          <div class="">
            <!-- Logo -->
            <div class=""></div>

            <!-- Signature Logo -->
            <div class=""></div>
          </div>

          <div class="flex justify-between w-10/12 m-auto">
            <!--  -->
            <div class="">
              <label for="">FACTURE PROFORMA:</label>
                <div class="flex flex-col">
                <span class=""> Numéro: Jean Yevs </span>
                <span class=""> date: Jean Yevs </span>
              </div>
            </div>

            <!--  -->
            <div class="">
              <p>CLIENT:</p>
              <div class="flex flex-col">
                <span class=""> Nom: Jean Yevs </span>
                <span class=""> Adresse: Jean Yevs </span>
                <span class=""> Contact: Jean Yevs </span>
              </div>
            </div>
          </div>

          <!--  -->
          <div class=""></div>

          <!--  -->
          <div class="">
            <div class="">
              <span class="">Arrêté le présent devis à la somme de </span>
              <span class="">CENT SOIXANTE MILLIONS Fcfa</span>
            </div>

            <div class="">
              <span class="">A l'attention de </span>
              <span class="">Francis Lura</span>
            </div>

            <span class=""
              >Cette proforma est valable pour 30 jours à compter de la date
              d'emission</span
            >
          </div>
        </div>
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import BaseLayout from "./../../layouts/base.layout.vue";
import { onMounted } from "vue";

onMounted(() => {});
</script>
<style lang="scss" scoped></style>
