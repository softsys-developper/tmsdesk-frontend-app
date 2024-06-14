<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-4">
        <ContentLayout title="Proforma | Creation ">
          <template v-slot:created> </template>
        </ContentLayout>

        <div class="w-11/12 m-auto flex gap-4 items-start pb-24">
          <div class="w-full bg-white rounded-md space-y-4">
            <div class="">
              <!-- Information sur la proforma -->
              <div class="flex justify-between items-center pb-8">
                <div class="">
                  <span class="text-lg font-bold">Proforma</span>
                </div>

                <!-- <div class="">
                 <Input placeholder="N. Proforma" name="" />
              </div> -->
              </div>

              <!-- Les informations base sur la proforma -->
              <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-1">
                  <Label>Objet de la proforma </Label>
                  <Input
                    placeholder="N. Proforma"
                    v-model="setInput.titre"
                    name=""
                  />
                </div>
              </div>
            </div>

            <!-- Informations sur le clients et l'entreprise -->
            <div class="">
              <div class="flex gap-4 w-full">
                <div class="flex flex-col w-full gap-1">
                  <Label> Clients </Label>
                  <Select v-model="Client" class="flex flex-col">
                    <SelectTrigger>
                      <SelectValue placeholder="Listes des clients " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel
                          >Listes des clients & prospects</SelectLabel
                        >

                        <SelectItem
                          v-for="pat in ListOfPartners"
                          :value="pat.id"
                        >
                          {{ pat.nom }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div class="flex flex-col w-full gap-1">
                  <Label> Devises </Label>
                  <Select class="flex flex-col" v-model="isDevise">
                    <SelectTrigger>
                      <SelectValue placeholder="Chossisez la devise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel
                          >Listes des clients & prospects</SelectLabel
                        >

                        <SelectItem
                          v-for="devise in ListOfDevises"
                          :value="JSON.stringify(devise)"
                        >
                          {{ devise.nom_devise }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator class="my-4" />
            <!-- Add produit -->

            <div class="flex w-full gap-4">
              <div class="bg-white rounded-md flex flex-col gap-2 w-5/12">
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
                        <Label>Objet de la proforma </Label>
                        <Select v-model="ServiceToAdd.service">
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Listes des produits & services "
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel
                                >Listes des produits & services</SelectLabel
                              >
                              <SelectItem
                                v-for="Prod in ListOfProduct"
                                :value="JSON.stringify(Prod)"
                              >
                                {{ Prod.libelle }}
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <div class="flex flex-col gap-1">
                          <Label>Objet de la proforma </Label>
                          <Input
                            placeholder="Quantités"
                            v-model="ServiceToAdd.quantite"
                            name=""
                          />
                        </div>

                        <div class="flex flex-col gap-1">
                          <Label class=""> Prix du service </Label>
                          <Input
                            placeholder="Ex: 500.000 Fcfa"
                            v-model="ServiceToAdd.price"
                            name=""
                          />
                        </div>

                        <div class="flex flex-col gap-1">
                          <Label class=""> Prix du service </Label>
                          <textarea
                            class="rounded-md text-sm"
                            placeholder="Ex: 500.000 Fcfa"
                            v-model="ServiceToAdd.description"
                            name="description"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex w-full m-auto">
                  <span class=""></span>
                  <button
                    :disabled="
                      ServiceToAdd.service == '' && ServiceToAdd.quantite == 0
                    "
                    @click="AddServices(ServiceToAdd)"
                    class="bg-gray-800 text-white px-3 text-sm font-bold py-2 rounded-md"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              <!--  -->
              <Table class="bg-orange-50/50 w-full">
                <TableHeader class="bg-gray-800">
                  <TableRow>
                    <TableHead>Désignations</TableHead>
                    <TableHead class="w-[100px]"> Quantités </TableHead>
                    <TableHead class="">Prix Unitaire</TableHead>
                    <TableHead class="">Prix Total</TableHead>
                    <TableHead class=""> Actions </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    v-for="(invoice, index) in ProductAndServices.filter(
                      (el) => ParseJson(el.service)?.libelle
                    )"
                    :key="index"
                  >
                    <TableCell>
                      <div class="">
                        <span class="flex flex-col gap-2">{{
                          ParseJson(invoice.service).libelle
                        }}</span>
                        <span v-html="invoice.description" class="whitespace-pre-line" ></span>
                      </div>
                    </TableCell>
                    <TableCell class="font-medium">
                      {{ invoice.quantite }}
                    </TableCell>

                    <TableCell class="font-medium">
                      {{
                        invoice.price
                          ? invoice.price
                          : ParseJson(invoice.service)?.prix_unitaire
                      }}
                    </TableCell>

                    <TableCell class="font-medium">
                      {{
                        (invoice.price
                          ? invoice.price
                          : ParseJson(invoice.service)?.prix_unitaire) * invoice?.quantite
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

            <Table class="border-y-[1px]">
              <TableHeader class="">
                <TableRow>
                  <TableHead class="w-[100px]"> </TableHead>
                  <TableHead class="text-right"> TOTAL HT </TableHead>
                  <TableHead class="text-right w-[200px]">
                    {{ AmountHT }} {{ _AmountHT }}
                    {{
                      ParseJson(isDevise)?.code_devise
                        ? ParseJson(isDevise)?.code_devise
                        : null
                    }}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell class="font-medium"> </TableCell>
                  <TableCell class="text-right">
                    REMISE
                    <!-- {{ isRemise != 0 ? isRemise : 0 }}% -->
                  </TableCell>
                  <TableCell class="text-right flex justify-end gap-1">
                    
                    <select
                    @input="_isRemise"
                      name=""
                      id=""
                      :disabled="_AmountHT == 0 ? true : false"
                      class="w-6/12 text-2 text-xs rounded-md"
                    >
                      <option v-for="J in REMISE_LIST " :value="J"> {{J}}% </option>
                    </select>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell class="font-medium"> </TableCell>

                  <TableCell class="text-right flex justify-end">
                    <div class="flex items-center gap-1">
                      <span class=""> TVA{{ isTVA ? "(18%)" : null }}</span>
                      <span class="">
                        <Button
                          :disabled="_AmountHT == 0 ? true : false"
                          class="px-2 py-[2px] text-white font-bold text-xs rounded-md"
                          :class="!isTVA ? 'bg-orange-500' : 'bg-red-500'"
                          @click="_isTVA"
                        >
                          {{ isTVA ? "Retirer" : "Appliquer" }}
                        </Button>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell class="text-right w-[100px]">
                    {{ _AmountTVA }}
                    {{
                      ParseJson(isDevise)?.code_devise
                        ? ParseJson(isDevise)?.code_devise
                        : null
                    }}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell class="font-medium"> </TableCell>

                  <TableCell class="text-right font-black">
                    TOTAL TTC
                  </TableCell>
                  <TableCell class="text-right font-black">
                    {{ _AmountTTC }}
                    {{
                      ParseJson(isDevise)?.code_devise
                        ? ParseJson(isDevise)?.code_devise
                        : null
                    }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div class="p-8 flex justify-between w-full">
              <span class=""></span>
              <button
                @click="sendProformaToBackend"
                class="bg-gray-800 px-4 py-2 font-bold text-white rounded-md"
                :disabled="loadingProforma"
              >
                <SpinnerLoader size="w-6 h-6" v-if="loadingProforma" />
                <span class="" v-else>Crée la proforma</span>
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import { Separator } from "@/components/ui/separator";
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

const { readData } = useApiServices();
const state = reactive({
  loading: false,
});

const ParseJson = (value: any) => {
  return value ? JSON.parse(value) : value;
};

interface PARTNERS {
  id: string;
  nom: string;
}

interface PRODUCTS {
  id: string;
  libelle: string;
}

const ListOfPartners = ref<PARTNERS[]>([]);
const ListOfProduct = ref<PRODUCTS[]>([]);


const REMISE_LIST = [1, 2, 3, 4, 5, ,5, 6, 7, 8, 9,8, 9, 10, 10, 11, 12, 13, 14, 15, 15, 16, 17, 18, 19, 20]

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

interface TYPE_DEVISE {
  id: string;
  nom_devise: string;
  code_devise: string;
  taux_change: string;
}

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

// interface P_S {
//    quantite: any;
//    service: string |{
//       libelle: any,
//       prix_unitaire: any
//    };
//    price: any;
// }

const ServiceToAdd = ref({
  id: 0,
  quantite: 1,
  service: "",
  price: 0,
  description: "",
});

const ProductAndServices = ref<any[]>([]);

const _AmountHT = ref(0);
const _AmountTTC = ref(0);
const _AmountTVA = ref(0);
const isRemise = ref(0);
const isTVA = ref(false);
const isDevise = ref<any>();
const Client = ref<any>();

// Function oiur calculer la remise
const _isRemise = (e: Event) => {
  const input = e.target as HTMLInputElement;
  isRemise.value = (Number(input.value) / _AmountHT.value) * 100;
  isRemise.value = Number(isRemise.value.toFixed(2));
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
      const Price = HT.price ? HT.price : ParseJson(HT.service).prix_unitaire;

      if (Price != undefined) {
        _AmountHT.value = _AmountHT.value + Number(Price) * Number(HT.quantite);
        _AmountTTC.value = Number(_AmountHT.value.toFixed(2));
      }
    });

    if (isRemise.value || _AmountTVA.value) {
      _AmountTTC.value =
        _AmountHT.value -
        (_AmountHT.value * isRemise.value) / 100 +
        _AmountTVA.value;

      _AmountTTC.value = Number(_AmountTTC.value.toFixed(2));
    }
  }
});

const setInput = reactive({
  titre: "",
  date_validite: Date.now(),
  date_emission: new Date().toISOString().substring(0, 10),
  entreprise: "Mon Entreprise",
  fichier: [],
  montant_bon_de_comande: "",
  description: "",
});

const AddServices = (service: any) => {
  ProductAndServices.value.push({
    id: ProductAndServices.value.length + 1,
    quantite: service.quantite,
    service: service.service,
    price: service.price,
    description: service.description,
  });

  service.quantite = "";
  service.service = "";
  service.price = "";
  service.description = "";
};

const DeleteServices = (id: number) => {
  ProductAndServices.value = ProductAndServices.value.filter(
    (el) => el.id !== id
  );
};

import { z } from "zod";

const proformaSchema = z.object({
  client: z.number().min(1, "Le champ client est requis."),
  titre: z.string().min(1, "Le champ titre est requis."),
  produitsServices: z.array(
    z.object({
      ID_ProduitService: z.number(),
    })
  ),
  quantites: z.array(z.string().min(1, "Le champ quantité est requis.")),
  // date_validite: z.string().min(1, "La date de validité est requise."),
  devise_client: z.number().min(1, "La devise du client est requise."),
});

// Create new Proforma
const loadingProforma = ref(false);
const sendProformaToBackend = async () => {
  try {
    loadingProforma.value = true;
    const PS = ProductAndServices.value.filter(
      (el) => ParseJson(el.service)?.libelle
    );

    const proformaData = {
      client: Client.value,
      titre: setInput.titre,
      date_validite: setInput.date_validite,
      produitsServices: PS.map((ps) => ({
        ID_ProduitService: ParseJson(ps.service).id,
      })),
      quantites: PS.map((ps) => ps.quantite),
      tva: _AmountTVA.value == 0 ? 0 : 18,
      remise_pourcentage: isRemise.value,
      devise_client: ParseJson(isDevise.value)?.id,
    };

    const dataProforma = new FormData();

    Object.entries(proformaData).forEach(([key, value]) => {
      if (Array.isArray(value) || typeof value === "object") {
        dataProforma.append(key, JSON.stringify(value));
      } else {
        dataProforma.append(key, value);
      }
    });
    if (setInput.fichier && Array.isArray(setInput.fichier)) {
      for (let i = 0; i < setInput.fichier.length; i++) {
        const el = setInput.fichier[i];
        dataProforma.append("fichier", el);
      }
    }

    proformaSchema.parse(proformaData);

    const { data } = await axios.post(
      `${API_URL.PROFORMA_CREATE}`,
      dataProforma
    );

    if (data) {
      const responseData = await data.data;
      loadingProforma.value = false;
      toast({
        title: "Proforma",
        description: "Proforma envoyée avec succès",
      });
      console.log("Proforma envoyée avec succès:", responseData);
    }
  } catch (error: any) {
    loadingProforma.value = false;
    if (!error?.errors) {
      const isErr = Object.keys(error.response.data.errors);
      console.log(error.response.data.errors, isErr);
      toast({
        title: isErr[0],
        description: error.response.data.errors[isErr[0]][0],
      });
    } else {
      toast({
        title: error.errors[0].path[0],
        description: error.errors[0].message,
      });
    }
  }
};

onMounted(() => {
  FindAllClient();
  FindAllService();
  FindAllDevises();
});
</script>
<style lang="scss" scoped></style>
