<template>
  <ModalLayout :Func="onSubmit">
    <template v-slot:form>
      <form class="w-full space-y-2" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="fournisseur">
          <FormItem>
            <FormLabel>Fournisseur</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Fournisseur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Liste des fournisseurs </SelectLabel>
                    <SelectItem :value="fournisseur.id.toString()" v-for="fournisseur in ListFourniseurs" > {{fournisseur.nom}} </SelectItem>
                
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="produitsServices">
          <FormItem>
            <FormLabel>Produits et services</FormLabel>
            <FormControl>
              <Select v-bind="componentField">
                <SelectTrigger>
                  <SelectValue placeholder="Produits et services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Types de congé</SelectLabel>
                    <SelectItem v-for="SP in ListProduitServices" value="SP.id">
                      {{ SP.libelle }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <!-- Quantités -->
        <FormField v-slot="{ componentField }" name="quantites">
          <FormItem>
            <FormLabel>Quantités</FormLabel>
            <FormControl>
              <Input
                id="quantites"
                type="number"
                placeholder="Entrez les quantités"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <!-- Numéro de proforma fournisseur -->
        <FormField
          v-slot="{ componentField }"
          name="numero_proforma_fournisseur"
        >
          <FormItem>
            <FormLabel>Numéro de proforma fournisseur</FormLabel>
            <FormControl>
              <Input
                id="numero_proforma_fournisseur"
                type="text"
                placeholder="Entrez le numéro de proforma fournisseur"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </form>
    </template>
  </ModalLayout>
</template>
<script lang="ts" setup>
import ModalLayout from "@/layouts/modal.layout.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = toTypedSchema(
  z.object({
    fournisseur: z.string().min(1, { message: "Le fournisseur est requis" }),
    produitsServices: z
      .string()
      .min(1, { message: "Le produits et services est requis" }),
    quantites: z
      .number()
      .min(1, { message: "La quantité doit être supérieure à 0" }),
    numero_proforma_fournisseur: z
      .string()
      .min(1, { message: "Le numéro de proforma fournisseur est requis" }),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

//
import axios from "axios";
import { API_URL } from "@/routes/api.route";
import { onMounted, ref } from "vue";
import { type FOURNISSEUR } from "@/types/fournisseur.type";
import { type SERVICES } from "@/types/service.type";

const ListFourniseurs = ref(<SERVICES[]>[]);
const ListProduitServices = ref(<FOURNISSEUR[]>[]);

const getFournisseurs = async () => {
  try {
    const { data } = await axios.get(API_URL.FOURNISSEURS_LIST);
    if (data) ListFourniseurs.value = data.datas;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getProduitServices = async () => {
  try {
    const { data } = await axios.get(API_URL.PRODUCT_LIST);
    if (data) ListProduitServices.value = data.datas;
  } catch (error) {
    console.error(error);
    return [];
  }
};

onMounted(() => {
  getFournisseurs();
  getProduitServices();
});
</script>
<style lang="scss" scoped></style>
@/types/fournisseur.type
