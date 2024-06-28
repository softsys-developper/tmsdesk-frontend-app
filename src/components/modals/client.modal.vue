<template>
  <ModalLayout :Func="onSubmit"  :loading="setClient.loadingCreate">
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in ClientForms">
          <InForm
            :title="fr.label"
            :name="fr.name"
            :label="fr.label"
            :type="fr.type"
            :placeholder="fr.placeholder"
            :select="fr.select"
          />

        
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
              <div class="cursor-pointer" @click="CloseInterlocuteur(Inter.id)">
                <i class="ri-close-large-line"></i>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 p-2" >
                <InForm title="Nom" :label="'Nom'" name="int_nom" type="text" :placeholder="'Jean Luc'"
                  :isControl="true"  :modelValue="Inter.nom" @update:modelValue="((value:any) => Inter.nom = value )"  />
                <InForm title="Prenoms" :label="'Prenoms'" type="text" :placeholder="'Jean Luc'" :isControl="true"
                :modelValue="Inter.prenoms" @update:modelValue="((value:any) => Inter.prenoms = value )" />
                <InForm title="Email" :label="'Email'" type="email" :placeholder="'jean@gmail.com'" :isControl="true"
                :modelValue="Inter.email" @update:modelValue="((value:any) => Inter.email = value )" />
                <InForm title="Poste" :label="'Poste'" type="text" :placeholder="'Informatique'" :isControl="true"
                :modelValue="Inter.poste" @update:modelValue="((value:any) => Inter.poste = value )" />
                <InForm title="telephone" :label="'Téléphone'" type="text" :placeholder="'+225023125263'"
                  :isControl="true":modelValue="Inter.telephone" @update:modelValue="((value:any) => Inter.telephone = value )" />
              </div>
          </div>
        </div>
      </div>

      <div class="py-4">
        <Button type="button" @click="AddInterlocuteur"
          >Ajouter un interlocuteur</Button
        >
      </div>
      </div>
    </template>
  </ModalLayout>
</template>
<script lang="ts" setup>
import ModalLayout from "@/layouts/modal.layout.vue";
import { useClientHook } from "@/hooks/CRM/client.hook";
import { useUpdateStore } from "@/stores/update.store";
import { ClientForms } from "@/forms/CRM/client.forms";
import InForm from "../forms/in.form.vue";
import { ref } from "vue";
import Button from "../ui/button/Button.vue";

const { CreateClient, ClientUpdate, setClient } = useClientHook();

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



const onSubmit = (e: any) => {
  let values = new FormData(e.target);
  values.append("interlocuteurs", JSON.stringify(Interlocuteur.value));
  if (useUpdateStore().isUpdate.is) {
    ClientUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreateClient(values);
  }
};
</script>
<style lang="scss" scoped></style>
