<template>
   <ModalLayout :Func="onSubmit" :loading="setCompte.loadingCreate">
      <template v-slot:form>
         <form class="w-full space-y-2" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="nom">
               <FormItem>
                  <FormLabel>Libelle du compte</FormLabel>
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
import ModalLayout from '@/layouts/modal.layout.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { onMounted, ref } from 'vue';
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import axios from 'axios';
import { API_URL } from '@/routes/api.route';
import { useCompteHook } from '@/hooks/comptabilites/compte.hook';

const formSchema = toTypedSchema(
   z.object({
      nom: z.string().min(1, 'Le nom du compte banque est requise.'),
   })
);

const { handleSubmit } = useForm({
   validationSchema: formSchema,
});

const { CreateCompte, setCompte } = useCompteHook();
const onSubmit = handleSubmit((values) => {
   CreateCompte(values);
});

interface CAISSE {
   libelle: string;
   id: any;
}

const Caisses = ref<CAISSE>({ libelle: '', id: '' });
onMounted(() => {
   axios
      .get(API_URL.CAISSE_LIST)
      .then(({ data }) => (Caisses.value = data.data));
});
</script>
<style lang="scss" scoped></style>
