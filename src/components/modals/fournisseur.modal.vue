<template>
   <ModalLayout :Func="onSubmit"  :loading="setFournisseur.loadingCreate">
     <template v-slot:form>
       <div class="w-full space-y-2">
         <div class="" v-for="fr in FournisseurForms">
           <InForm
             :title="fr.label"
             :name="fr.name"
             :label="fr.label"
             :type="fr.type"
             :placeholder="fr.placeholder"
             :select="fr.select"
           />
         </div>
       </div>

       <div class="mt-4" v-if="Interlocuteur.length != 0">
          <div v-for="(Inter, index) in Interlocuteur">
            <div class="mt-4">
              <div
                class="w-full bg-gray-400 py-1 px-4 rounded-md flex justify-between"
              >
                <span class="text-sm font-bold"
                  >Interlocuteur #{{ index + 1 }}
                </span>
                <div
                  class="cursor-pointer"
                  @click="CloseInterlocuteur(Inter.id)"
                >
                  <i class="ri-close-large-line"></i>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-2 p-2">
                <InForm
                  title="Nom"
                  :label="'Nom'"
                  type="text"
                  :placeholder="'Jean Luc'"
                  :isControl="true"
                  @update="(value: string) => Inter.nom = value"
                  :select="[]"
                />
                <InForm
                  title="Prenoms"
                  :label="'Prenoms'"
                  type="text"
                  :placeholder="'Jean Luc'"
                  :isControl="true"
                  @update="(value: string) => Inter.prenoms = value"
                  :select="[]"
                />
                <InForm
                  title="Email"
                  :label="'Email'"
                  type="email"
                  :placeholder="'jean@gmail.com'"
                  :isControl="true"
                  @update="(value: string) => Inter.email = value"
                  :select="[]"
                />
                <InForm
                  title="Poste"
                  :label="'Poste'"
                  type="text"
                  :placeholder="'Informatique'"
                  :isControl="true"
                  @update="(value: string) => Inter.poste = value"
                  :select="[]"
                />
                <InForm
                  title="telephone"
                  :label="'Téléphone'"
                  type="text"
                  :placeholder="'+225023125263'"
                  :isControl="true"
                  @update="(value: string) => Inter.telephone = value"
                  :select="[]"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="py-4">
          <Button type="button" @click="AddInterlocuteur"
            >Ajouter un interlocuteur</Button
          >
        </div>

     </template>
   </ModalLayout>
 </template>
 <script lang="ts" setup>
 import ModalLayout from "@/layouts/modal.layout.vue";
 import { useFournisseurHook } from "@/hooks/CRM/fournisseurs.hook";
 import { useUpdateStore } from "@/stores/update.store";
 import { FournisseurForms } from "@/forms/CRM/fournisseur.forms";
 import InForm from "../forms/in.form.vue";
 import Button from "../ui/button/Button.vue";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useUtilHook } from "@/hooks/utils.hook";
import { onMounted, ref } from "vue";

const { readData } = useApiServices();
const { remplacerObjetDansTableau } = useUtilHook();

const Interlocuteur = ref(<any>[]);

const CloseInterlocuteur = (id: any) => {
  Interlocuteur.value = Interlocuteur.value.filter((el: any) => el.id !== id);
};

const AddInterlocuteur = () => {
  Interlocuteur.value.push({
    id: Interlocuteur.value.length + 1,
    nom: "",
    prenoms: "",
    email: "",
    poste: "",
    telephone: "",
  });
};
 
 const { CreateFournisseur, FindFournisseurUpdate, setFournisseur } = useFournisseurHook();
 
 const onSubmit = (e: any) => {
   let values = new FormData(e.target);
   values.append("interlocuteurs", JSON.stringify(Interlocuteur.value));
   if (useUpdateStore().isUpdate.is) {
      FindFournisseurUpdate(useUpdateStore().isUpdate.id, values);
   } else {
     CreateFournisseur(values);
   }
 };




 onMounted(() => {
  readData(API_URL.MARQUE_LIST).then((data) =>
    remplacerObjetDansTableau(
      FournisseurForms,
      "name",
      "marque",
      data.datas
    )
  );
  readData(API_URL.CATEGORIE_LIST).then((data) =>
    remplacerObjetDansTableau(
      FournisseurForms,
      "name",
      "categorie",
      data.datas
    )
  );
});
 </script>
 <style lang="scss" scoped></style>
 