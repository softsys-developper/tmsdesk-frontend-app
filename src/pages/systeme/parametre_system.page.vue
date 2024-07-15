<template>
  <BaseLayout>
    <template v-slot:content>
      <div class="flex gap-24 w-full items-start justify-start">
        <!-- Générale -->

        <div
          class="grid grid-cols-1 gap-4 lg:w-full w-full pb-24"
          v-if="useModalStore().isOpenSetting == 'Generale'"
        >
          <SettingCard
            title="Parametre | Configuration du système"
            placeholder="Software Système"
            :SendSetting="SendSetting"
          >
            <template v-slot:default>
              <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                <InputForm
                  title="Dénomination"
                  placeholder="Software Système"
                  :value="PARAMETRE.denomination"
                  name="denomination"
                />
                <InputForm
                  title="Forme Juridique"
                  placeholder="SARL"
                  :value="PARAMETRE.forme_juridique"
                  name="forme_juridique"
                />
                <InputForm
                  title="Sigles"
                  placeholder="S.S.A.S"
                  :value="PARAMETRE.sigle"
                  name="sigle"
                />
                <InputForm
                  title="Acticités"
                  placeholder="Développement"
                  :value="PARAMETRE.activite"
                  name="activite"
                />
                <InputForm
                  title="BP"
                  placeholder="BP01 - Abidjan 20"
                  :value="PARAMETRE.bp"
                  name="bp"
                />
                <InputForm
                  title="Telephone"
                  placeholder="00 00 00 00 00"
                  :value="PARAMETRE.telephone_1"
                  name="telephone_1"
                />
                <InputForm
                  title="Adresse email"
                  placeholder="john@exemple.com"
                  :value="PARAMETRE.email_1"
                  name="email_1"
                />
                <InputForm
                  title="Commune"
                  placeholder="Abidjan"
                  :value="PARAMETRE.commune"
                  name="commune"
                />
                <InputForm
                  title="Région"
                  placeholder="Abidjan"
                  :value="PARAMETRE.adresse"
                  name="region"
                />
                <InputForm
                  title="Quatier"
                  placeholder="Cocody"
                  :value="PARAMETRE.quartier"
                  name="quartier"
                />
                <InputForm title="Rue" placeholder="B6 14" />
                <InputForm
                  title="Code postal"
                  placeholder="00000"
                  :value="PARAMETRE.code_activite"
                  name="code_postal"
                />
                <SelectedForm
                  label="Dévise"
                  type="select"
                  title="Dévise"
                  placeholder="00000"
                  :value="PARAMETRE.code_activite"
                  name="devise"
                  :select="ListOfDevises"
                />
                <InputForm
                  title="Lot"
                  placeholder="ILot - 14"
                  :value="PARAMETRE.lot"
                  name="lot"
                />
                <InputForm
                  title="centre des impôts"
                  placeholder="CNPS Angrés"
                  :value="PARAMETRE.numero_cnps"
                  name="centre_impots"
                />
                <InputForm
                  title="Numéro c.c"
                  placeholder=""
                  :value="PARAMETRE.numero_cc"
                  name="numero_cc"
                />
                <InputForm
                  title="Numéro CNPS"
                  placeholder="CP-0000000"
                  :value="PARAMETRE.numero_cnps"
                  name="numero_cnps"
                />
                <InputForm
                  title="Numéro etablissement"
                  placeholder="NE- 0000000"
                  :value="PARAMETRE.numero_registre_commerce"
                  name="numero_etablissement"
                />
                <InputForm
                  title="Code activités"
                  placeholder="NE- 0000000"
                  :value="PARAMETRE.code_activite"
                  name="code_activite"
                />
                <InputForm
                  title="Numéro de registre de commerce"
                  placeholder=""
                  :value="PARAMETRE.numero_registre_commerce"
                  name="numero_registre_commerce"
                />
                <InputForm
                  title="Numéro compte bancaire"
                  placeholder=" 2656 2652 662 62"
                  :value="PARAMETRE.numero_compte_bancaire"
                  name="numero_compte_bancaire"
                />
                <InputForm
                  title="ITS Salaire"
                  placeholder="1.2"
                  :value="PARAMETRE.its_employe"
                  name="its_salaire"
                />
                <InputForm
                  title="CN"
                  placeholder="Calucl Automatisé"
                  :value="PARAMETRE.cn"
                  name="cn"
                />
                <InputForm
                  title="IGR"
                  placeholder="Calucl Automatisé"
                  :value="PARAMETRE.igr"
                  name="igr"
                />
                <InputForm
                  title="CNPS Retraite, salaire"
                  placeholder="6.3%"
                  :value="PARAMETRE.cnps_retraite_employe"
                  name="cnps_retraite_salaire"
                />
                <InputForm
                  title="CNPS Retraite, employeur"
                  placeholder="7.7%"
                  :value="PARAMETRE.cnps_retraite_employeur"
                  name="cnps_retraite_employeur"
                />
                <InputForm
                  title="CNPS, Accident de Travail (AT) "
                  placeholder="3%"
                  :value="PARAMETRE.cnps_at"
                  name="cnps_at"
                />
                <InputForm
                  title="CNPS, Prestation Familiale (PF) "
                  placeholder="5.75%"
                  :value="PARAMETRE.cnps_pf"
                  name="cnps_pf"
                />
                <InputForm
                  title="FDFP, Taxe d'apprentissage (TA)"
                  placeholder="0.4%"
                  :value="PARAMETRE.fdfp_ta"
                  name="fdfp_ta"
                />
                <InputForm
                  title="FDFP, Form. Prof. Continue (FPC)"
                  placeholder="0.6%"
                  :value="PARAMETRE.fdfp_fpc"
                  name="fdfp_fpc"
                />
                <InputForm
                  title="Jour validité"
                  placeholder="0.6%"
                  :value="PARAMETRE.jour_validite_document"
                  name="jour_validite_document"
                />
              </div>

              <div class="flex flex-col py-8 gap-4">
                <div class="">
                  <span class="text-base font-bold">Fichers</span>
                </div>

                <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
                  <div class="">
                    <label for="">
                      Signature :
                      {{ PARAMETRE.signature ? "Updated" : "Non Ajouter" }}
                    </label>
                    <Input type="file" name="signature" class="" />
                  </div>

                  <div class="">
                    <label for="">
                      Logo : {{ PARAMETRE.logo ? "Updated" : "Non Ajouter" }}
                    </label>
                    <Input type="file" name="logo" class="" />
                  </div>

                  <div class="">
                    <label for="">
                      Entête :
                      {{ PARAMETRE.entete ? "Updated" : "Non Ajouter" }}
                    </label>
                    <Input type="file" name="en_tete" class="" />
                  </div>

                  <div class="">
                    <label for="">
                      Pied de page :
                      {{ PARAMETRE.pied_de_page ? "Updated" : "Non Ajouter" }}
                    </label>
                    <Input type="file" name="pied_de_page" class="" />
                  </div>
                </div>
              </div>
            </template>
          </SettingCard>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>
<script lang="ts" setup>
import BaseLayout from "@/layouts/base.layout.vue";
import SettingCard from "@/components/cards/setting.card.vue";
import { useModalStore } from "@/stores/modal.store.ts";
import InputForm from "@/components/forms/input.form.vue";
import axios from "axios";
import { API_URL } from "@/routes/api.route";
import { onMounted, ref } from "vue";
import { type SETTING } from "@/types/setting.type";
import { useToast } from "@/components/ui/toast/use-toast";
import Input from "@/components/ui/input/Input.vue";
import { useApiServices } from "@/services/api.services";
import SelectedForm from "@/components/forms/selected.form.vue";
const { toast } = useToast();

const PARAMETRE = ref(<SETTING>{});

const ListParametre = async () => {
  try {
    const response = await axios.get(API_URL.SETTING_LIST);
    PARAMETRE.value = response.data?.datas;
    return PARAMETRE.value;
  } catch (error) {
    throw error;
  }
};

const SendSetting = async (e: any) => {
  e.preventDefault();

  try {
    const data = new FormData(e.target);

    const response = await axios.post(API_URL.SETTING_UPDATE, data);
    if (response.data) {
      toast({
        title: "Succès !",
        description: response.data.message,
      });
    }
    // console.log(response);
  } catch (err: any) {
    if (err) {
      const isErr = Object.keys(err.response.data.errors);
      if (isErr) {
        toast({
          title: isErr[0],
          variant: "destructive",
          description: err.response.data.errors[isErr[0]][0],
        });
      } else {
        toast({
          title: "error",
          variant: "destructive",
          description: err.response.data.message,
        });
      }
    }
  }
};

const ListOfDevises = ref([]);
onMounted(() => {
  ListParametre();
  useApiServices()
    .readData(API_URL.DEVISE_LIST)
    .then((data: any) => {
      ListOfDevises.value = data.datas;
    });
});
</script>
<style lang="css" scoped></style>
