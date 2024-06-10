<template>
  <ModalLayout :Func="onSubmit" :loading="setService.loadingCreate">
    <template v-slot:form>
      <form class="w-full space-y-2" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="libelle">
          <FormItem>
            <FormLabel>Libelle de service</FormLabel>
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
//   import { onMounted, ref } from "vue";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useServiceHook } from "@/hooks/RH/service.hook";

const formSchema = toTypedSchema(
  z.object({
    libelle: z.string().min(1, "Le libelle de service est requis."),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const { CreateService, setService } = useServiceHook();
const onSubmit = handleSubmit((values) => {
  CreateService(values);
});
</script>
<style lang="scss" scoped></style>
