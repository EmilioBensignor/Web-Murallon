<template>
    <NuxtLink to="#" :class="['group flex flex-col items-center relative rounded-3xl overflow-hidden', heightClass]"
        :style="{ backgroundColor: `#${producto.codigo_color_card}` }">
        <NuxtImg src="/images/producto/Patron-Cards.webp" alt="Patron cards"
            :class="['w-full object-cover transition-transform duration-300 group-hover:scale-105', imageClass]" />
        <NuxtImg :src="imagenUrl" :alt="producto.nombre"
            :class="['w-full object-contain absolute top-0 left-0 transition-transform duration-300 group-hover:scale-105', imageClass]" />

        <div class="w-full flex flex-col items-center text-center text-white gap-1 lg:gap-2 p-3 lg:p-6 mt-auto">
            <p v-if="showAccion" class="text-xs lg:text-sm font-semibold uppercase">
                {{ accionTexto }}
            </p>
            <div class="flex flex-col gap-1">
                <p class="lg:text-xl font-bold uppercase leading-tight">
                    {{ producto.nombre }}
                </p>
                <p v-if="showTamanos && producto.tamanos_disponibles && producto.tamanos_disponibles.length" class="text-sm lg:text-base font-semibold">
                    {{ producto.tamanos_disponibles.join(' - ') }}
                </p>
            </div>
            <ButtonPrimary v-if="showDetalle" class="bg-white text-secondary! px-12 my-3 lg:my-4">
                Ver detalle
            </ButtonPrimary>
        </div>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    producto: { type: Object, required: true },
    imagenUrl: { type: String, required: true },
    showAccion: { type: Boolean, default: true },
    showTamanos: { type: Boolean, default: false },
    showDetalle: { type: Boolean, default: false },
    heightClass: { type: String, default: 'h-62 md:h-70 lg:h-90' },
    imageClass: { type: String, default: 'h-48 lg:h-62' },
})

const accionTexto = computed(() =>
    getAccionProducto(props.producto.tipo_aplicacion?.id)
)
</script>
