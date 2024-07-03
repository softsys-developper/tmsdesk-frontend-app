<template>
    <ModalLayout :Func="onSubmit" :loading="setStock.loadingCreate">
      <template v-slot:form>
        <div class="w-full space-y-2">
          <div class="" v-for="fr in StockForms">
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
  import { useStockHook } from "@/hooks/LOGISTIQUE/stock.hook";
  import { useUpdateStore } from "@/stores/update.store";
  import { StockForms } from "@/forms/LOGISTIQUE/stock.forms";
  import InForm from "../../forms/in.form.vue";
  import { onMounted } from "vue";
import { useModalStore } from "@/stores/modal.store";
import { useDataStore } from "@/stores/data.store";
  
  const { CreateStock, StockUpdate, setStock } = useStockHook();
  
  const onSubmit = (e: any) => {
    let values = new FormData(e.target);
    values.append('produitId', `${useModalStore().StocksID}` )
    if (useUpdateStore().isUpdate.is) {
      StockUpdate(useUpdateStore().isUpdate.id, values);
    } else {
      CreateStock(values, () => {
        const is:any = []
        const toAdd = useDataStore().Products.filter((el: any) => el.id != useModalStore().StocksID);
          is.unshift(...toAdd);
          useDataStore().Products = is;
      });
    }
  };
  
  onMounted(() => {
    // readData(API_URL.USER_LIST).then((data) =>
    //   remplacerObjetDansTableau(
    //     StockForms,
    //     "name",
    //     "categorie_id",
    //     data.datas.map((el: any) => ({
    //       id: el.id,
    //       name: el.name,
    //     }))
    //   )
    // );
  });
  </script>
  <style lang="scss" scoped></style>
  