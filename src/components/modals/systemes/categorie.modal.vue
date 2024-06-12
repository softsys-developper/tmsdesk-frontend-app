<template>
  <ModalLayout :Func="onSubmit" :loading="setCategorie.loadingCreate">
    <template v-slot:form>
      <form class="w-full space-y-2" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="libelle">
          <FormItem>
            <FormLabel>Libelle de categorie</FormLabel>
            <FormControl>
              <Input
                id="libelle"
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
// import { onMounted, ref } from "vue"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCategorieHook } from "@/hooks/SYSTEME/categorie.hook";
import { useUpdateStore } from "@/stores/update.store";

const formSchema = toTypedSchema(
  z.object({
    libelle: z.string().min(1, "Le libelle de l'categorie est requis."),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const { CreateCategorie, CategorieUpdate, setCategorie } = useCategorieHook();
const onSubmit = handleSubmit((values) => {
  if(useUpdateStore().isUpdate.is){
    CategorieUpdate(useUpdateStore().isUpdate.id, values);
  }else{
    CreateCategorie(values);
  }
  
});
</script>
<style lang="scss" scoped></style>
