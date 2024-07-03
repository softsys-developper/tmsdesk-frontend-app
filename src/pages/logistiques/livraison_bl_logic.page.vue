<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="Logistique | Bon de livraison"> </ContentLayout>

        <div class="flex justify-center items-center h-64" v-if="loading">
          <SpinnerLoading />
        </div>

        <div
          class="flex flex-col gap-8"
          v-if=" LivraisonShow && !loading"
        >
          <!-- Buttons -->
          <div class="flex justify-end gap-x-3 w-11/12">
          
            <a
              @click="printDivAsPDF"
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
              BL PDF
            </a>
          </div>
          <!-- End Buttons -->

          <!-- Invoice -->
          <div class="w-full mx-auto bg-white" id="printableDiv">
            <div class="sm:w-11/12 lg:w-4/4 mx-auto">
              <!-- Card -->
              <div class="flex flex-col rounded-xl dark:bg-neutral-800">
                <!-- Grid -->
                <div class="flex justify-between">
                  <div>
                    <h1 class="font-bold text-2xl">BON DE LIVRAISON</h1>

                    <div
                      class="mt-1 border-[1px] text-sm px-4 py-1 block text-gray-500 dark:text-neutral-500"
                    >
                      QUOTE #
                      {{
                         LivraisonShow.proforma?.numero_proforma
                      }}
                    </div>
                  </div>

                  <div class="h-24"><img class="h-full" src="/images/logo/tms.jpeg" alt=""></div>
                </div>
                <!-- End Grid -->

                <!-- Grid -->
                <div class="mt-8 grid sm:grid-cols-2 gap-3">
                  <div>
                  
                  </div>
                  <!-- Col -->

                  <div class="sm:text-end space-y-2">
                     
                    <!-- Grid -->
                    <div
                      class="grid grid-cols-2 text-sm sm:grid-cols-1 gap-3 sm:gap-2"
                    >
                      <dl class="grid sm:grid-cols-5 gap-x-3 text-xs">
                        <dt
                          class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                        >
                          DATE:
                        </dt>
                        <dd
                          class="col-span-2 text-gray-500 dark:text-neutral-500"
                        >
                          {{ LivraisonShow.date_livraison }}
                        </dd>
                      </dl>
                      <dl class="grid sm:grid-cols-5 text-xs ">
                        <dt
                          class="col-span-3 font-semibold   text-gray-800 dark:text-neutral-200"
                        >
                          Votre commande N*:
                        </dt>
                        <dd
                          class="col-span-2 text-gray-500  dark:text-neutral-500"
                        >
                          {{ LivraisonShow.reference }}
                        </dd>
                      </dl>
                    </div>
                    <!-- End Grid -->
                  </div>
                  <!-- Col -->
                </div>
                <!-- End Grid -->

                <div class="relative flex flex-col gap-3 sm:rounded-lg mt-8">
                  

                  <table
                    class="min-w-full border-collapse border border-gray-200"
                  >
                    <thead>
                      <tr class="text-xs">
                        <th class="border-[1px] px-4 py-2">No</th>
                        <th class="border-[1px] px-4 py-2">Description</th>
                        <th class="border-[1px] px-4 py-2">QTY PO</th>
                        <th class="border-[1px] px-4 py-2">QTY BL</th>
                        <th class="border-[1px] px-4 py-2">UNIT</th>
                        <th class="border-[1px] px-4 py-2">Observation</th>
                      </tr>
                    </thead>
              
                    <tbody
                      v-for="(service, index) in LivraisonShow.produit_livres"
                    >
                      <tr class="text-xs">
                        <td class="border-[1px] px-4 py-2">{{ index + 1 }}</td>
                        <td class="border-[1px] px-4 py-2">
                          {{ LivraisonShow.proforma.produit_services[index].description }}
                        </td>
                        <td class="border-[1px] px-4 py-2">
                          {{ service.quantite_livree }}
                        </td>
                        <td class="border-[1px] px-4 py-2">
                          {{ service.quantite_restante }}
                        </td>
                        <td class="border-[1px] px-4 py-2">
                          {{ LivraisonShow.proforma.produit_services[index].unite }}
                        </td>
                        <td class="border-[1px] px-4 py-2">
                          {{ LivraisonShow.proforma.produit_services[index].remarque }} 
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              

                <div class="flex justify-between my-16">
                  <div class=""></div>

                  <div class="flex justify-center items-center flex-col">
                    <div class="font-bold border-2 text-xs text-gray-700 px-6 py-2">
                        {{ LivraisonShow.proforma?.user?.name }}
                    </div>
                    
                  </div>
                </div>

               

                <p
                  class="mt-5 text-sm text-gray-500 dark:text-neutral-500 text-center border-t-[1px] pt-4"
                >
                  <!-- SARL au capital 1 000 000Fcfa - RCCM : CI – ABJ-2016 – B - 4260
                    CC : 1608130K - Cocody Saint Jean GTBANK : 25101002356 -
                    www.softsys.ci Email : infos@softsys.ci - Tél. : +225 25 22 00
                    96 65 – Cel : 07 47 99 99 92 / 07 09 02 00 52 -->
                
                </p>
              </div>
              <!-- End Card -->
            </div>
          </div>
          <!-- End Invoice -->
        </div>
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
import { SETTING } from "@/types/setting.type";
import { useApiServices } from "@/services/api.services";
import SpinnerLoading from "@/components/loaders/spinner.loading.vue";
import ContentLayout from "@/layouts/content.layout.vue";

const LivraisonShow = ref(<any>{});
const LivraisonMore = ref(<any>{});
const Parametres = ref(<SETTING>{});
const loading = ref(false);
const route = useRoute();

const GetLivraison = async () => {
  loading.value = true;
  // readData(API_URL.SETTING_LIST).then((data) => {
  //   Parametres.value = data.datas
  // })
  const { data } = await axios.get(
    route.query.facture
      ? API_URL.LIVRAISON_DETAIL + "" + route.query.id
      : API_URL.LIVRAISON_DETAIL + "" + route.query.id
  );
  if (data) {
    loading.value = false;
    LivraisonShow.value = data.data.livraison;
    Parametres.value = data.parametre;
    LivraisonMore.value = data.facture;
  }
};

const {  } = useApiServices();

onMounted(() => {
// showData(API_URL.LIVRAISON_DETAIL, route.query.id)
  GetLivraison();
});

import html2pdf from "html2pdf.js";

const printDivAsPDF = () => {
  const element = document.getElementById("printableDiv");
  if (element) {
    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: "document.pdf",
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .save();
  }
};
</script>
<style lang="scss" scoped></style>
