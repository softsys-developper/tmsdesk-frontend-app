<template>
   <ModalLayout :Func="onSubmit">
      <template v-slot:form>
         <form class="w-full space-y-2" @submit="onSubmit">
            <FormField v-slot="{ componentField }" name="user">
               <FormItem>
                  <FormLabel>Employés</FormLabel>
                  <FormControl>
                     <Select v-bind="componentField">
                        <SelectTrigger>
                           <SelectValue placeholder="Liste des employés" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Liste des employés</SelectLabel>
                              <SelectItem
                                 v-for="personal in Personals"
                                 :key="personal?.id"
                                 :value="personal?.id"
                              >
                                 {{ personal.name }}
                              </SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="libelle">
               <FormItem>
                  <FormLabel>Libelle</FormLabel>
                  <FormControl>
                     <Input
                        id="libelle"
                        placeholder="Description"
                        type="text"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="type">
               <FormItem>
                  <FormLabel>Demande de :</FormLabel>
                  <FormControl>
                     <Select v-bind="componentField" v-model="isTypes">
                        <SelectTrigger>
                           <SelectValue placeholder="Congés & Permissions" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Types de congé</SelectLabel>
                              <SelectItem value="conge"> Congé </SelectItem>
                              <SelectItem value="permission">
                                 Permission
                              </SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <FormField
               v-if="isTypes == 'permission'"
               v-slot="{ componentField }"
               name="motif"
            >
               <FormItem>
                  <FormLabel>Motif</FormLabel>
                  <FormControl>
                     <textarea
                        class="w-full p-2 text-base border-[1px] rounded-md"
                        id="libelle"
                        type="text"
                        placeholder="Entrez le libellé du congé"
                        v-bind="componentField"
                     ></textarea>
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <div class="flex gap-2 w-full">
               <FormField v-slot="{ componentField }" name="date_depart">
                  <FormItem class="w-full">
                     <FormLabel>Date de départ</FormLabel>
                     <FormControl class="w-full">
                        <Input
                           id="date_depart"
                           type="date"
                           v-bind="componentField"
                        />
                     </FormControl>
                     <FormMessage class="text-xs" />
                  </FormItem>
               </FormField>

               <FormField v-slot="{ componentField }" name="date_retour">
                  <FormItem class="w-full">
                     <FormLabel>Date de retour</FormLabel>
                     <FormControl class="w-full">
                        <Input
                           placeholder=""
                           id="date_retour"
                           type="date"
                           v-bind="componentField"
                        />
                     </FormControl>
                     <FormMessage class="text-xs" />
                  </FormItem>
               </FormField>
            </div>
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
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useToast } from '@/components/ui/toast/use-toast';
import { useDataStore } from '@/stores/data.store';
import { onMounted, reactive, ref } from 'vue';
import {
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form';
import { useModalStore } from '@/stores/modal.store';
const { toast } = useToast();

interface PERSONAL {
   id: string;
   name: string;
}

const isTypes = ref('');

const formSchema = toTypedSchema(
   z.object({
      user: z.number().min(1, "Le champ 'employé' est requis."),
      libelle: z.string().min(1, "Le champ 'libellé' est requis."),
      type: z.enum(['conge', 'permission']),
      motif: z.string().optional(),
      date_depart: z.string().min(1, 'La date de départ est requise.'),
      date_retour: z.string().min(1, 'La date de retour est requise.'),
   })
);

const { handleSubmit } = useForm({
   validationSchema: formSchema,
});

const { createData } = useApiServices();

const onSubmit = handleSubmit((values) => {
   createData(API_URL.CONGE_CREATE, values)
      .then((data: any) => {
         if (data) {
            const DataKey = Object.keys(values);
            DataKey.forEach((el) => {
               const query: any = document.querySelector('#' + el);
               if (query) query.value = '';
            });

            const Add: any = useDataStore().Conges;
            const Personals = ref<{name: string}[]>([])
            Personals.value = useDataStore().Personals

            // 
            const toAdd = [data.data].map((el: any) => ({
               libelle: el.libelle,
               employe: Personals.value.find((els:any) => els.id == el.user_id)?.name,
               type: el.type,
               motif: el.motif,
               date_depart: el.date_depart,
               date_retour: el.date_retour,
            }));
            Add.unshift(toAdd[0]);
            useDataStore().Conges = Add;
            useModalStore().open = false
            toast({
               title: 'Enrégistre',
               description: 'Congé ajouter avec succès',
            });
         }
      })
      .catch((err) => {
         if (err) {
            console.log(err);
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

const Personals = ref(<PERSONAL[]>[]);
const { readData } = useApiServices();
const state = reactive({
   loading: false,
});

const FindAllPersonal = () => {
   state.loading = true;
   readData(API_URL.USER_LIST)
      .then((data: any) => {
         useDataStore().Personals = data.datas;
         Personals.value = useDataStore().Personals;
         state.loading = false;
      })
      .catch(() => {
         state.loading = false;
      });
};

onMounted(() => {
   FindAllPersonal();
});
</script>
<style lang="scss" scoped></style>
