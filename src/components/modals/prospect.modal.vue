<template>
  <ModalLayout :Func="onSubmit" :loading="setProspect.loadingCreate">
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in ProspectForms">
          <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type" :placeholder="fr.placeholder"
            :select="fr.select" />
        </div>


        


       <div class="mt-4 hidden" v-if="Interlocuteur.length != 0">

        <div v-for="(Inter, index) in Interlocuteur" >
          <div class=" mt-4 ">
         <div class="w-full bg-gray-400 py-1 px-4 rounded-md">
          <span class="text-sm font-bold">Interlocuteur #{{ index+ 1 }} </span>
         </div>

         <div class="grid grid-cols-2 gap-2 p-2">
         
            <input type="text" v-model="Inter.nom" class="border-2 p-4" >
          <!-- <InForm :title="fr.label" :value="Inter[fr.name]" :name="fr.name" :label="fr.label" :type="fr.type" :placeholder="fr.placeholder"
            :select="fr.select" /> -->
     
         </div>

        </div>
        </div>

       </div>

       <div class="py-4 hidden">
          <Button type="button" @click="AddInterlocuteur" >Ajouter un interlocuteur</Button>
        </div>

      

      </div>
    </template>
  </ModalLayout>
</template>
<script lang="ts" setup>
import ModalLayout from "@/layouts/modal.layout.vue";

// import { onMounted, ref } from 'vue';
import { useProspectHook } from "@/hooks/CRM/prospects.hook";
import { useUpdateStore } from "@/stores/update.store";
import InForm from "../forms/in.form.vue";
import { ProspectForms } from "@/forms/CRM/prospect.forms";
import { ref } from "vue";
import Button from "../ui/button/Button.vue";

const { CreateProspect, ProspectUpdate, setProspect } = useProspectHook();

const Interlocuteur = ref(<any>[])

const AddInterlocuteur = () => {
  Interlocuteur.value.push({
    nom: '',
    prenoms: '',
    email: '',
    poste: '',
    telephone: ''
  })
}

const onSubmit = (e: any) => {

  let values = new FormData(e.target);
  // values.append('interlocuteurs', JSON.stringify(Interlocuteur.value))
  if (useUpdateStore().isUpdate.is) {
    ProspectUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreateProspect(values);
  }
};


</script>

<style lang="scss" scoped></style>
