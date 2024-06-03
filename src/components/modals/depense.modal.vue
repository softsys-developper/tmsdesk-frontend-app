<template>
   <ModalLayout :Func="onSubmit" :loading="setDepense.loadingCreate" >
      <template v-slot:form>
         <form class="w-full space-y-2" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="montant">
               <FormItem>
                  <FormLabel>Montant</FormLabel>
                  <FormControl>
                     <Input
                        id="montant"
                        placeholder="Entrez le montant"
                        type="number"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="designation">
               <FormItem>
                  <FormLabel>Désignation</FormLabel>
                  <FormControl>
                     <Input
                        id="designation"
                        placeholder="Description de la dépense"
                        type="text"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="recepteur">
               <FormItem>
                  <FormLabel>Récepteur</FormLabel>
                  <FormControl>
                     <Input
                        id="recepteur"
                        placeholder="Nom du récepteur"
                        type="text"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="date_transaction">
               <FormItem>
                  <FormLabel>Date de la transaction</FormLabel>
                  <FormControl>
                     <Input
                        id="date_transaction"
                        type="date"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="type_transaction">
               <FormItem>
                  <FormLabel>Type de transaction</FormLabel>
                  <FormControl>
                     <Select v-bind="componentField">
                        <SelectTrigger>
                           <SelectValue placeholder="Choisir le type" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectItem value="entree"> Entrée </SelectItem>
                              <SelectItem value="sortie"> Sortie </SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="caisse_id">
               <FormItem>
                  <FormLabel>Caisse</FormLabel>
                  <FormControl>
                     <Select v-bind="componentField">
                        <SelectTrigger>
                           <SelectValue placeholder="Sélectionner une caisse" />
                        </SelectTrigger>
                        <SelectContent>
                           <!-- Les options de caisse seront générées dynamiquement -->
                           <SelectItem :value="Caisses.id">
                              {{ Caisses.libelle }}
                           </SelectItem>
                        </SelectContent>
                     </Select>
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
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
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
import {useDepenseHook} from "@/hooks/comptabilites/depense.hook"
import { useDataStore } from '@/stores/data.store';

const formSchema = toTypedSchema(
   z.object({
      montant: z.number().min(0.01, 'Le montant doit être supérieur à 0.'),
      designation: z.string().min(1, 'La désignation est requise.'),
      recepteur: z.string().min(1, 'La désignation est requise.'),
      date_transaction: z
         .string()
         .min(1, 'La date de transaction est requise.'),
      type_transaction: z.enum(['entree', 'sortie'], {
         message: "Le type de transaction doit être 'entree' ou 'sortie'.",
      }),
      caisse_id: z.number().min(1, "L'identifiant de la caisse est requis."),
   })
);

const { handleSubmit } = useForm({
   validationSchema: formSchema,
});

const { CreateDepense, setDepense } = useDepenseHook()
const onSubmit = handleSubmit((values) => {
    CreateDepense(values)
});

interface CAISSE {
   libelle: string;
   id: any;
}

const Caisses = ref<CAISSE>({ libelle: '', id: '' });
   
onMounted(() => {
   axios
      .get(API_URL.CAISSE_LIST)
      .then(({ data }) => {
         Caisses.value = data.data
         useDataStore().Caisses = data.data
      });
});
</script>
<style lang="scss" scoped></style>
