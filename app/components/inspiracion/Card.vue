<template>
    <div class="group h-70 md:h-90 lg:h-112 relative rounded-2xl overflow-hidden cursor-pointer">
        <NuxtImg :src="imagenAntesUrl" :alt="`${inspiracion.titulo} - Antes`"
            class="w-full h-full object-cover absolute inset-0 transition-opacity duration-400 group-hover:opacity-0" />
        <NuxtImg :src="imagenDespuesUrl" :alt="`${inspiracion.titulo} - Después`" class="w-full h-full object-cover" />

        <div class="w-max absolute top-4 lg:top-6 left-2 md:left-4 lg:left-6 bg-white/75 rounded-full py-3.5 px-4">
            <p class="text-sm lg:text-base font-semibold">
                {{ inspiracion.titulo }}
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    inspiracion: {
        type: Object,
        required: true
    },
    imagenAntesUrl: {
        type: String,
        required: true
    },
    imagenDespuesUrl: {
        type: String,
        required: true
    }
})
</script>
