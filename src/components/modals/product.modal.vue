<template>
   <ModalLayout :Func="onSubmit">
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
import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
// import { onMounted, ref } from 'vue';
import { useToast } from '@/components/ui/toast/use-toast';
import { useDataStore } from '@/stores/data.store';
import { useModalStore } from '@/stores/modal.store';

const { toast } = useToast();

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

const { createData } = useApiServices();

const onSubmit = handleSubmit((values) => {
   createData(API_URL.PRODUCT_CREATE, values)
      .then((data) => {
         const DataKey = Object.keys(values);

         DataKey.forEach((el) => {
            const query: any = document.querySelector('#' + el);
            if (query) query.value = '';
         });
         useModalStore().open = false
         const Add: any = useDataStore().Products;
         Add.unshift(data.data);
         useDataStore().Products = Add;
      })
      .catch((err) => {
         if (err) {
            const isErr = Object.keys(err.response.data.errors);
            console.log(err.response.data.errors, isErr);
            toast({
               title: isErr[0],
               variant: 'destructive',
               description: err.response.data.errors[isErr[0]][0],
            });
         }
      });
});
</script>
<style lang="scss" scoped></style>
