<template>
    <BaseLayout>
        <template v-slot:content>
            <section class="flex flex-col w-full gap-4 bg-white rounded-lg mb-4">
                <ContentLayout :title="`Logistique | ${$route.query.id ? 'Modification Livraion' : 'Création Livraion'}`">
                    <template v-slot:created> </template>
                </ContentLayout>

                <div class="w-11/12 m-auto flex gap-4 items-start pb-8 flex-col">
                    <div class="w-full grid grid-cols-2 gap-2">
                        <div class="" v-for="fr in LivraisonForms">
                            <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type"
                                :placeholder="fr.placeholder" :select="fr.select" />
                        </div>
                    </div>

                    <div class="w-full bg-white rounded-md space-y-4">
                        <div class="flex w-full flex-col lg:flex-row gap-4">
                            <div class="bg-white rounded-md flex flex-col gap-2 w-full">
                                <div class="bg-gray-200 rounded-t-md p-3">
                                    <span class="text-base font-bold">
                                        Ajouter des produits ou services
                                    </span>
                                </div>

                                <!-- Ajouter des produit et services -->

                                <div class="gap-2 pb-2">
                                    <div class="w-full">
                                        <div class="flex flex-col w-full gap-3 ">
                                            <select name="" id="" @input="IsServiceLivraison"
                                                class="p-2 border-[1px] rounded-md">
                                                <option v-for="Livraison in ListOfLivraison" :value="Livraison.id">{{
                                                    Livraison.numero_proforma }}</option>
                                            </select>


                                            <Select class="flex flex-col" v-model="service.reference">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chossisez le product" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel></SelectLabel>
                                                        <SelectItem v-for="Product in ListOfLivraisonServices"
                                                            :value="Product.reference">
                                                            {{ Product.reference }} 
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                            <div class="flex flex-col">
                                                <label for="" class="text-sm flex gap-1" >Quantité</label>
                                                <input type="text" v-model="service.quantite" placeholder="Ex : 500"
                                                class="border-[1px] w-full rounded-md py-2 px-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex w-full m-auto">
                                    <span class=""></span>
                                    <Button :disabled="service.quantite == '' || 0 ? true : false"
                                        @click="AddServices(service)"
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
                                        <TableHead>Quantités</TableHead>
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

                                        <TableCell class="font-medium">
                                            {{ invoice.quantite }}
                                        </TableCell>

                                        <TableCell class="text-right">
                                            <i class="ri-close-fill cursor-pointer"
                                                @click="DeleteServices(invoice.id)"></i>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>


     





                        <div class=" flex justify-between w-full">
                            <span class=""></span>
                            <button @click="sendLivraisonToBackend"
                                class="bg-gray-800 px-4 py-2 font-bold text-white rounded-md"
                                :disabled="loadingLivraison">
                                <SpinnerLoader size="w-6 h-6" v-if="loadingLivraison" />
                                <span class="" v-else>
                                    {{
                                        !route.query.id
                                            ? "Créer une livraison"
                                            : "Modification une livraison"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import SpinnerLoader from "@/components/loaders/spinner.loading.vue";
import BaseLayout from "./../../layouts/base.layout.vue";
import ContentLayout from "@/layouts/content.layout.vue";
import { useApiServices } from "@/services/api.services";
import { onMounted, reactive, ref } from "vue";
import { API_URL } from "@/routes/api.route";
import { useDataStore } from "@/stores/data.store";
import { useRoute, useRouter } from "vue-router";
import Button from "@/components/ui/button/Button.vue";
import { useLivraisonHook } from "@/hooks/LOGISTIQUE/livraison.hook";
import InForm from "@/components/forms/in.form.vue";
import { LivraisonForms } from "@/forms/LOGISTIQUE/livraison.forms";
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
const ListOfLivraison = ref();
const ListOfProducts = ref<any[]>([]);
const ListOfLivraisonServices = ref<any[]>([]);
const ProductAndServices = ref<any[]>([]);
const service = reactive({
    id: "",
    quantite: "",
    reference: "",
    produit_service_id: "",
    quantite_livree: ""
});
const loadingLivraison = ref(false);
const router = useRouter();

const route = useRoute();





const FindAllService = () => {
    state.loading = true;

    //
    readData(API_URL.PRODUCT_LIST)
        .then((data: any) => {
            ListOfProducts.value = data.datas;
            state.loading = false;
        })
        .catch(() => {
            state.loading = false;
        });

    //
    readData(API_URL.PROFORMA_LIST)
        .then((data: any) => {
            ListOfLivraison.value = data.datas;
            state.loading = false;
        })
        .catch(() => {
            state.loading = false;
        });
};

const AddServices = (service: any) => {
    console.log(service);
    ProductAndServices.value.push({
        reference: service.reference,
        id: ListOfLivraisonServices.value.find((el: any) => el.reference == service.reference)?.id,
        produit_service_id: ListOfLivraisonServices.value.find((el: any) => el.reference == service.reference)?.id,
        quantite: service.quantite,
        quantite_livree: service.quantite,
    });
};

const DeleteServices = (id: number) => {
    ProductAndServices.value = ProductAndServices.value.filter(
        (el) => el.id !== id
    );
};




const LivraisonId = ref()
const IsServiceLivraison = (e: any) => {
    console.log(e.target.value)
    LivraisonId.value = e.target.value
    showData(API_URL.PRODUCT_PROFORMA_LIST, e.target.value)
        .then((data: any) => {
            ListOfLivraisonServices.value = data.datas;
            state.loading = false;
            
        })
        .catch(() => {
            state.loading = false;
        });
}


// Create new Livraison
const { formatLivraisonData } = useLivraisonHook();
const sendLivraisonToBackend = async () => {
    try {
        loadingLivraison.value = true;

        const Query = (value: any):any => {
            const uj:any = document.querySelector(`#${value}`)
            return uj?.value
        }

        const livraisonData = {
            proformaId: LivraisonId.value,
            produits_livres: JSON.stringify(ProductAndServices.value),
            site_livraison: Query(`site_livraison`),
            date_depart: Query(`date_depart`),
            date_retour: Query(`date_retour`),
            moyen_livraison: Query(`date_retour`),
            agent_livraison: Query(`date_retour`),
            chauffeur: Query('chaffeur')
        };

        const { data } = await axios.post(
            !route.query.id
                ? `${API_URL.LIVRAISON_CREATE}`
                : `${API_URL.PROFORMA_UPDATE}/${route.query.id}`,
            livraisonData
        );

        if (data) {
            const responseData = data;
            loadingLivraison.value = false;
            toast({
                title: "Livraisons",
                description: responseData.message,
            });

            if (!route.query.id) {
                const Delivery :any = data.data
                useDataStore().Livraisons.unshift(...formatLivraisonData([Delivery]));
                router.push({ name: "LOGISC_LIVRAISONS" });
            } else {
                const isLivraison: any = useDataStore().Livraisons.map((el: any) => {
                    if (el.id == route.query.id) {
                        el = formatLivraisonData([data.data]);
                    }
                    return {
                        ...el,
                    };
                });

                useDataStore().Livraisons = isLivraison;
                router.push({ name: "LOGISC_LIVRAISONS" });
            }
        }
    } catch (error: any) {
        loadingLivraison.value = false;
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

onMounted(() => {
    FindAllService();
});
</script>
<style lang="scss" scoped></style>
