<template>
   <ModalLayout :Func="onSubmit">
      <template v-slot:form>
         <form class="w-full space-y-2" @submit="onSubmit">
            <!-- Name -->
            <FormField v-slot="{ componentField }" name="name">
               <FormItem>
                  <FormLabel>Identifiant</FormLabel>
                  <FormControl>
                     <Input
                        id="name"
                        type="text"
                        placeholder="shadcn"
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
      name: z.string().min(1, "Le champ 'nom' est requis."),
   })
);

const { handleSubmit } = useForm({
   validationSchema: formSchema,
});

const { createData } = useApiServices();
const onSubmit = handleSubmit((values) => {
   createData(API_URL.SALAIRE_CREATE, values).then((data: any) => {
          if (data) {
             const DataKey = Object.keys(values);
             DataKey.forEach((el) => {
                const query: any = document.querySelector('#' + el);
                if (query) query.value = '';
             }); 

             useModalStore().open = false
             useDataStore().Salary = data.datas.map((salaire:any) => ({
            libelle_salaire: salaire.libelle_salaire,
            montant: salaire.montant
         }));

 
             const Add:any = useDataStore().Salary
             Add.unshift(data.data)
             useDataStore().Clients = Add
 
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
                description: err.response.data.errors[isErr[0]][0],
             });
          }
       });
});
</script>
<style lang="scss" scoped></style>
