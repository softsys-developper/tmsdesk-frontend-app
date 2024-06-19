<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="Proforma | Listes"> </ContentLayout>

        <!-- Invoice -->
        <div
          class="w-full px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10"
          v-if="Parametres && ProformaShow"
        >
          <div class="sm:w-11/12 lg:w-3/4 mx-auto">
            <!-- Card -->
            <div
              class="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-neutral-800"
            >
              <!-- Grid -->
              <div class="flex justify-between">
                <div>
                  <img :src="Parametres.logo" alt="" />

                  <h1
                    class="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white"
                  >
                    {{ Parametres.denomination }}
                  </h1>
                </div>
                <!-- Col -->

                <div class="text-end">
                  <h2
                    class="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-neutral-200"
                  >
                    Facture proforma #
                  </h2>
                  <span class="mt-1 block text-gray-500 dark:text-neutral-500">
                    {{}}
                  </span>

                  <address
                    class="mt-4 not-italic text-gray-800 dark:text-neutral-200"
                  >
                    {{ Parametres.adresse }}<br />
                    {{ Parametres.telephone_1 }}<br />
                  </address>
                </div>
                <!-- Col -->
              </div>
              <!-- End Grid -->

              <!-- Grid -->
              <div class="mt-8 grid sm:grid-cols-2 gap-3">
                <div>
                  <h3
                    class="text-lg font-semibold text-gray-800 dark:text-neutral-200"
                  >
                    {{ Parametres.denomination }} A:
                  </h3>
                  <h3
                    class="text-lg font-semibold text-gray-800 dark:text-neutral-200"
                  >
                    {{ ProformaShow.client?.nom }}
                  </h3>
                  <address
                    class="mt-2 not-italic text-gray-500 dark:text-neutral-500"
                  >
                  {{ ProformaShow.client?.adresse }},<br />
                  {{ ProformaShow.client?.email }},<br />
                  {{ ProformaShow.client?.telephone }}<br />
                  </address>
                </div>
                <!-- Col -->

                <div class="sm:text-end space-y-2">
                  <!-- Grid -->
                  <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl class="grid sm:grid-cols-5 gap-x-3">
                      <dt
                        class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                      >
                        Date de creation:
                      </dt>
                      <dd
                        class="col-span-2 text-gray-500 dark:text-neutral-500"
                      >
                        {{ProformaShow.date_validite}}
                      </dd>
                    </dl>
                    <dl class="grid sm:grid-cols-5 gap-x-3 ">
                      <dt
                        class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                      >
                        Date de validite:
                      </dt>
                      <dd
                        class="col-span-2 text-gray-500 dark:text-neutral-500"
                      >
                      {{ProformaShow.date_validite}}
                      </dd>
                    </dl>
                  </div>
                  <!-- End Grid -->
                </div>
                <!-- Col -->
              </div>
              <!-- End Grid -->

              <!-- Table -->
              <div class="mt-6">
                <div
                  class="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-neutral-700"
                >
                  <div class="hidden sm:grid sm:grid-cols-5">
                    <div
                      class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Désignation
                    </div>
                    <div
                      class="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Qte
                    </div>
                    <div
                      class="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      PU
                    </div>
                    <div
                      class="text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      PT
                    </div>
                  </div>

                  <div
                    class="hidden sm:block border-b border-gray-200 dark:border-neutral-700"
                  ></div>

                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2" v-for="service in ProformaShow.produit_services">
                    <div class="col-span-full sm:col-span-2"  >
                      <h5
                        class="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Item
                      </h5>
                      <p
                        class="font-medium text-gray-800 dark:text-neutral-200"
                      >
                        {{service.libelle}}
                      </p>
                    </div>
                    <div>
                      <h5
                        class="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Qte
                      </h5>
                      <p class="text-gray-800 dark:text-neutral-200"> {{service.pivot?.quantite}} </p>
                    </div>
                    <div>
                      <h5
                        class="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Rate
                      </h5>
                      <p class="text-gray-800 dark:text-neutral-200">{{service.pivot?.prix_unitaire}}</p>
                    </div>
                    <div>
                      <h5
                        class="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Amount
                      </h5>
                      <p
                        class="sm:text-end text-gray-800 dark:text-neutral-200"
                      >
                      {{service.pivot?.montant}}
                      </p>
                    </div>
                  </div>

              

             
                </div>
              </div>
              <!-- End Table -->

              <!-- Flex -->
              <div class="mt-8 flex sm:justify-end">
                <div class="w-full max-w-2xl sm:text-end space-y-2">
                  <!-- Grid -->
                  <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl class="grid sm:grid-cols-5 gap-x-3">
                      <dt
                        class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                      >
                        TOTAL HT:
                      </dt>
                      <dd
                        class="col-span-2 text-gray-500 dark:text-neutral-500"
                      >
                      {{ProformaShow.montant_ht}}
                      </dd>
                    </dl>

                    <dl class="grid sm:grid-cols-5 gap-x-3">
                      <dt
                        class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                      >
                        TVA (18%):
                      </dt>
                      <dd
                        class="col-span-2 text-gray-500 dark:text-neutral-500"
                      >
                      <!-- {{ProformaShow.montant_ht * ProformaShow.TVA}} -->
                      </dd>
                    </dl>

                    <dl class="grid sm:grid-cols-5 gap-x-3">
                      <dt
                        class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                      >
                        REMISE ({{ProformaShow.remise_pourcentage}}%)
                      </dt>
                      <dd
                        class="col-span-2 text-gray-500 dark:text-neutral-500"
                      >
                      {{ProformaShow.remise_forfaitaire}}
                      </dd>
                    </dl>

                    <dl class="grid sm:grid-cols-5 gap-x-3">
                      <dt
                        class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                      >
                        TotalTTC::
                      </dt>
                      <dd
                        class="col-span-2 text-blue-500 dark:text-neutral-500"
                      >
                      {{ProformaShow.montant_ttc}}
                      </dd>
                    </dl>
                  </div>
                  <!-- End Grid -->
                </div>
              </div>
              <!-- End Flex -->

              <div class="mt-8 sm:mt-12 mb-2">
                <div class="mt-2">
                  <p
                    class="block text-sm font-medium text-gray-800 dark:text-neutral-200"
                  >
                    Arrêté le présent devis à la somme de
                  </p>
                  <h4
                    class="text-lg font-semibold text-gray-800 dark:text-neutral-200"
                  >
                    CINQUANTE MILLIONS HUIT CENT CINQUANTE-HUIT MILLE Fcfa
                  </h4>
                </div>

                <p class="text-gray-500 dark:text-neutral-500">
                  A l'attention de Houphouet Emeraude:
                </p>
                <div class="mt-2">
                  <p
                    class="block text-sm font-medium text-gray-800 dark:text-neutral-200"
                  >
                    Cette proforma est valable pour 30 jours à compter de la
                    date d'emission
                  </p>
                </div>
              </div>

              <p
                class="mt-5 text-sm text-gray-500 dark:text-neutral-500 text-center border-t-[1px] pt-4"
              >
                SARL au capital 1 000 000Fcfa - RCCM : CI – ABJ-2016 – B - 4260
                CC : 1608130K - Cocody Saint Jean GTBANK : 25101002356 -
                www.softsys.ci Email : infos@softsys.ci - Tél. : +225 25 22 00
                96 65 – Cel : 07 47 99 99 92 / 07 09 02 00 52
              </p>
            </div>
            <!-- End Card -->

            <!-- Buttons -->
            <div class="mt-6 flex justify-end gap-x-3">
              <a
                class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-green-500 text-white shadow-sm align-middle hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                href="#"
              >
                <i class="ri-check-line text-base"></i>
                Valider
              </a>
              <a
                class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                href="#"
              >
                <svg
                  class="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Facture PDF
              </a>
              <a
                class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                href="#"
              >
                <svg
                  class="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path
                    d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                  />
                  <rect width="12" height="8" x="6" y="14" />
                </svg>
                imprimer
              </a>
            </div>
            <!-- End Buttons -->
          </div>
        </div>
        <!-- End Invoice -->
      </section>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import axios from "axios";
import BaseLayout from "./../../layouts/base.layout.vue";
import { onMounted, ref } from "vue";
import { API_URL } from "@/routes/api.route";
import { useRoute } from "vue-router";
import { PROFORMA } from "@/types/CRM/proforma.type";
import { SETTING } from "@/types/setting.type";

const ProformaShow = ref(<PROFORMA>{});
const Parametres = ref(<SETTING>{});

const GetFacture = async () => {
  const route = useRoute();
  const { data } = await axios.get(
    API_URL.PROFORMA_DETAILS + "/" + route.query.id
  );
  if (data) {
    Parametres.value = data.parametre;
    ProformaShow.value = data.data;
  }
};

onMounted(() => {
  GetFacture();
});
</script>
<style lang="scss" scoped></style>
