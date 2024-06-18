<template>
  <ModalLayout :Func="onSubmit" :loading="setPaid.loadingCreate">
    <template v-slot:form>
      <div class="w-full space-y-2">
        <div class="" v-for="fr in PaidForms">
          <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type" :placeholder="fr.placeholder"
            :select="fr.select" />
        </div>

        <div class="flex flex-col gap-1 pb-4" v-if="useDataStore().Primes.length != 0">
          <label class="flex flex-col w-full gap-1 text-sm font-bold" for="">Indemnites et primes</label>

          <div class=""  >
            <div v-for="(Primes, index) in useDataStore().Primes">
              <div class="flex items-start ">
                <div class="mb-[0.5rem] block min-h-[1.5rem] ps-[1.5rem]">
                  <input type="checkbox" :id="'checkbox-' + index"  :value="Primes.id" class="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary" 
                    @change="toggleSelectAll($event)" />
                  <label :for="'checkbox-' + index"
                    class="text-base capitalize text-gray-500 ms-3 dark:text-neutral-400">{{
                      Primes.libelle }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ModalLayout>
</template>
<script lang="ts" setup>
import ModalLayout from '@/layouts/modal.layout.vue';
import InForm from "@/components/forms/in.form.vue";
import { usePaidHook } from '@/hooks/RH/paid.hook';
import { useUpdateStore } from '@/stores/update.store';
import { PaidForms } from '@/forms/RH/paid.forms';
import { onMounted, ref } from 'vue';
import { useApiServices } from '@/services/api.services';
import { API_URL } from '@/routes/api.route';
import { useDataStore } from '@/stores/data.store';
import { useUtilHook } from '@/hooks/utils.hook';

const { readData } = useApiServices()
const { CreatePaid, PaidUpdate, setPaid } = usePaidHook();
const selectedItems = ref<string[]>([]);

const toggleSelectAll = (event: Event) => {
  const checkbox = event.target as HTMLInputElement;
  if (checkbox.checked) {
    console.log(typeof Number(checkbox.value.toString))
    selectedItems.value.push(checkbox.value.toString());
  } else {
    selectedItems.value = selectedItems.value.filter((el:any) => el != checkbox.value);
  }

  console.log(selectedItems.value)
};

const onSubmit = (e: any) => {
  console.log(e.target, selectedItems.value)
  let values = new FormData(e.target);
  values.append('indemnites', JSON.stringify(selectedItems.value))
  if (useUpdateStore().isUpdate.is) {
    PaidUpdate(useUpdateStore().isUpdate.id, values);
  } else {
    CreatePaid(values);
  }
};


const { remplacerObjetDansTableau } = useUtilHook()

onMounted(() => {
  readData(API_URL.PRIME_LIST).then((data) => {
    useDataStore().Primes = data.datas
  })
  readData(API_URL.BANQUE_LIST).then((data) => {
    useDataStore().Comptes = data.datas
    remplacerObjetDansTableau(PaidForms, 'name', 'banque', data.datas)
  })
  readData(API_URL.USER_LIST).then((data) => {
    useDataStore().Comptes = data.datas
    remplacerObjetDansTableau(PaidForms, 'name', 'user', data.datas)
  })
})
</script>
<style lang="scss" scoped></style>