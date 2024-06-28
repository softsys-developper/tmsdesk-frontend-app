<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-4">
        <ContentLayout
          :title="`Proforma | ${$route.query.id ? 'Modifier' : 'Création'}`"
        >
          <template v-slot:created> </template>
        </ContentLayout>

        <div class="w-11/12 m-auto flex gap-4 items-start pb-4">
          <div class="w-full bg-white rounded-md space-y-4">
            <div class="flex flex-col gap-4">
              <!-- Information sur la proforma -->
              <div class="flex justify-between items-center pb-8">
                <div class="">
                  <span class="text-lg uppercase font-bold">Proforma</span>
                </div>
              </div>

              <!-- Les informations base sur la proforma -->
              <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-1">
                  <Label> Réference client </Label>
                  <Input
                    placeholder="Reference client"
                    v-model="setInput.ref_client"
                    name="ref_client"
                  />
                </div>
              </div>

              <!-- Les informations base sur la proforma -->
              <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-1">
                  <Label> Choix de l'interlocuteur </Label>
                  <SelectedForm
                    :modelValue="setInput.interlocuteur"
                    @update:modelValue="((value:any) => setInput.interlocuteur = value )"
                    name="interlocuteur"
                    type="select"
                    :select="ListOfInterlocuteurs"
                  />
                </div>
              </div>
            </div>

            <!-- Informations sur le clients et l'entreprise -->
            <div class="">
              <div class="flex gap-4 w-full">
                <div class="flex flex-col w-full gap-1">
                  <Label> Clients </Label>
                  <SelectedForm
                    :modelValue="setInput.client"
                    @update:modelValue="((value:any) => setInput.client = value )"
                    name="client"
                    type="select"
                    :select="ListOfPartners"
                  />
                </div>
              </div>
            </div>

            <Separator class="my-4" />
            <!-- Add produit -->

            <div class="flex w-full flex-col lg:flex-row gap-4">
              <div
                class="bg-white rounded-md flex flex-col gap-2 w-full lg:w-5/12"
              >
                <div class="bg-gray-200 rounded-t-md p-3">
                  <span class="text-base font-bold">
                    Ajouter des produits ou services
                  </span>
                </div>

                <!-- Ajouter des produit et services -->

                <div class="gap-2 pb-2">
                  <div>
                    <div
                      class="flex flex-col w-full m-auto gap-2 bg-gray-50/50 hover:bg-gray-100/40 border-[1px] rounded-lg p-4"
                    >
                      <div class="flex justify-between">
                        <span class="text-sm font-black"
                          >Ajouter produit et services
                        </span>

                        <!-- <i
                        class="ri-close-large-fill cursor-pointer"
                  
                      ></i> -->
                      </div>

                      <div class="flex flex-col gap-2">
                        <div class="">
                          <Label>Réference</Label>
                          <Input
                            placeholder="RFE025632"
                            v-model="ServiceToAdd.reference"
                            name="reference"
                            id="reference"
                          />
                        </div>

                        <div class="">
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Creation de site web"
                            v-model="ServiceToAdd.description"
                            name="description"
                            id="reference"
                          />
                        </div>

                        <div class="">
                          <Label>Unités</Label>
                          <Input
                            placeholder="PCS"
                            v-model="ServiceToAdd.unite"
                            name="unite"
                            id="reference"
                          />
                        </div>

                        <div class="flex flex-col gap-1">
                          <Label>Quantité </Label>
                          <Input
                           type="number"
                            placeholder="Quantités"
                            v-model="ServiceToAdd.quantite"
                            name="qunatite"
                            id="reference"
                          />
                        </div>

                        <div class="flex flex-col gap-1">
                          <Label class=""> Prix Unitaire </Label>
                          <Input
                           type="number"
                            placeholder="Ex: 500.000 Fcfa"
                            v-model="ServiceToAdd.prix_unitaire"
                            name="prix_unitaire"
                            id="reference"
                          />
                        </div>

                        <div class="flex flex-col w-full gap-1">
                          <Label> Devises </Label>
                          <SelectedForm
                            :modelValue="ServiceToAdd.devise" 
                            @update:modelValue="((value:any) => ServiceToAdd.devise = value )"
                            name="devise"
                            type="select"
                            :select="ListOfDevises"
                          />
                        </div>

                        <div class="flex flex-col gap-1">
                          <Label class=""> Marge commercial </Label>
                          <Input
                          type="number"
                            placeholder="Ex: 2.6"
                            v-model="ServiceToAdd.marge_commerciale"
                            name="marge_commerciale"
                            id="marge_commerciale"
                          />
                        </div>

                        <div class="flex flex-col gap-1">
                          <Label class=""> Disponibilité </Label>
                          <Textarea
                            cclass="rounded-md text-sm p-2"
                            placeholder="- Ajout de module"
                            v-model="ServiceToAdd.disponibilite"
                            name="description"
                            id="reference"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex w-full m-auto">
                  <span class=""></span>
                  <Button
                    :disabled="
                      ServiceToAdd.prix_unitaire == 0 &&
                      ServiceToAdd.quantite == 0 && ServiceToAdd.reference == ''
                    
                        ? true
                        : false
                    "
                    @click="AddServices(ServiceToAdd)"
                    class="bg-gray-800 text-white px-3 text-sm font-bold py-2 rounded-md"
                  >
                    Ajouter
                  </Button>
                </div>
              </div>

              <!--  -->

              <Table class="bg-orange-50/50 w-full">
                <TableHeader class="bg-gray-800">
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead class="w-[100px]"> Quantités </TableHead>
                    <TableHead class="">Prix Unitaire</TableHead>
                    <TableHead class="">Prix Total</TableHead>
                    <TableHead class=""> Actions </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    v-for="(invoice, index) in ProductAndServices"
                    :key="index"
                  >
                    <TableCell>
                      <div class="">
                        <span class="flex flex-col gap-2">{{
                          invoice.reference
                        }}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div class="">
                        <span class="flex flex-col gap-2">{{
                          invoice.description
                        }}</span>
                        <span
                          v-html="invoice.remarques"
                          class="whitespace-pre-line"
                        ></span>
                      </div>
                    </TableCell>
                    <TableCell class="font-medium">
                      {{ invoice.quantite }}
                    </TableCell>

                    <TableCell class="font-medium">
                      {{ invoice.prix_unitaire }}
                    </TableCell>

                    <TableCell class="font-medium">
                      {{
                        Number(invoice?.prix_unitaire) *
                        Number(invoice?.quantite)
                      }}
                    </TableCell>

                    <TableCell class="text-right">
                      <i
                        class="ri-close-fill cursor-pointer"
                        @click="DeleteServices(invoice.id)"
                      ></i>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <!-- Flex -->
            <div class="mt-8 flex sm:justify-end">
              <div class="w-full text-base max-w-2xl sm:text-end space-y-2">
                <!-- Grid -->
                <div
                  class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2 divide-y-[1px]"
                >
                  <dl class="grid sm:grid-cols-5 gap-x-3">
                    <dt
                      class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                    >
                      TOTAL HT:
                    </dt>
                    <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                      {{ AmountHT }} {{ _AmountHT }}
                    </dd>
                  </dl>

                  <dl class="grid sm:grid-cols-5 gap-x-3 items-center">
                    <dt
                      class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                    >
                      <span class=""> TVA{{ isTVA ? "(18%)" : null }}:</span>
                    </dt>
                    <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                      <Button
                        :disabled="_AmountHT == 0 ? true : false"
                        class="px-2 text-white font-bold text-xs rounded-md"
                        :class="!isTVA ? 'bg-orange-500' : 'bg-red-500'"
                        @click="_isTVA"
                      >
                        {{ isTVA ? "Retirer" : "Appliquer" }}
                      </Button>
                    </dd>
                  </dl>

                  <dl class="grid sm:grid-cols-5 gap-x-3 items-center">
                    <dt
                      class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                    >
                      REMISE:
                    </dt>
                    <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                      <select
                        @input="_isRemise"
                        name=""
                        id=""
                        :disabled="_AmountHT == 0 ? true : false"
                        class="w-4/12 text-sm rounded-md py-2 border-[1px] px-2"
                      >
                        <option v-for="J in REMISE_LIST" :value="J">
                          {{ J }}%
                        </option>
                      </select>
                    </dd>
                  </dl>

                  <!-- <dl class="grid sm:grid-cols-5 gap-x-3 justify-between">
                    <dt
                      class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                    >
                      Marge Commerciale:
                    </dt>
                    <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                      <div class="flex justify-end">
                        <input
                          type="checkbox"
                          id="proforma_marge_commerciale"
                          @change="MargeCommercial($event)"
                          name="marge_commerciale"
                          class="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                        />
                      </div>
                    </dd>
                  </dl> -->

                  <dl class="grid sm:grid-cols-5 gap-x-3">
                    <dt
                      class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200"
                    >
                      TotalTTC:
                    </dt>
                    <dd
                      class="col-span-2 font-black text-blue-500 dark:text-neutral-500"
                    >
                      {{ AmountHT }} {{ _AmountTTC }}
                    </dd>
                  </dl>
                </div>
                <!-- End Grid -->
              </div>
            </div>
            <!-- End Flex -->

            <div class="pt-8 flex justify-between w-full">
              <span class=""></span>
              <button
                @click="sendProformaToBackend"
                class="bg-gray-800 px-4 py-2 font-bold text-white rounded-md"
                :disabled="loadingProforma"
              >
                <SpinnerLoader size="w-6 h-6" v-if="loadingProforma" />
                <span class="" v-else>
                  {{
                    !route.query.id
                      ? "Créer la proforma"
                      : "Modification Proforma"
                  }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </template>
  </BaseLayout>

  <!-- {{ ProductAndServices }} -->
</template>
<script lang="ts" setup>
import SpinnerLoader from "@/components/loaders/spinner.loading.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { useApiServices } from "@/services/api.services";
import { computed, onMounted, reactive, ref } from "vue";
import { API_URL } from "@/routes/api.route";
import { useDataStore } from "@/stores/data.store";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import { Separator } from "@/components/ui/separator";
import { useRoute, useRouter } from "vue-router";
import { PROFORMA } from "@/types/CRM/proforma.type";
import Button from "@/components/ui/button/Button.vue";
import { useProformaHook } from "@/hooks/CRM/proforma.hook";
import SelectedForm from "@/components/forms/selected.form.vue";
import Textarea from "@/components/ui/textarea/Textarea.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const { readData, showData } = useApiServices();
const state = reactive({
  loading: false,
});


interface PARTNERS {
  id: string;
  nom: string;
}

interface PRODUCTS {
  id: string;
  libelle: string;
}

interface TYPE_DEVISE {
  id: string;
  nom_devise: string;
  code_devise: string;
  taux_change: string;
}


const route = useRoute();
const REMISE_LIST = [
  0,
  1,
  2,
  3,
  4,
  5,
  ,
  5,
  6,
  7,
  8,
  9,
  8,
  9,
  10,
  15,
  20,
  25,
  30,
  35,
  40,
  45,
  50,
  55,
  60,
  65,
  70,
];



const ListOfPartners = ref<PARTNERS[]>([]);
const ListOfProduct = ref<PRODUCTS[]>([]);
const ListOfInterlocuteurs = ref<any[]>([]);
const ProductAndServices = ref<any[]>([]);


const ListOfDevises = ref<TYPE_DEVISE[]>([]);
const FindAllDevises = () => {
  state.loading = true;
  readData(API_URL.DEVISE_LIST)
    .then((data: any) => {
      ListOfDevises.value = data.datas;
      state.loading = false;
    })
    .catch(() => {
      state.loading = false;
    });
};

const ServiceToAdd = ref({
  id: 0,
  reference: "",
  description: "",
  unite: "",
  quantite: 0,
  prix_unitaire: 0,
  disponibilite: "",
  devise: "",
  marge_commerciale: 0
});



const _AmountHT = ref(0);
const _AmountTTC = ref(0);
const _AmountTVA = ref(0);
const isRemise = ref(0);
const isTVA = ref(false);
const loadingProforma = ref(false);
const router = useRouter();



const setInput = reactive(<any>{
  client: "",
  ref_client: "",
  interlocuteur: "",
});


// Add Produit & services
const AddServices = (service: any) => {
  ProductAndServices.value.push({
    id: ProductAndServices.value.length + 1,
    reference: service.reference,
    description: service.description,
    devise: service.devise,
    unite: service.unite,
    quantite: service.quantite,
    prix_unitaire: service.prix_unitaire,
    disponibilite: service.disponibilite,
    marge_commerciale: service.marge_commerciale
  });

  service.quantite = 0;
  service.prix_unitaire = 0;
  service.service = "";
  service.description = "";
  service.disponibilite = "";
  service.unite = "";
  service.devise = '';
  service.marge_commerciale = 0
};

const DeleteServices = (id: number) => {
  ProductAndServices.value = ProductAndServices.value.filter(
    (el) => el.id !== id
  );
};



/*------------------------------------------ */
// Function oiur calculer la remise
const _isRemise = (e: Event) => {
  const input = e.target as HTMLInputElement;
  isRemise.value = Number(input.value);
};

// Funtion pour calculer la tva
const _isTVA = () => {
  isTVA.value ? (isTVA.value = false) : (isTVA.value = true);
  if (isTVA.value) {
    _AmountTVA.value = (_AmountHT.value * 18) / 100;
  } else {
    _AmountTVA.value = 0;
  }
};

const AmountHT = computed(() => {
  _AmountHT.value = 0;
  if (ProductAndServices.value) {
    ProductAndServices.value.forEach((HT) => {
      const Price = HT.prix_unitaire;

      if (Price != undefined) {
        _AmountHT.value = _AmountHT.value + Number(Price) * Number(HT.quantite);
        _AmountTTC.value = Number(_AmountHT.value.toFixed(2));
      }
    });

    if (isRemise.value || _AmountTVA.value) {
      console.log(_AmountTVA.value);
      _AmountTTC.value =
        _AmountHT.value * (1 - isRemise.value / 100) + _AmountTVA.value;
      _AmountTTC.value = Number(_AmountTTC.value.toFixed(2));
    }
  }
});
/*------------------------------------------ */



const { formatProformaData } = useProformaHook();
const sendProformaToBackend = async () => {
  try {
    loadingProforma.value = true;

    const proformaData = {
      client: setInput.client,
      interlocuteur: setInput.interlocuteur,
      ref_client: setInput.ref_client,
      produitsServices: JSON.stringify(ProductAndServices.value),
      tva: _AmountTVA.value == 0 ? 0 : 18,
      remise_pourcentage: isRemise.value,
      marge_commerciale: setInput.marge_commerciale,
    };

    const { data } = await axios.post(
      !route.query.id
        ? `${API_URL.PROFORMA_CREATE}`
        : `${API_URL.PROFORMA_UPDATE}/${route.query.id}`,
      proformaData
    );

    if (data) {
      const responseData = data;
      loadingProforma.value = false;
      toast({
        title: "Proforma",
        description: responseData.message,
      });

      const Keys = Object.keys(setInput);
      Keys.forEach((el: any) => {
        setInput[el] = "";
      });

      if (!route.query.id) {
        useDataStore().Proformas.unshift(...formatProformaData([data.data]));
        router.push({ name: "PROFORMA_LIST" });
      } else {
        const isProforma: any = useDataStore().Proformas.map((el: any) => {
          console.log(el.id == route.query.id);
          if (el.id == route.query.id) {
            el = formatProformaData([data.data]);
          }
          return {
            ...el,
          };
        });

        useDataStore().Proformas = isProforma;
        router.push({ name: "PROFORMA_LIST" });
      }
    }
  } catch (error: any) {
    loadingProforma.value = false;
    if (!error?.errors) {
      const isErr = Object.keys(error.response.data.errors);

      toast({
        title: isErr[0],
        variant: "destructive",
        description: error.response.data.errors[isErr[0]][0],
      });
    } else {
      toast({
        title: error.errors[0].path[0],
        variant: "destructive",
        description: error.errors[0].message,
      });
    }
  }
};


// Detail Produit
const FindAllProforma = () => {
  if (route.query.id) {
    showData(API_URL.PROFORMA_DETAILS, "/" + route.query.id).then((data) => {
      const ShowProforma: PROFORMA = data.data;
      setInput.titre = ShowProforma.titre;
      setInput.date_validite = ShowProforma.date_validite;
      ProductAndServices.value.push(
        ...ShowProforma.produit_services.map((service) => ({
          id: ProductAndServices.value.length + 1,
          quantite: service.pivot.quantite,
          prix_unitaire: service.pivot.prix_unitaire,
          montant: service.pivot.prix_unitaire,
          description: service.description,
          disponibilite: service.disponibilite,
          unite: service.unite,
          type: service.type,
          reference: service.reference,
          marge_commerciale: service.marge_commerciale
        }))
      );
    });
  }
};


// Get 
const FindAllService = () => {
  state.loading = true;
  readData(API_URL.PRODUCT_LIST)
    .then((data: any) => {
      ListOfProduct.value = data.datas;
      state.loading = false;
    })
    .catch(() => {
      state.loading = false;
    });
};

const FindAllInterlocuteur = () => {
  state.loading = true;
  readData(API_URL.INTERLOCUTEUR_LIST)
    .then((data: any) => {
      ListOfInterlocuteurs.value = data.datas;
      state.loading = false;
    })
    .catch(() => {
      state.loading = false;
    });
};

const FindAllClient = () => {
  state.loading = true;
  readData(API_URL.CLIENT_PROSPECT_LIST)
    .then((data: any) => {
      useDataStore().Partners = data.datas;
      ListOfPartners.value = data.datas;
      state.loading = false;
    })
    .catch(() => {
      state.loading = false;
    });
};

onMounted(() => {
  FindAllClient();
  FindAllService();
  FindAllDevises();
  FindAllProforma();
  FindAllInterlocuteur();
});
</script>
<style lang="scss" scoped></style>
