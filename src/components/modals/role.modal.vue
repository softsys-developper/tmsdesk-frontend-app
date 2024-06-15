<template>
    <ModalLayout :Func="onSubmit" :loading="setRole.loadingCreate">
        <template v-slot:form>
            <div class="w-full space-y-2">
                <div class="" v-for="fr in RoleForms">
                    <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type"
                        :placeholder="fr.placeholder" :select="fr.select" />
                </div>
            </div>
        </template>
    </ModalLayout>
</template>
<script lang="ts" setup>
import ModalLayout from "@/layouts/modal.layout.vue";
import { useRoleHook } from "@/hooks/SYSTEME/role.hook";
import { useUpdateStore } from "@/stores/update.store";
import { RoleForms } from "@/forms/SYSTEME/role.forms";
import InForm from "../forms/in.form.vue";

const { CreateRole, RoleUpdate, setRole } = useRoleHook();

const onSubmit = (e: any) => {
    console.log(useUpdateStore().isUpdate)
    let values = new FormData(e.target);
    if (useUpdateStore().isUpdate.is) {
        RoleUpdate(useUpdateStore().isUpdate.id, values);
    } else {
        CreateRole(values);
    }
};
</script>
<style lang="scss" scoped></style>