<template>
    <div class="relative" data-dropdown>
        <button @click="$emit('toggle')" :disabled="disabled"
            class="w-full flex items-center justify-between gap-2 bg-white border-2 border-primary rounded-full px-4 py-2.5 text-sm font-medium transition-colors"
            :class="disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'">
            <span :class="value ? 'text-dark' : 'text-gray-dark'">
                {{ value || placeholder }}
            </span>
            <Icon name="material-symbols:keyboard-arrow-down-rounded" size="1.25rem"
                class="text-primary transition-transform duration-200" :class="isOpen ? 'rotate-180' : ''" />
        </button>

        <Transition enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in" leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1">
            <div v-if="isOpen"
                class="absolute z-50 top-full mt-2 left-0 right-0 bg-white border border-gray-mid rounded-2xl shadow-lg overflow-hidden">
                <div class="p-2">
                    <div class="flex items-center gap-2 border border-gray-mid rounded-full px-3 py-2">
                        <input type="text" :value="search" @input="$emit('update:search', $event.target.value)"
                            placeholder="Buscar" class="flex-1 text-sm outline-none bg-transparent" />
                        <Icon name="material-symbols:search-rounded" size="1.25rem" class="text-gray-dark" />
                    </div>
                </div>

                <ul class="max-h-48 overflow-y-auto">
                    <li v-for="option in options" :key="getOptionLabel(option)"
                        @click="$emit('select', option)"
                        class="px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-light transition-colors"
                        :class="getOptionLabel(option) === value ? 'bg-gray-light font-medium' : ''">
                        {{ getOptionLabel(option) }}
                    </li>
                    <li v-if="options.length === 0" class="px-4 py-2.5 text-sm text-gray-dark text-center">
                        Sin resultados
                    </li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<script setup>
const props = defineProps({
    value: { type: String, default: '' },
    placeholder: { type: String, default: 'Seleccionar' },
    options: { type: Array, default: () => [] },
    optionKey: { type: String, default: '' },
    search: { type: String, default: '' },
    isOpen: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
})

defineEmits(['toggle', 'select', 'update:search'])

const getOptionLabel = (option) => {
    if (props.optionKey && typeof option === 'object') {
        return option[props.optionKey]
    }
    return option
}
</script>
