<template>
   <ModalLayout :Func="onSubmit" :loading="setProduct.loadingCreate">
      <template v-slot:form>
         <form class="w-full space-y-2" @submit="onSubmit">
            <!-- Libellé du produit ou service -->
            <FormField v-slot="{ componentField }" name="libelle">
               <FormItem>
                  <FormLabel>Libellé</FormLabel>
                  <FormControl>
                     <Input
                        id="libelle"
                        type="text"
                        placeholder="Entrez le libellé du produit ou service"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Type du produit ou service -->
            <FormField v-slot="{ componentField }" name="type">
               <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                     <Select v-bind="componentField" id="type">
                        <SelectTrigger aria-label="Sélectionnez le type">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel
                                 >Type de produit ou service</SelectLabel
                              >
                              <SelectItem value="service">Service</SelectItem>
                              <SelectItem value="produit">Produit</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Prix unitaire du produit ou service -->
            <FormField v-slot="{ componentField }" name="prix_unitaire">
               <FormItem>
                  <FormLabel>Prix Unitaire</FormLabel>
                  <FormControl>
                     <Input
                        id="prix_unitaire"
                        type="number"
                        placeholder="Entrez le prix unitaire"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Description du produit ou service -->
            <FormField v-slot="{ componentField }" name="description">
               <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                     <Input
                        id="description"
                        type="text"
                        placeholder="Entrez une description"
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
import ModalLayout from '@/layouts/modal.layout.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
// import { onMounted, ref } from 'vue';
import { useProductHook } from '@/hooks/LOGISTIQUES/product.hook';

const formSchema = toTypedSchema(
   z.object({
      libelle: z.string().min(1, 'Le libellé est requis.'),
      type: z.enum(['service', 'produit']),
      prix_unitaire: z.number().min(0, 'Le prix unitaire doit être positif.'),
      description: z.string().min(1, 'La description est requise.'),
   })
);

const { handleSubmit } = useForm({
   validationSchema: formSchema,
});

const { setProduct, CreateProduct } = useProductHook();

const onSubmit = handleSubmit((values) => {
   CreateProduct(values);
});


</script>
<style lang="scss" scoped></style>
