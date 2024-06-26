<template>
    <BaseLayout>
      <template v-slot:content>
        <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-4">
          <ContentLayout :title="`BC Fournisseur | ${$route.query.id ? 'Modifier' : 'Création'}`">
            <template v-slot:created> </template>
          </ContentLayout>
  
          <div class="w-11/12 m-auto flex gap-4 items-start pb-24">
            <div class="w-full bg-white rounded-md space-y-4">
              <div class="">
                <!-- Information sur la fournisseur -->
                <div class="flex justify-between items-center pb-8">
                  <div class="">
                    <span class="text-lg font-bold">BON DE COMMANDE</span>
                  </div>
  
                  <!-- <div class="">
                   <Input placeholder="N. BC_Fournisseur" name="" />
                </div> -->
                </div>
  
                <!-- Les informations base sur la fournisseur -->
                <div class="flex flex-col gap-2">
                  <div class="flex flex-col gap-1">
                    <Label>Numéro de la proforma</Label>
                    <Input placeholder="N. Proforma" id="proforma_BDC" name="proforma_BDC" />
                  </div>
                </div>
              </div>
  
              <!-- Informations sur le clients et l'entreprise -->
              <div class="">
                <div class="flex gap-4 w-full">
                  <div class="flex flex-col w-full gap-1">
                    <!-- <SelectedForm :label="'Fournisseurs'" :select="ListOfPartners" n  /> -->
                    <Label> Fournisseur </Label>
                    <SelectedForm :select="ListOfPartners" name="fournisseur_BDC" />
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
                            <Input placeholder="PCS" v-model="ServiceToAdd.unite" name="" />
                          </div>
  
                          <div class="">
                            <Label>Type</Label>
                            <Input placeholder="Produits/Services/Autres" v-model="ServiceToAdd.type" name="" />
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
  
         
  
             
  
              <div class="pt-8 flex justify-between w-full">
                <span class=""></span>
                <button @click="sendBC_FournisseurToBackend" class="bg-gray-800 px-4 py-2 font-bold text-white rounded-md"
                  :disabled="loadingBC_Fournisseur">
                  <SpinnerLoader size="w-6 h-6" v-if="loadingBC_Fournisseur" />
                  <span class="" v-else>
                    {{
                      !route.query.id
                        ? "Créer le fournisseur"
                        : "Modification BC_Fournisseur"
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
  import { onMounted, reactive, ref } from "vue";
  import { API_URL } from "@/routes/api.route";
  import { useDataStore } from "@/stores/data.store";
  import { useRoute, useRouter } from "vue-router";
  import Button from "@/components/ui/button/Button.vue";
  import { useBCFournisseurHook } from "@/hooks/LOGISTIQUE/bc_fournisseur.hook";
import SelectedForm from "@/components/forms/selected.form.vue";
  
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
  
  const Dquery = (value: any) => {
    const Q:any = document.querySelector(`#${value}`);
    return Q.value
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
 
  
  const FindAllFournisseur = () => {
    state.loading = true;
    readData(API_URL.FOURNISSEURS_LIST)
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

  
  const FindAllBC_Fournisseur = () => {
    if (route.query.id) {
      showData(API_URL.BC_FOURNISSEUR_DETAILS, "/" + route.query.id).then((data) => {
        const ShowBC_Fournisseur: any = data.data;

        const proforma_BDC:any = document.querySelector(`#${'proforma_BDC'}`)
        proforma_BDC.value = ShowBC_Fournisseur.numero_proforma_fournisseur

        const fournisseur_BDC:any = document.querySelector(`#${'fournisseur_BDC'}`)
        console.log(fournisseur_BDC)
        // fournisseur_BDC.value = ShowBC_Fournisseur.fournisseur_id
        
        ProductAndServices.value.push(
          ...ShowBC_Fournisseur.produit_services.map((service:any) => ({
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
  

  
  // Create new BC_Fournisseur
  const loadingBC_Fournisseur = ref(false);
  const router = useRouter();
   
  
  const { formatBCFournisseurData } = useBCFournisseurHook()
  
  const sendBC_FournisseurToBackend = async () => {
    try {
      loadingBC_Fournisseur.value = true;
  
      const fournisseurData = {
        fournisseur: Dquery('fournisseur_BDC'),
        numero_proforma_fournisseur: Dquery(`proforma_BDC`),
        produitsServices: JSON.stringify(ProductAndServices.value),
      };

      const { data } = await axios.post( !route.query.id ?
        `${API_URL.BC_FOURNISSEUR_CREATE}` : `${API_URL.PROFORMA_UPDATE}/${route.query.id}`,
        fournisseurData
      );
  
      if (data) {
        const responseData = data;
        loadingBC_Fournisseur.value = false;
        toast({
          title: "BC_Fournisseur",
          description: responseData.message,
        });
  
        const Keys = ['fournisseur_BDC', 'proforma_BDC'];
        Keys.forEach((el: any) => {
          let K: any = document.querySelector(`#${el}`);
          K.value = "";
        });
  
  
        if (!route.query.id) {
          useDataStore().BCFournisseurs.unshift(...formatBCFournisseurData([data.data]))
          router.push({ name: "LOGISC_BC_PARTENAIRES" });
        } else {
          const isBC_Fournisseur: any = useDataStore().BCFournisseurs.map((el: any) => {
            if (el.id == route.query.id) {
              el = formatBCFournisseurData([data.data]);
            }
            return {
              ...el
            }
          });
  
          useDataStore().BCFournisseurs = isBC_Fournisseur
          router.push({ name: "LOGISC_BC_PARTENAIRES" });
        }
        
  
      }
    } catch (error: any) {
      loadingBC_Fournisseur.value = false;
      if (error?.errors) {
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
    FindAllFournisseur();
    FindAllService();
    FindAllBC_Fournisseur();
  });
  </script>
  <style lang="scss" scoped></style>
  