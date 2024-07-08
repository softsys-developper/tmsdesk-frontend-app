<template>
    <ModalLayout :Func="onSubmit" :loading="setUser.loadingCreate" permissions="ajouter-utilisateur">
        <template v-slot:form>
            <div class="w-full space-y-2">
                <div class="" v-for="fr in UserForms">
                    <InForm :title="fr.label" :name="fr.name" :label="fr.label" :type="fr.type"
                        :placeholder="fr.placeholder" :select="fr.select" />
                </div>
            </div>
        </template>
    </ModalLayout>
</template>
<script lang="ts" setup>
import ModalLayout from "@/layouts/modal.layout.vue";
import { useUserHook } from "@/hooks/PARAMETRE/user.hook";
import { useUpdateStore } from "@/stores/update.store";
import InForm from "@/components/forms/in.form.vue";
import { UserForms } from "@/forms/RH/personal.froms"
import { onMounted } from "vue";
import { useApiServices } from "@/services/api.services";
import { API_URL } from "@/routes/api.route";
import { useUtilHook } from "@/hooks/utils.hook";



const { CreateUser, UserUpdate, setUser } = useUserHook();
const { readData } = useApiServices()
const { remplacerObjetDansTableau } = useUtilHook()

const onSubmit = (e: any) => {
    let values = new FormData(e.target);
    if (useUpdateStore().isUpdate.is) {
        UserUpdate(useUpdateStore().isUpdate.id, values);
    } else {
        CreateUser(values);
    }
};

onMounted(() => {
    readData(API_URL.ROLE_LIST).then((data) =>
        remplacerObjetDansTableau(
            UserForms,
            "name",
            "role",
            data.datas.map((el: any) => ({ name: el.name, id: el.name }))
        )
    );
})
</script>
<style lang="scss" scoped></style>