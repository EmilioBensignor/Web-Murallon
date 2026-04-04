<template>
    <NuxtLink to="#" class="h-62 md:h-70 lg:h-90 flex flex-col items-center relative rounded-2xl overflow-hidden"
        :style="{ backgroundColor: `#${producto.codigo_color_card}` }">
        <NuxtImg src="/images/producto/Patron-Cards.webp" alt="Patron cards" class="w-full h-48 lg:h-62 object-cover" />
        <NuxtImg :src="imagenUrl" :alt="producto.nombre" class="w-full h-48 lg:h-62 object-contain absolute top-0 left-0" />

        <div class="flex flex-col text-center text-white pt-0 p-4 lg:px-6 md:pb-8 lg:pb-12 mt-auto">
            <p class="text-xs lg:textsm font-semibold uppercase">
                {{ accionTexto }}
            </p>
            <p class="lg:text-xl font-bold uppercase">
                {{ producto.nombre }}
            </p>
        </div>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    producto: {
        type: Object,
        required: true
    },
    imagenUrl: {
        type: String,
        required: true
    }
})

const accionTexto = computed(() =>
    getAccionProducto(props.producto.tipo_aplicacion?.id)
)
</script>
