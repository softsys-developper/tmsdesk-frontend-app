<template>
  <BaseLayout>
    <template v-slot:content>
      <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-4">
        <ContentLayout
          :title="`Fournisseur | ${$route.query.id ? 'Modifier' : 'Création'}`"
        >
          <template v-slot:created> </template>
        </ContentLayout>

        <div class="w-11/12 m-auto flex gap-4 items-start pb-4">
          <div class="w-full bg-white rounded-md space-y-4">
            <div class="flex flex-col gap-4">
              <!-- Information sur la proforma -->
              <div class="flex justify-between items-center pb-8">
                <div class="">
                  <span class="text-lg uppercase font-bold">Fournisseur</span>
                </div>
              </div>


              

              <!-- Les informations base sur la proforma -->
              <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-1">
                  <Label> Numero Proforma </Label>
                  <Input
                    placeholder="Numero Proforma"
                    v-model="setInput.numero_proforma_fournisseur"
                    name="numero_proforma_fournisseur"
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

              <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-1">
                  <Label> Fournisseur </Label>
                  <SelectedForm
                    :modelValue="setInput.fournisseur"
                    @update:modelValue="((value:any) => setInput.fournisseur = value )"
                    name="fournisseur"
                    type="select"
                    :select="ListOfFournisseur"
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

          

            <div class="pt-8 flex justify-between w-full">
              <span class=""></span>
              <button
                @click="sendFournisseurToBackend"
                class="bg-gray-800 px-4 py-2 font-bold text-white rounded-md"
                :disabled="loadingFournisseur"
              >
                <SpinnerLoader size="w-6 h-6" v-if="loadingFournisseur" />
                <span class="" v-else>
                  {{
                    !route.query.id
                      ? "Créer le Fournisseur"
                      : "Modification Fournisseur"
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
import {  onMounted, reactive, ref } from "vue";
import { API_URL } from "@/routes/api.route";
import { useDataStore } from "@/stores/data.store";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import { Separator } from "@/components/ui/separator";
import { useRoute, useRouter } from "vue-router";
import { PROFORMA } from "@/types/CRM/proforma.type";
import Button from "@/components/ui/button/Button.vue";
import { useBCFournisseurHook } from "@/hooks/LOGISTIQUE/bc_fournisseur.hook";
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




const ListOfPartners = ref<PARTNERS[]>([]);
const ListOfProduct = ref<PRODUCTS[]>([]);
const ListOfInterlocuteurs = ref<any[]>([]);
const ProductAndServices = ref<any[]>([]);
const ListOfFournisseur = ref<any[]>([]);


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
});



const loadingFournisseur = ref(false);
const router = useRouter();



const setInput = reactive(<any>{
  numero_proforma_fournisseur: "",
  fournisseur: "",
  interlocuteur: "",
});


// Add Produit & services
const AddServices = (service: any) => {
  ProductAndServices.value.push({
    id: ProductAndServices.value.length + 1,
    reference: service.reference,
    description: service.description,
    unite: service.unite,
    quantite: service.quantite,
    prix_unitaire: service.prix_unitaire,
  });

  service.quantite = 0;
  service.prix_unitaire = 0;
  service.service = "";
  service.description = "";
  service.unite = "";
};

const DeleteServices = (id: number) => {
  ProductAndServices.value = ProductAndServices.value.filter(
    (el) => el.id !== id
  );
};






const { formatBCFournisseurData } = useBCFournisseurHook();
const sendFournisseurToBackend = async () => {
  try {
    loadingFournisseur.value = true;

    const proformaData:any = {
      fournisseur: setInput.fournisseur,
      interlocuteur: setInput.interlocuteur,
      numero_proforma_fournisseur: setInput.numero_proforma_fournisseur,
      produitsServices: JSON.stringify(ProductAndServices.value)
    };

    const KEYS = Object.keys(proformaData)
    const proformaDatas = new FormData()
    for (let i = 0; i < KEYS.length; i++) {
      const el = KEYS[i];
      proformaDatas.append(`${[el]}`, `${proformaData[el]}`)
    }

    const { data } = await axios.post(
      !route.query.id
        ? `${API_URL.BC_FOURNISSEUR_CREATE}`
        : `${API_URL.BC_FOURNISSEUR_UPDATE}/${route.query.id}`,
        proformaDatas
    );

    if (data) {
      const responseData = data;
      loadingFournisseur.value = false;
      toast({
        title: "Fournisseur",
        description: responseData.message,
      });

      const Keys = Object.keys(setInput);
      Keys.forEach((el: any) => {
        setInput[el] = "";
      });

      if (!route.query.id) {
        const o: [] = formatBCFournisseurData([data.data])
        useDataStore().Fournisseurs.unshift(...o);
        router.push({ name: "LOGISC_LIVRAISONS" });
      } else {
        const isFournisseur: any = useDataStore().Fournisseurs.map((el: any) => {
          console.log(el.id == route.query.id);
          if (el.id == route.query.id) {
            el = formatBCFournisseurData([data.data]);
          }
          return {
            ...el,
          };
        });

        useDataStore().Fournisseurs = isFournisseur;
        router.push({ name: "LOGISC_LIVRAISONS" });
      }
    }
  } catch (error: any) {
    loadingFournisseur.value = false;
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
const FindAllFournisseur = () => {
  if (route.query.id) {
    showData(API_URL.BC_FOURNISSEUR_DETAILS, "/" + route.query.id).then((data) => {
      const ShowFournisseur: PROFORMA = data.data;
      setInput.titre = ShowFournisseur.titre;
      setInput.date_validite = ShowFournisseur.date_validite;
      ProductAndServices.value.push(
        ...ShowFournisseur.produit_services.map((service) => ({
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

const FindFournissuer = () => {
  state.loading = true;
  readData(API_URL.FOURNISSEURS_LIST)
    .then((data: any) => {
      ListOfFournisseur.value = data.datas;
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
  FindAllFournisseur();
  FindAllInterlocuteur();
  FindFournissuer()
});
</script>
<style lang="scss" scoped></style>
