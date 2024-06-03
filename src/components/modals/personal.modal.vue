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

            <!-- Nom de l'employé -->
            <FormField v-slot="{ componentField }" name="nom">
               <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                     <Input
                        id="nom"
                        type="text"
                        placeholder="shadcn"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Pernom de l'employé -->
            <FormField v-slot="{ componentField }" name="prenoms">
               <FormItem>
                  <FormLabel>Prenoms</FormLabel>
                  <FormControl>
                     <Input
                        id="prenoms"
                        type="text"
                        placeholder="shadcn"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Email de l'employé -->
            <FormField v-slot="{ componentField }" name="email">
               <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                     <Input
                        id="email"
                        type="text"
                        placeholder="shadcn"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Telephone de l'employé -->
            <FormField v-slot="{ componentField }" name="telephone">
               <FormItem>
                  <FormLabel>Télephone</FormLabel>
                  <FormControl>
                     <Input
                        type="text"
                        id="telephone"
                        placeholder="shadcn"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Date de naissance de l'employé -->
            <FormField v-slot="{ componentField }" name="date_naissance">
               <FormItem>
                  <FormLabel>Date de naissance</FormLabel>
                  <FormControl>
                     <Input
                        id="date_naissance"
                        type="date"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Lieu de naissance de l'employé -->
            <FormField v-slot="{ componentField }" name="lieu_naissance">
               <FormItem>
                  <FormLabel>Lieu de naissance</FormLabel>
                  <FormControl>
                     <Input
                        id="lieu_naissance"
                        type="text"
                        placeholder="Entrez le lieu de naissance"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Fonction de l'employé -->
            <FormField v-slot="{ componentField }" name="fonction">
               <FormItem>
                  <FormLabel>Fonction</FormLabel>
                  <FormControl>
                     <Input
                        id="fonction"
                        type="text"
                        placeholder="Entrez la fonction"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Situation matrimoniale de l'employé -->
            <FormField
               v-slot="{ componentField }"
               name="situation_matrimoniale"
            >
               <FormItem>
                  <FormLabel>Situation matrimoniale</FormLabel>
                  <FormControl>
                     <Select
                        id="situation_matrimoniale"
                        v-bind="componentField"
                     >
                        <SelectTrigger class="w-full">
                           <SelectValue placeholder="Situation matrimoniale" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Situation matrimoniale</SelectLabel>
                              <SelectItem value="Célibataire">
                                 Célibataire
                              </SelectItem>
                              <SelectItem value="Marié(e)">
                                 Marié(e)
                              </SelectItem>
                              <SelectItem value="Veuf/Veuve">
                                 Veuf/Veuve
                              </SelectItem>
                              <SelectItem value="Divorcé(e)">
                                 Divorcé(e)
                              </SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Nom de la personne à contacter en cas d'urgence -->
            <FormField
               v-slot="{ componentField }"
               name="nom_personne_a_contacter"
            >
               <FormItem>
                  <FormLabel>Nom de la personne à contacter</FormLabel>
                  <FormControl>
                     <Input
                        id="nom_personne_a_contacter"
                        type="text"
                        placeholder="Entrez le nom de la personne à contacter"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Téléphone de la personne à contacter en cas d'urgence -->
            <FormField
               v-slot="{ componentField }"
               name="telephone_personne_a_contacter"
            >
               <FormItem>
                  <FormLabel>Téléphone de la personne à contacter</FormLabel>
                  <FormControl>
                     <Input
                        id="telephone_personne_a_contacter"
                        type="text"
                        placeholder="Entrez le numéro de téléphone"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Rôle de la personne -->
            <FormField v-slot="{ componentField }" name="role">
               <FormItem>
                  <FormLabel>Rôle</FormLabel>
                  <FormControl>
                     <Select v-bind="componentField">
                        <SelectTrigger>
                           <SelectValue
                              id="role"
                              placeholder="Sélectionnez un rôle"
                           />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Rôles disponibles</SelectLabel>
                              <SelectItem
                                 v-for="role in Roles"
                                 :value="role?.name"
                                 class="first-letter:uppercase"
                              >
                                 {{ role?.name }}
                              </SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Salaire de la personne -->
            <FormField v-slot="{ componentField }" name="salaire">
               <FormItem>
                  <FormLabel>Salaire</FormLabel>
                  <FormControl>
                     <Select id="salaire" v-bind="componentField">
                        <SelectTrigger>
                           <SelectValue placeholder="Sélectionnez un salaire" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Tranches de salaire</SelectLabel>
                              <SelectItem
                                 v-for="salaire in Salaires"
                                 :value="salaire?.id"
                                 class="first-letter:uppercase"
                              >
                                 {{ salaire?.montant }}
                              </SelectItem>
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <!-- Date de début dans l'entreprise -->
            <FormField v-slot="{ componentField }" name="date_debut">
               <FormItem>
                  <FormLabel>Date de début</FormLabel>
                  <FormControl>
                     <Input
                        id="salaire"
                        type="date"
                        v-bind="componentField"
                        placeholder="Sélectionnez la date de début"
                     />
                  </FormControl>
                  <FormMessage class="text-xs" />
               </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="type_contrat">
               <FormItem>
                  <FormLabel>Type de Contrat</FormLabel>
                  <FormControl>
                     <Select id="type_contrat" v-bind="componentField">
                        <SelectTrigger>
                           <SelectValue
                              placeholder="Sélectionnez le type de contrat"
                           />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectGroup>
                              <SelectLabel>Options de contrat</SelectLabel>
                              <SelectItem value="CDD">CDD</SelectItem>
                              <SelectItem value="CDI">CDI</SelectItem>
                              <SelectItem value="Interim">Intérim</SelectItem>
                              <SelectItem value="Stage">Stage</SelectItem>
                              <SelectItem value="Essai">Essai</SelectItem>
                           </SelectGroup>
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
import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { onMounted, ref } from 'vue';
import { useDataStore } from '@/stores/data.store';
import { useToast } from '@/components/ui/toast/use-toast';
import { useModalStore } from '@/stores/modal.store';
const { toast } = useToast();

const formSchema = toTypedSchema(
   z.object({
      name: z.string().min(1, "Le champ 'nom' est requis."),
      nom: z.string().min(1, "Le champ 'nom' est requis."),
      prenoms: z.string().min(1, "Le champ 'prénoms' est requis."),
      email: z.string().email("L'adresse email n'est pas valide."),
      telephone: z.string().min(1, "Le champ 'téléphone' est requis."),
      date_naissance: z
         .string()
         .min(1, "Le champ 'date de naissance' est requis."),
      lieu_naissance: z
         .string()
         .min(1, "Le champ 'lieu de naissance' est requis."),
      fonction: z.string().min(1, "Le champ 'fonction' est requis."),
      situation_matrimoniale: z.enum([
         'Célibataire',
         'Marié(e)',
         'Veuf/Veuve',
         'Divorcé(e)',
      ]),
      nom_personne_a_contacter: z
         .string()
         .min(1, "Le champ 'nom de la personne à contacter' est requis."),
      telephone_personne_a_contacter: z
         .string()
         .min(1, "Le champ 'téléphone de la personne à contacter' est requis."),
      role: z.string().min(1, "Le champ 'role' est requis."),
      salaire: z
         .number()
         .min(0, "Le champ 'salaire' doit être un nombre positif."),
      date_debut: z.string().min(1, "Le champ 'date de début' est requis."),
      type_contrat: z.enum(['CDD', 'CDI', 'Interim', 'Stage', 'Essai']),
   })
);

const { handleSubmit } = useForm({
   validationSchema: formSchema,
});

const { createData, readData } = useApiServices();

const onSubmit = handleSubmit((values) => {
   createData(API_URL.USER_CREATE, values)
      .then((data: any) => {
         if (data) {
            const DataKey = Object.keys(values);
            DataKey.forEach((el) => {
               const query: any = document.querySelector('#' + el);
               if (query) query.value = '';
            });

            const Add: any = useDataStore().Personals;
            Add.unshift(data.data);
            useDataStore().Personals = Add;
            useModalStore().open = false
            toast({
               title: 'Enrégistre',
               description: 'Employé ajouter avec succès',
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

const Roles: any = ref([]);
const Salaires: any = ref([]);

onMounted(() => {
   readData(API_URL.ROLE_LIST).then((data) => (Roles.value = data.data));
   readData(API_URL.SALAIRE_LIST).then((data) => (Salaires.value = data.datas));
});
</script>
<style lang="scss" scoped></style>
