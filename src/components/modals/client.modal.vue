<template>
   <ModalLayout :Func="onSubmit">
      <template v-slot:form>
         <form class="w-full space-y-2" @submit="onSubmit">
            <!-- Nom du prospect ou raison sociale -->
            <FormField v-slot="{ componentField }" name="nom">
               <FormItem>
                  <FormLabel>Nom du client ou raison sociale</FormLabel>
                  <FormControl>
                     <Input
                        id="nom"
                        type="text"
                        placeholder="Entrez le nom ou la raison sociale"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Type -->

            <!-- Email -->
            <FormField v-slot="{ componentField }" name="email">
               <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                     <Input
                        id="email"
                        type="email"
                        placeholder="email@exemple.com"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Téléphone -->
            <FormField v-slot="{ componentField }" name="telephone">
               <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                     <Input
                        id="telephone"
                        type="tel"
                        placeholder="0123456789"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Adresse -->
            <FormField v-slot="{ componentField }" name="adresse">
               <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                     <Input
                        id="adresse"
                        type="text"
                        placeholder="Entrez l'adresse"
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

import { Input } from '@/components/ui/input';
import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { useDataStore } from '@/stores/data.store';
import { useModalStore } from '@/stores/modal.store';
const { toast } = useToast();

const formSchema = toTypedSchema(
   z.object({
      nom: z
         .string()
         .min(1, "Le champ 'nom du prospect ou raison sociale' est requis."),
      type: z.string().default('prospect'),
      email: z.string().email("L'adresse email n'est pas valide."),
      telephone: z
         .string()
         .min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres.'),
      adresse: z.string().optional(),
   })
);

const { handleSubmit } = useForm({
   validationSchema: formSchema,
});

const { createData } = useApiServices();

const onSubmit = handleSubmit((values) => {
   createData(API_URL.CLIENT_CREATE, values)
      .then((data: any) => {
         if (data) {
            const DataKey = Object.keys(values);
            DataKey.forEach((el) => {
               const query: any = document.querySelector('#' + el);
               if (query) query.value = '';
            });

            const Add:any = useDataStore().Clients
            Add.unshift(data.data)
            useDataStore().Clients = Add
            useModalStore().open = false
            toast({
               title: 'Enrégistre',
               description: 'Clients ajouter avec succès',
            });
         }
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
