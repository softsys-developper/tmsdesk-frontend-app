<template>
    <ModalLayout :Func="onSubmit"  :loading="setHoliday.loadingCreate">
      <template v-slot:form>
        <div class="w-full space-y-2">
          <div class="" v-for="fr in HolidayForms">
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
      </template>
    </ModalLayout>
  </template>
  <script lang="ts" setup>
  import ModalLayout from "@/layouts/modal.layout.vue";
  import { useHolidayHook } from "@/hooks/SYSTEME/holiday.hook";
  import { useUpdateStore } from "@/stores/update.store";
  import { HolidayForms } from "@/forms/SYSTEME/holiday.forms";
  import InForm from "../../forms/in.form.vue";
  
  const { CreateHoliday, HolidayUpdate, setHoliday } = useHolidayHook();
  
  const onSubmit = (e: any) => {
    let values = new FormData(e.target);
    if (useUpdateStore().isUpdate.is) {
      HolidayUpdate(useUpdateStore().isUpdate.id, values);
    } else {
      CreateHoliday(values);
    }
  };
  </script>
  <style lang="scss" scoped></style>
  