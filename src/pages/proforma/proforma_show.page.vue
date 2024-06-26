<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-8">
        <ContentLayout title="Proforma | Détail"> </ContentLayout>

        <div class="flex justify-center items-center h-64" v-if="loading">
          <SpinnerLoading />
        </div>

        <div class="flex flex-col gap-8" v-if="Parametres && ProformaShow && !loading">
          <!-- Buttons -->
          <div class="flex justify-end gap-x-3 w-11/12">
            <Button :disabled="ProformaShow.etat == '2' ? true : false"
              class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-green-500 text-white shadow-sm align-middle hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              @click="ValidateProforma">
              <SpinnerLoading v-if="setState.loading_validate" />
              <div class="flex items-center gap-1" v-else>
                <i class="ri-check-line text-base"></i>
                Valider
              </div>
            </Button>
            <Button :disabled="ProformaShow.etat == '3' || '2' ? true : false"
              class="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-red-500 text-white shadow-sm align-middle hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              @click="RejeterProforma">
              <SpinnerLoading v-if="setState.loading_validate" />
              <div class="flex items-center" v-else>
                <i class="ri-check-line text-base"></i>
                Rejete
              </div>
            </Button>
            <a @click="printDivAsPDF"
              class="py-2 px-3  inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              href="#">
              <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Facture PDF
            </a>
            <a class="py-2 px-3 hidden inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              href="#">
              <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect width="12" height="8" x="6" y="14" />
              </svg>
              imprimer
            </a>
          </div>
          <!-- End Buttons -->

          <!-- Invoice -->
          <div class="w-full  mx-auto  bg-white" id="printableDiv">
            <div class="sm:w-11/12 lg:w-4/4 mx-auto">
              <div class="">
                <img :src="'https://apps.tmsdesk.com/parametres/' + Parametres.entete
                  " alt="" />
              </div>

              <!-- Card -->
              <div class="flex flex-col   rounded-xl dark:bg-neutral-800">
                <!-- Grid -->
                <div class="flex justify-between">
                  <div>
                    <img :src="Parametres.logo" alt="" />

                    <h1 class="mt-2 text-xl md:text-base font-semibold text-blue-600 dark:text-white">
                      {{ Parametres.denomination }}
                    </h1>
                  </div>
                  <!-- Col -->

                  <div class="text-end">
                    <h2 class="text-lg md:text-xl font-semibold text-gray-800 dark:text-neutral-200">
                     {{ $route.query.facture ? 'Facture' : 'Facture proforma' }}
                    </h2>
                    <span class="mt-1 block text-gray-500 dark:text-neutral-500">
                     
                     QUOTE # {{ $route.query.facture ? FactureMore.numero_facture : ProformaShow.numero_proforma }}
                    </span>

                    <address class="mt-4 text-sm not-italic text-gray-800 dark:text-neutral-200">
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
                    <h3 class="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                      {{ Parametres.denomination }} A:
                    </h3>
                    <h3 class="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                      {{ ProformaShow.client?.nom }}
                    </h3>
                    <address class="mt-2 text-sm not-italic text-gray-500 dark:text-neutral-500">
                      {{ ProformaShow.client?.adresse }},<br />
                      {{ ProformaShow.client?.email }},<br />
                      {{ ProformaShow.client?.telephone }}<br />
                    </address>
                  </div>
                  <!-- Col -->

                  <div class="sm:text-end space-y-2">
                    <!-- Grid -->
                    <div class="grid grid-cols-2 text-sm sm:grid-cols-1 gap-3 sm:gap-2">
                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                          DATE:
                        </dt>
                        <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                          {{ ProformaShow.date_validite }}
                        </dd>
                      </dl>
                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                          VALID UNTIL:
                        </dt>
                        <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                          {{ ProformaShow.date_validite }}
                        </dd>
                      </dl>
                    </div>
                    <!-- End Grid -->
                  </div>
                  <!-- Col -->
                </div>
                <!-- End Grid -->



                <div class="relative flex flex-col gap-3  sm:rounded-lg  mt-8">

                  <div class="bg-blue-500 flex justify-center font-bold text-white uppercase text-sm py-1">
                    Quotation
                  </div>

                  <table class="min-w-full border-collapse border border-gray-200">
                    <thead>
                      <tr class="text-sm">
                        <th class="border-[1px] px-4 py-2">No</th>
                        <th class="border-[1px] px-4 py-2">Parts</th>
                        <th class="border-[1px] px-4 py-2">Description</th>
                        <th class="border-[1px] px-4 py-2">Brands</th>
                        <th class="border-[1px] px-4 py-2">QTY</th>
                        <th class="border-[1px] px-4 py-2">PU</th>
                        <th class="border-[1px] px-4 py-2">PT</th>
                      </tr>
                    </thead>
                    <tbody v-for="(service, index) in ProformaShow.produit_services">
                      <tr class="text-xs">
                        <td class="border-[1px] px-4 py-2"> {{ index + 1 }} </td>
                        <td class="border-[1px] px-4 py-2"> {{ service.reference }} </td>
                        <td class="border-[1px] px-4 py-2"> {{ service.description }} </td>
                        <td class="border-[1px] px-4 py-2"> {{ service.remarques }} </td>
                        <td class="border-[1px] px-4 py-2"> {{ service.quantite }} </td>
                        <td class="border-[1px] px-4 py-2"> {{ service.prix_unitaire }} </td>
                        <td class="border-[1px] px-4 py-2"> {{ Number(service.prix_unitaire) * service.quantite }} </td>
                      </tr>
                    </tbody>
                  </table>
                </div>




                <!-- Flex -->
                <div class="mt-8 flex sm:justify-end">
                  <div class="w-full text-sm max-w-2xl sm:text-end space-y-2">
                    <!-- Grid -->
                    <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                          TOTAL HT:
                        </dt>
                        <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                          {{ ProformaShow.montant_ht }}
                        </dd>
                      </dl>

                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                          TVA (18%):
                        </dt>
                        <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                          {{
                            Number(ProformaShow.montant_ht) *
                            Number(ProformaShow.TVA ? ProformaShow.TVA : "0")
                          }}
                        </dd>
                      </dl>

                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                          REMISE ({{
                            ProformaShow.remise_pourcentage
                              ? Math.floor(
                                Number(ProformaShow.remise_pourcentage)
                              )
                              : "0"
                          }}%)
                        </dt>
                        <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                          {{
                            Number(
                              ProformaShow.remise_forfaitaire
                                ? ProformaShow.remise_forfaitaire
                                : "0"
                            )
                          }}
                        </dd>
                      </dl>

                      <dl class="grid sm:grid-cols-5 gap-x-3">
                        <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                          Total HTVA (GNF):
                        </dt>
                        <dd class="col-span-2 font-black text-blue-500 dark:text-neutral-500">
                          {{ ProformaShow.montant_ttc }}
                        </dd>
                      </dl>
                    </div>
                    <!-- End Grid -->
                  </div>
                </div>
                <!-- End Flex -->

                <div class="flex justify-between mt-8">
                  <div class=""></div>

                  <div class="flex justify-center items-center flex-col">
                    <div class="font-bold bg-blue-500 text-white px-6"> Prepared by </div>
                    <div class="text-base font-bold">{{ ProformaShow.user?.name }}</div>
                  </div>
                </div>

                <div class="mt-8 sm:mt-12 mb-2">
                  <div class="mt-2">
                    <p class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                      Arrêté le présent devis à la somme de
                    </p>
                    <h4 class="text-base font-semibold text-gray-800 dark:text-neutral-200">
                      {{ numberToWords(Number(ProformaShow.montant_ttc)) }}
                    </h4>
                  </div>

                  <p class="text-gray-500 dark:text-neutral-500">
                    A l'attention de {{ ProformaShow.client?.nom }}:
                  </p>
                  <div class="mt-2">
                    <p class="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                      Cette proforma est valable pour
                      {{ Parametres.jour_validite_document }} jours à compter de
                      la date d'emission
                    </p>
                  </div>
                </div>

                <p class="mt-5 text-sm text-gray-500 dark:text-neutral-500 text-center border-t-[1px] pt-4">
                  <!-- SARL au capital 1 000 000Fcfa - RCCM : CI – ABJ-2016 – B - 4260
                  CC : 1608130K - Cocody Saint Jean GTBANK : 25101002356 -
                  www.softsys.ci Email : infos@softsys.ci - Tél. : +225 25 22 00
                  96 65 – Cel : 07 47 99 99 92 / 07 09 02 00 52 -->
                  <img :src="'https://apps.tmsdesk.com/parametres/' +
                    Parametres.pied_de_page
                    " class="w-full h-full" alt="" />
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
import { onMounted, ref, reactive } from 'vue';
import { API_URL } from "@/routes/api.route";
import { useRoute } from "vue-router";
import { PROFORMA } from "@/types/CRM/proforma.type";
import { SETTING } from "@/types/setting.type";
import { numberToWords } from "@/services/convertir";
import { useApiServices } from "@/services/api.services";
import SpinnerLoading from "@/components/loaders/spinner.loading.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import Button from "@/components/ui/button/Button.vue";

const ProformaShow = ref(<PROFORMA>{});
const FactureMore = ref(<any>{});
const Parametres = ref(<SETTING>{});
const loading = ref(false);
const route = useRoute();

const setState = reactive({
  loading_validate: false,
  loading_rejete: false,
})

const GetFacture = async () => {
  loading.value = true;
  // readData(API_URL.SETTING_LIST).then((data) => {
  //   Parametres.value = data.datas
  // })
  const { data } = await axios.get(
    route.query.facture ? API_URL.FACTURE_DETAIL + "/" + route.query.id : API_URL.PROFORMA_DETAILS + "/" + route.query.id
  );
  if (data) {
    loading.value = false;
    ProformaShow.value = data.data;
    Parametres.value = data.parametre
    FactureMore.value = data.facture
  }
};

const { createData } = useApiServices();
const ValidateProforma = () => {
  setState.loading_validate = true
  createData(API_URL.PROFORMA_VALIDATE, { proforma_id: route.query.id }).then(
    (data) => {
      ProformaShow.value.etat = data.data?.etat;
      setState.loading_validate = false
    }
  );
};

const RejeterProforma = () => {
  setState.loading_rejete = true
  createData(API_URL.PROFORMA_REJETE, { proforma_id: route.query.id }).then(
    () => {
      setState.loading_validate = false
      ProformaShow.value.etat = "3";
    }
  );
};

onMounted(() => {
  GetFacture();
});


import html2pdf from 'html2pdf.js';

const printDivAsPDF = () => {
  const element = document.getElementById('printableDiv');
  if (element) {
    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: 'document.pdf',
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .save();
  }
}
</script>
<style lang="scss" scoped></style>
