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
import ModalLayout from "@/layouts/modal.layout.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useClientHook } from "@/hooks/CRM/client.hook";

const formSchema = toTypedSchema(
  z.object({
    nom: z
      .string()
      .min(1, "Le champ 'nom du prospect ou raison sociale' est requis."),
    type: z.string().default("prospect"),
    email: z.string().email("L'adresse email n'est pas valide."),
    telephone: z
      .string()
      .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres."),
    adresse: z.string().optional(),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const { CreateClient } = useClientHook();

const onSubmit = handleSubmit((values) => {
  CreateClient(values);
});
</script>
<style lang="scss" scoped></style>
