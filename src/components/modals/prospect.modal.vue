<template>
   <ModalLayout :Func="onSubmit">
      <template v-slot:form>
         <form class="w-full space-y-2" @submit="onSubmit">
            <!-- Nom du prospect ou raison sociale -->
            <FormField v-slot="{ componentField }" name="nom">
               <FormItem>
                  <FormLabel>Nom du prospect ou raison sociale</FormLabel>
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

            <!-- Nom de l'interlocuteur -->
            <FormField v-slot="{ componentField }" name="nom_interlocuteur">
               <FormItem>
                  <FormLabel>Nom de l'interlocuteur</FormLabel>
                  <FormControl>
                     <Input
                        id="nom_interlocuteur"
                        type="text"
                        placeholder="Nom de l'interlocuteur"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Proposition -->
            <FormField v-slot="{ componentField }" name="proposition">
               <FormItem>
                  <FormLabel>Proposition</FormLabel>
                  <FormControl>
                     <Select id="proposition" v-bind="componentField">
                        <SelectTrigger aria-label="Proposition">
                           <SelectValue placeholder="Choisir..." />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Options</SelectLabel>
                              <SelectItem value="produit">Produit</SelectItem>
                              <SelectItem value="service">Service</SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Étape -->
            <FormField v-slot="{ componentField }" name="etape">
               <FormItem>
                  <FormLabel>Étape</FormLabel>
                  <FormControl>
                     <Select id="etape" v-bind="componentField">
                        <SelectTrigger aria-label="Étape">
                           <SelectValue placeholder="Choisir..." />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Options</SelectLabel>
                              <SelectItem value="prise_contact"
                                 >Prise de contact</SelectItem
                              >
                              <SelectItem value="demande_rdv"
                                 >Demande de RDV</SelectItem
                              >
                              <SelectItem value="attente_retour"
                                 >Attente de retour</SelectItem
                              >
                              <SelectItem value="attente_bon_commande"
                                 >Attente de bon de commande</SelectItem
                              >
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Observation -->
            <FormField v-slot="{ componentField }" name="observation">
               <FormItem>
                  <FormLabel>Observation</FormLabel>
                  <FormControl>
                     <Input
                        id="observation"
                        type="text"
                        placeholder="Ajoutez une observation"
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
import { useProspectHook } from '@/hooks/CRM/prospects.hook';

const formSchema = toTypedSchema(
   z.object({
      nom: z
         .string()
         .min(1, "Le champ 'nom du prospect ou raison sociale' est requis."),
      email: z.string().email("L'adresse email n'est pas valide."),
      telephone: z
         .string()
         .min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres.'),
      adresse: z.string().optional(),
      nom_interlocuteur: z.string().optional(),
      proposition: z.enum(['produit', 'service']),
      etape: z.enum([
         'prise_contact',
         'demande_rdv',
         'attente_retour',
         'attente_bon_commande',
      ]),
      observation: z.string().optional(),
   })
);

const { handleSubmit } = useForm({
   validationSchema: formSchema,
});

const { CreateProspect } = useProspectHook();

const onSubmit = handleSubmit((values) => {
   CreateProspect(values);
});
</script>
<style lang="scss" scoped></style>
