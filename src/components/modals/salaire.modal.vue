<template>
   <ModalLayout :Func="onSubmit" :loading="setSalaire.loadingCreate">
        <template v-slot:form>
            <div class="w-full space-y-2">
                <div class="" v-for="fr in SalaryForms">
                    <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type"
                        :placeholder="fr.placeholder" :select="fr.select" />
                </div>
            </div>
        </template>
   </ModalLayout>
</template>
<script lang="ts" setup>
import ModalLayout from '@/layouts/modal.layout.vue';
import InForm from "../forms/in.form.vue";
import { useSalaireHook } from '@/hooks/RH/salary.hook';
import { useUpdateStore } from '@/stores/update.store';
import { SalaryForms } from '@/forms/RH/salary.forms';

const { CreateSalaire, SalaireUpdate, setSalaire } = useSalaireHook();

const onSubmit = (e: any) => {
    console.log(useUpdateStore().isUpdate)
    let values = new FormData(e.target);
    if (useUpdateStore().isUpdate.is) {
      SalaireUpdate(useUpdateStore().isUpdate.id, values);
    } else {
        CreateSalaire(values);
    }
};
</script>
<style lang="scss" scoped></style>
