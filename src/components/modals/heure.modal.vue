<template>
  <ModalLayout :Func="onSubmit" :loading="setHeure.loadingCreate">
    <template v-slot:form>
      <form class="w-full space-y-2" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="libelle">
          <FormItem>
            <FormLabel>Libelle de heure</FormLabel>
            <FormControl>
              <Input
                id="nom"
                placeholder="GTBank Côte d'ivoire"
                type="text"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

         <FormField v-slot="{ componentField }" name="montant">
          <FormItem>
            <FormLabel>Montant de heure</FormLabel>
            <FormControl>
              <Input
                id="nom"
                placeholder="GTBank Côte d'ivoire"
                type="text"
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
// import { onMounted, ref } from "vue";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useHeureHook } from "@/hooks/RH/heure.hook";

const formSchema = toTypedSchema(
  z.object({
    libelle: z.string().min(1, "Le libelle de l'heure est requis."),
    montant: z.string().min(1, "Le montant de l'heure est requise."),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const { CreateHeure, setHeure } = useHeureHook();
const onSubmit = handleSubmit((values) => {
  CreateHeure(values);
});

</script>
<style lang="scss" scoped></style>
