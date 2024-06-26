<template>
    <BaseLayout>
      <template v-slot:content>
        <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-4">
          <ContentLayout :title="`Proforma | ${$route.query.id ? 'Modifier' : 'Création'}`">
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
                    <Input placeholder="N. Proforma" v-model="setInput.titre" name="" />
                  </div>
                </div>
              </div>
  
              <!-- Informations sur le clients et l'entreprise -->
              <div class="">
                <div class="flex gap-4 w-full">
                  <div class="flex flex-col w-full gap-1">
                    <!-- <SelectedForm :label="'Clients'" :select="ListOfPartners" n  /> -->
                    <Label> Clients </Label>
                    <Select v-model="Client" class="flex flex-col">
                      <SelectTrigger>
                        <SelectValue placeholder="Listes des clients " />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Listes des clients & prospects</SelectLabel>
  
                          <SelectItem v-for="pat in ListOfPartners" :value="pat.id">
                            {{ pat.nom }}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
  
                  <div class="flex-col w-full gap-1 hidden">
                    <Label> Devises </Label>
                    <Select class="flex flex-col" v-model="isDevise">
                      <SelectTrigger>
                        <SelectValue placeholder="Chossisez la devise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Listes des clients & prospects</SelectLabel>
  
                          <SelectItem v-for="devise in ListOfDevises" :value="JSON.stringify(devise)">
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
  
              <div class="flex w-full flex-col lg:flex-row gap-4">
                <div class="bg-white rounded-md flex flex-col gap-2 w-full lg:w-5/12">
                  <div class="bg-gray-200 rounded-t-md p-3">
                    <span class="text-base font-bold">
                      Ajouter des produits ou services
                    </span>
                  </div>
  
                  <!-- Ajouter des produit et services -->
  
                  <div class="gap-2 pb-2">
                    <div>
                      <div
                        class="flex flex-col w-full m-auto gap-2 bg-gray-50/50 hover:bg-gray-100/40 border-[1px] rounded-lg p-4">
                        <div class="flex justify-between">
                          <span class="text-sm font-black">Ajouter produit et services
                          </span>
  
                          <!-- <i
                          class="ri-close-large-fill cursor-pointer"
                    
                        ></i> -->
                        </div>
  
                        <div class="flex flex-col gap-2">
                          <div class="">
                            <Label>Réference</Label>
                            <Input placeholder="RFE025632" v-model="ServiceToAdd.reference" name="" />
                          </div>
  
                          <div class="">
                            <Label>Description</Label>
                            <Input placeholder="Creation de site web" v-model="ServiceToAdd.description" name="" />
                          </div>
  
                          <div class="">
                            <Label>Unités</Label>
                            <Input placeholder="Kg" v-model="ServiceToAdd.unite" name="" />
                          </div>
  
                          <div class="">
                            <Label>Type</Label>
                            <Input placeholder="Type" v-model="ServiceToAdd.type" name="" />
                          </div>
  
                          <div class="flex flex-col gap-1">
                            <Label>Quantité </Label>
                            <Input placeholder="Quantités" v-model="ServiceToAdd.quantite" name="" />
                          </div>
  
                          <div class="flex flex-col gap-1">
                            <Label class=""> Prix Unitaire </Label>
                            <Input placeholder="Ex: 500.000 Fcfa" v-model="ServiceToAdd.prix_unitaire" name="" />
                          </div>
  
                          <div class="flex flex-col gap-1">
                            <Label class=""> Remarques </Label>
                            <textarea cclass="rounded-md text-sm p-2" placeholder="- Ajout de module"
                              v-model="ServiceToAdd.remarques" name="description" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div class="flex w-full m-auto">
                    <span class=""></span>
                    <Button :disabled="ServiceToAdd.prix_unitaire == 0 ||
                      ('' && ServiceToAdd.quantite == 0) ||
                      ''
                      ? true
                      : false
                      " @click="AddServices(ServiceToAdd)"
                      class="bg-gray-800 text-white px-3 text-sm font-bold py-2 rounded-md">
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
                    <TableRow v-for="(invoice, index) in ProductAndServices" :key="index">
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
                          <span v-html="invoice.remarques" class="whitespace-pre-line"></span>
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
                        <i class="ri-close-fill cursor-pointer" @click="DeleteServices(invoice.id)"></i>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
  
              <Table class="border-y-[1px] hidden">
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
                      <select @input="_isRemise" name="" id="" :disabled="_AmountHT == 0 ? true : false"
                        class="w-6/12 text-2 text-xs rounded-md">
                        <option v-for="J in REMISE_LIST" :value="J">
                          {{ J }}%
                        </option>
                      </select>
                    </TableCell>
                  </TableRow>
  
                  <TableRow>
                    <TableCell class="font-medium"> </TableCell>
  
                    <TableCell class="text-right flex justify-end">
                      <div class="flex items-center gap-1">
                        <span class=""> TVA{{ isTVA ? "(18%)" : null }}</span>
                        <span class="">
                          <Button :disabled="_AmountHT == 0 ? true : false"
                            class="px-2 py-[2px] text-white font-bold text-xs rounded-md"
                            :class="!isTVA ? 'bg-orange-500' : 'bg-red-500'" @click="_isTVA">
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
  
                  <!-- New -->
                  <TableRow>
                    <TableCell class="font-medium"> </TableCell>
                    <TableCell class="text-right">
                      <label for="proforma_marge_commerciale">Marge commercial</label>
                    </TableCell>
                    <TableCell class="text-right flex justify-end gap-1">
                      <input type="checkbox" id="proforma_marge_commerciale" @change="MargeCommercial($event)"
                        name="marge_commerciale"
                        class="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary" />
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
  
              <!-- Flex -->
              <div class="mt-8 flex sm:justify-end">
                <div class="w-full text-base max-w-2xl sm:text-end space-y-2">
                  <!-- Grid -->
                  <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                    <dl class="grid sm:grid-cols-5 gap-x-3">
                      <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        TOTAL HT:
                      </dt>
                      <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                        {{ AmountHT }} {{ _AmountHT }}
                      </dd>
                    </dl>
  
                    <dl class="grid sm:grid-cols-5 gap-x-3 items-center">
                      <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        <span class=""> TVA{{ isTVA ? "(18%)" : null }}:</span>
                      </dt>
                      <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                        <Button :disabled="_AmountHT == 0 ? true : false"
                          class="px-2 text-white font-bold text-xs rounded-md"
                          :class="!isTVA ? 'bg-orange-500' : 'bg-red-500'" @click="_isTVA">
                          {{ isTVA ? "Retirer" : "Appliquer" }}
                        </Button>
                      </dd>
                    </dl>
  
                    <dl class="grid sm:grid-cols-5 gap-x-3 items-center">
                      <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        REMISE:
                      </dt>
                      <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                        <select @input="_isRemise" name="" id="" :disabled="_AmountHT == 0 ? true : false"
                          class="w-4/12 text-sm rounded-md py-2 border-[1px] px-2">
                          <option v-for="J in REMISE_LIST" :value="J">
                            {{ J }}%
                          </option>
                        </select>
                      </dd>
                    </dl>
  
                    <dl class="grid sm:grid-cols-5 gap-x-3  justify-between">
                      <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        Marge Commerciale:
                      </dt>
                      <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                        <div class="flex justify-end">
                          <input type="checkbox" id="proforma_marge_commerciale" @change="MargeCommercial($event)"
                            name="marge_commerciale"
                            class="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary" />
                        </div>
                      </dd>
                    </dl>
  
                    <dl class="grid sm:grid-cols-5 gap-x-3">
                      <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                        TotalTTC:
                      </dt>
                      <dd class="col-span-2 font-black text-blue-500 dark:text-neutral-500">
                        {{ AmountHT }} {{ _AmountHT }}
                      </dd>
                    </dl>
                  </div>
                  <!-- End Grid -->
                </div>
              </div>
              <!-- End Flex -->
  
              <div class="p-8 flex justify-between w-full">
                <span class=""></span>
                <button @click="sendProformaToBackend" class="bg-gray-800 px-4 py-2 font-bold text-white rounded-md"
                  :disabled="loadingProforma">
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
  
  const { readData, showData } = useApiServices();
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
  
  const MargeCommercial = (e: Event) => {
    const checkbox = e.target as HTMLInputElement;
    setInput.marge_commerciale = checkbox.checked ? true : false;
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
    reference: "",
    description: "",
    type: "",
    unite: "",
    quantite: 1,
    prix_unitaire: 0,
    remarques: "",
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
        _AmountTTC.value =
          _AmountHT.value * (1 - isRemise.value / 100) + _AmountTVA.value;
        _AmountTTC.value = Number(_AmountTTC.value.toFixed(2));
      }
    }
  });
  
  const setInput = reactive(<any>{
    titre: "",
    marge_commerciale: false,
  });
  
  const FindAllProforma = () => {
    if (route.query.id) {
      showData(API_URL.PROFORMA_DETAILS, "/" + route.query.id).then((data) => {
        const ShowProforma: PROFORMA = data.data;
        setInput.titre = ShowProforma.titre;
        setInput.date_validite = ShowProforma.date_validite;
        Client.value = ShowProforma.user_id;
        ProductAndServices.value.push(
          ...ShowProforma.produit_services.map((service) => ({
            id: ProductAndServices.value.length + 1,
            quantite: service.pivot.quantite,
            prix_unitaire: service.pivot.prix_unitaire,
            montant: service.pivot.prix_unitaire,
            description: service.description,
            remarques: service.remarques,
            unite: service.unite,
            type: service.type,
            reference: service.reference
          }))
        );
      });
    }
  };
  
  const AddServices = (service: any) => {
    ProductAndServices.value.push({
      id: ProductAndServices.value.length + 1,
      reference: service.reference,
      description: service.description,
      unite: service.unite,
      type: service.type,
      quantite: service.quantite,
      prix_unitaire: service.prix_unitaire,
      remarques: service.remarques,
    });
  
    service.quantite = "";
    service.service = "";
    service.prix_unitaire = "";
    service.description = "";
    service.remarques = "";
    service.type = "";
    service.unite = "";
  };
  
  const DeleteServices = (id: number) => {
    ProductAndServices.value = ProductAndServices.value.filter(
      (el) => el.id !== id
    );
  };
  
  import { z } from "zod";
  import { useRoute, useRouter } from "vue-router";
  import { PROFORMA } from "@/types/CRM/proforma.type";
  import Button from "@/components/ui/button/Button.vue";
  import { useProformaHook } from "@/hooks/CRM/proforma.hook";
  
  const proformaSchema = z.object({
    client: z.number().min(1, "Le champ client est requis."),
    titre: z.string().min(1, "Le champ titre est requis."),
    produitsServices: z.string().min(10, { message: 'Ajoutez un ou plusieurs services' }),
  });
  
  // Create new Proforma
  const loadingProforma = ref(false);
  const router = useRouter();
  
  const { formatProformaData } = useProformaHook()
  
  const sendProformaToBackend = async () => {
    try {
      loadingProforma.value = true;
  
      const proformaData = {
        client: Client.value,
        titre: setInput.titre,
        produitsServices: JSON.stringify(ProductAndServices.value),
        tva: _AmountTVA.value == 0 ? 0 : 18,
        remise_pourcentage: isRemise.value,
        devise_client: ParseJson(isDevise.value)?.id,
        marge_commerciale: setInput.marge_commerciale,
      };
  
      proformaSchema.parse(proformaData);
      const { data } = await axios.post( !route.query.id ?
        `${API_URL.PROFORMA_CREATE}` : `${API_URL.PROFORMA_UPDATE}/${route.query.id}`,
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
          useDataStore().Proformas.unshift(...formatProformaData([data.data]))
          router.push({ name: "PROFORMA_LIST" });
  
        } else {
          const isProforma: any = useDataStore().Proformas.map((el: any) => {
            console.log(el.id == route.query.id)
            if (el.id == route.query.id) {
              el = formatProformaData([data.data]);
            }
            return {
              ...el
            }
          });
  
          useDataStore().Proformas = isProforma
          router.push({ name: "PROFORMA_LIST" });
        }
        
  
      }
    } catch (error: any) {
      loadingProforma.value = false;
      if (!error?.errors) {
        const isErr = Object.keys(error.response.data.errors);
  
        toast({
          title: isErr[0],
          variant: 'destructive',
          description: error.response.data.errors[isErr[0]][0],
        });
  
  
      } else {
        toast({
          title: error.errors[0].path[0],
          variant: 'destructive',
          description: error.errors[0].message,
        });
      }
    }
  };
  
  onMounted(() => {
    FindAllClient();
    FindAllService();
    FindAllDevises();
    FindAllProforma();
  });
  </script>
  <style lang="scss" scoped></style>
  