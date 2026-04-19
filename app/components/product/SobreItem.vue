<template>
    <div class="flex flex-col">
        <button type="button" :class="[
            'w-full h-12 flex justify-between items-center gap-2 rounded-full cursor-pointer transition-colors duration-300 py-3 px-4',
            isOpen ? 'bg-primary text-white' : 'bg-gray-mid text-secondary',
        ]" @click="$emit('toggle')">
            <div class="flex items-center gap-2">
                <Icon :name="`material-symbols:${seccion.icono}`" size="24" class="shrink-0" />
                <HeadingH3 class="text-left uppercase">
                    {{ seccion.titulo }}
                </HeadingH3>
            </div>
            <span :class="[
                'w-6 h-6 flex items-center justify-center rounded-full shrink-0 transition-colors duration-300',
                isOpen ? 'bg-white text-primary' : 'bg-white text-secondary',
            ]">
                <Icon name="material-symbols:keyboard-arrow-down-rounded" size="24"
                    :class="['transition-transform duration-300', isOpen ? 'rotate-180' : '']" />
            </span>
        </button>

        <div class="grid transition-all duration-300 ease-in-out"
            :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
            <div class="overflow-hidden">
                <div class="sobre-contenido text-sm lg:text-base text-secondary font-medium px-9 lg:px-11 pt-2 lg:pt-4"
                    v-html="seccion.contenido" />
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    seccion: { type: Object, required: true },
    isOpen: { type: Boolean, default: false },
})

defineEmits(['toggle'])
</script>

<style scoped>
.sobre-contenido :deep(ul) {
    list-style: disc;
}

.sobre-contenido :deep(li + li),
.sobre-contenido :deep(.bloque + .bloque) {
    margin-block-start: 1lh;
}

.sobre-contenido :deep(.label) {
    font-weight: 700;
}
</style>
