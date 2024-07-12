<script setup lang="ts">
import { ref } from 'vue'
import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
} from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
})

const props = defineProps(['modelValue', 'SendFilter'])
const valueRef = ref<DateValue>()


const emit = defineEmits(['update:modelValue']);
const emitInput = (value: any) => {
    console.log(value)
    valueRef.value = value
    emit('update:modelValue', value);
};

const DataPickerIs = (value: any) => {
    if (value) {
        props.SendFilter()
        // emitInput(df.format(value.toDate(getLocalTimeZone())))
        return df.format(value.toDate(getLocalTimeZone())).split(',')[1]
    } else {
        return "Pick a date"
    }
}

</script>

<template>
    <Popover class="w-4" >
        <PopoverTrigger as-child>
            <Button variant="outline" class="w-4" :class="cn(
                'w-[120px] justify-start text-left font-normal text-xs',
                !valueRef && 'text-muted-foreground',
            )">
                <CalendarIcon class="mr-2 h-4 w-4 " />
                {{ DataPickerIs(valueRef) }}
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <Calendar v-model="valueRef" @click="emitInput(valueRef)" initial-focus />
        </PopoverContent>
    </Popover>
</template>