<template>
    <div
        class="flex flex-col p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-gray-50/50">
        <div class="flex justify-between cursor-pointer" @click="toggleDropdown">
            <div class="flex gap-2 justify-center items-center transition duration-75">
                <img :src="menu.icon" class="h-5" alt="" />
                <div class="text-base font-bold">{{ menu.name }} </div>
            </div>
            <div v-if="hasChildren">
                <i class="ri-arrow-down-s-line"></i>
            </div>
        </div>
        <div v-if="isOpen" class="flex flex-col gap-1 py-4 transition duration-75 cursor-pointer submenu-all">
            <RouterLink v-for="(ch, ils) in menu.children" :key="ils" :to="{ name: ch.route }" @click="ChangeMenu(ch)"
                class="flex items-center px-4 font-bold text-sm p-2 gap-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                :class="{ 'bg-gray-200 dark:bg-gray-700': isActive(ch) }">
                <i :class="ch.icon"></i>
                {{ ch.name }}
            </RouterLink>
        </div>
    </div>
    {{ IsRoute }}
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useModalStore } from '@/stores/modal.store';

const props = defineProps(["menu", "index"]);

const isOpen = ref(false);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const hasChildren = computed(() => props.menu.children?.length > 0);
const IsRoute = computed(() => {
    if (useModalStore().isMenu == props.index) {
        isOpen.value = true
    }else{
        isOpen.value = false
    }
});



const ChangeMenu = (ch: any) => {
    useModalStore().isOpenSubMenu = ch.name;
    useModalStore().isMenu = props.index;
};

const isActive = (ch: any) => {
    return useModalStore().isOpenSubMenu === ch.name;
};
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>