<template>
    <div class="flex flex-col bg-white rounded-3xl shadow-1 p-4 lg:p-6">
        <button type="button" class="w-full flex justify-between items-center cursor-pointer md:cursor-default"
            :aria-expanded="isOpen" aria-controls="panel-filtros" @click="togglePanel">
            <span class="lg:text-xl font-bold">Filtros</span>
            <Icon name="material-symbols:keyboard-arrow-down-rounded" size="24"
                class="text-primary shrink-0 transition-transform duration-300 md:hidden!"
                :class="isOpen ? 'rotate-180' : ''" />
        </button>

        <div class="grid transition-[grid-template-rows] duration-300 ease-in-out md:grid-rows-[1fr]!"
            :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
            <div class="overflow-hidden md:overflow-visible">
                <div id="panel-filtros" class="flex flex-col gap-4 text-secondary pt-4">
                    <div class="flex flex-col gap-3">
                        <SearchLabel class="font-bold!">Categorías</SearchLabel>
                        <div class="flex flex-col gap-2">
                            <div v-for="cat in categorias" :key="cat" class="flex items-center justify-between gap-2">
                                <span class="text-xs lg:text-sm font-medium">{{ cat }}</span>
                                <SearchToggle :model-value="modelValue.categorias[cat]" :label="cat"
                                    @update:model-value="updateToggle('categorias', cat, $event)" />
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <SearchLabel class="font-bold!">Usos</SearchLabel>
                        <div class="flex flex-col gap-2">
                            <div v-for="uso in usos" :key="uso" class="flex items-center justify-between gap-2">
                                <span class="text-xs lg:text-sm font-medium">{{ uso }}</span>
                                <SearchToggle :model-value="modelValue.usos[uso]" :label="uso"
                                    @update:model-value="updateToggle('usos', uso, $event)" />
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-3">
                        <SearchLabel class="font-bold!">Tamaños</SearchLabel>
                        <div class="flex flex-col gap-2">
                            <div v-for="tam in tamanos" :key="tam" class="flex items-center justify-between gap-2">
                                <span class="text-xs lg:text-sm font-medium">{{ tam }}</span>
                                <SearchToggle :model-value="modelValue.tamanos[tam]" :label="tam"
                                    @update:model-value="updateToggle('tamanos', tam, $event)" />
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2">
                        <SearchLabel class="font-bold!">Rendimiento</SearchLabel>
                        <SearchRangeSlider :model-value="modelValue.rendimiento" :min="rendimientoRange.min"
                            :max="rendimientoRange.max" :step="1" suffix="m²/L"
                            @update:model-value="updateRendimiento" />
                        <div
                            class="flex items-start gap-2 bg-gray-mid rounded-sm text-xs text-secondary font-medium p-2">
                            <Icon name="material-symbols:info-outline-rounded" class="shrink-0 mt-0.5" />
                            <p>m² cubiertos por litro, por mano. Mayor número = mayor rendimiento = menor costo por m².
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: { type: Object, required: true },
    categorias: { type: Array, required: true },
    usos: { type: Array, required: true },
    tamanos: { type: Array, required: true },
    rendimientoRange: { type: Object, required: true },
    defaultOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.defaultOpen)

function togglePanel() {
    if (window.innerWidth >= 768) return
    isOpen.value = !isOpen.value
}

function updateToggle(grupo, key, value) {
    emit('update:modelValue', {
        ...props.modelValue,
        [grupo]: { ...props.modelValue[grupo], [key]: value },
    })
}

function updateRendimiento(value) {
    emit('update:modelValue', { ...props.modelValue, rendimiento: value })
}

onMounted(() => {
    if (window.innerWidth >= 768) {
        isOpen.value = true
    }
})
</script>
