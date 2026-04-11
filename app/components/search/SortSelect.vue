<template>
    <div ref="container" class="relative inline-flex">
        <button type="button" class="flex items-center gap-2 lg:text-xl cursor-pointer outline-none"
            :aria-expanded="isOpen" aria-haspopup="listbox" @click="isOpen = !isOpen">
            <span class="text-primary-default font-medium">Ordenar por {{ selectedLabel.charAt(0).toUpperCase() +
                selectedLabel.slice(1) }}</span>
            <div class="w-6 h-6 flex justify-center items-center bg-primary-10 rounded-full">
                <Icon name="material-symbols:keyboard-arrow-down-rounded" :class="[
                    'w-5 h-5 text-primary-default transition-transform duration-300',
                    isOpen ? 'rotate-180' : 'rotate-0'
                ]" />
            </div>
        </button>

        <Transition enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div v-if="isOpen" role="listbox" :aria-label="selectedLabel"
                class="w-max min-w-full absolute top-full z-50 bg-light border border-gray-mid rounded-xl shadow-lg mt-2 lg:mt-3 overflow-hidden"
                @mousedown.prevent>
                <button v-for="option in options" :key="option.value" type="button" role="option"
                    :aria-selected="option.value === modelValue" :class="[
                        'w-full flex items-center justify-between gap-4 text-left text-sm font-medium transition-colors duration-300 py-3 px-4',
                        option.value === modelValue ? 'text-primary-default bg-primary-10' : 'text-dark hover:bg-primary-10',
                    ]" @click="select(option.value)">
                    {{ option.label.charAt(0).toUpperCase() + option.label.slice(1) }}
                    <Icon v-if="option.value === modelValue" name="material-symbols:check-circle-rounded"
                        class="w-5 h-5 text-primary-default shrink-0" />
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup>
const props = defineProps({
    id: { type: String, default: 'sort-select' },
    modelValue: { type: String, default: '' },
    options: { type: Array, required: true },
})

const emit = defineEmits(['update:modelValue'])

const container = ref(null)
const isOpen = ref(false)

const selectedLabel = computed(() => {
    const found = props.options.find(o => o.value === props.modelValue)
    return found ? found.label : ''
})

function select(value) {
    emit('update:modelValue', value)
    isOpen.value = false
}

function handleClickOutside(event) {
    if (container.value && !container.value.contains(event.target)) {
        isOpen.value = false
    }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>
