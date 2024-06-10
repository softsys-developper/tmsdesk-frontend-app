<template>
  <ModalLayout :Func="onSubmit" :loading="setPrime.loadingCreate">
    <template v-slot:form>
      <form class="w-full space-y-2" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="libelle">
          <FormItem>
            <FormLabel>Libelle prime / indemnité </FormLabel>
            <FormControl>
              <Input
                id="prime"
                placeholder="	Prime De Transport"
                type="text"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="nature">
          <FormItem>
            <FormLabel>Nature prime / indemnité</FormLabel>
            <FormControl>
              <Input
                id="nature"
                placeholder="Exonération à Hauteur De 25000 FCFA "
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
import { usePrimeHook } from "@/hooks/RH/prime.hook";

const formSchema = toTypedSchema(
  z.object({
    libelle: z
      .string()
      .min(1, "Le libelle de la prime / indemnité est requis."),
    nature: z.string().min(1, "La nature de la prime / indemnité est requise."),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const { CreatePrime, setPrime } = usePrimeHook();
const onSubmit = handleSubmit((values) => {
  CreatePrime(values);
});
</script>
<style lang="scss" scoped></style>
