<template>
    <DefaultSection class="bg-primary" inner-class="md:flex-row-reverse gap-0">
        <picture class="w-full md:w-1/2 h-full lg:min-h-125">
            <source v-if="imagenes?.grande" media="(min-width: 1080px)" :srcset="imagenes.grande" />
            <source v-if="imagenes?.mediana" media="(min-width: 600px)" :srcset="imagenes.mediana" />
            <img :src="imagenes?.chica || '/images/home/Hero-Murallon.webp'" alt="Hero Murallon"
                class="w-full h-full object-cover" />
        </picture>
        <div
            class="w-full md:w-1/2 flex flex-col md:justify-center items-center md:items-start gap-3 md:gap-4 lg:gap-6 bg-primary text-center md:text-start text-white py-6 px-4 md:px-8 lg:px-16 xxl:px-0">
            <HeadingH1 class="max-w-60 lg:max-w-full uppercase">Todo para renovar tus espacios</HeadingH1>
            <p class="lg:text-xl font-medium">Soluciones para preparar, proteger y embellecer tu hogar.</p>
            <ButtonTerciary :to="ROUTE_NAMES.PRODUCTOS">Encontrá la solución</ButtonTerciary>
        </div>
    </DefaultSection>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';

const { fetchImagenPorNombre } = useImagenesDestacadas()
const imagenes = ref(null)

onMounted(async () => {
    imagenes.value = await fetchImagenPorNombre('Imagen Hero Home')
})
</script>
