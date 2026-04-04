<template>
    <DefaultSection class="md:px-8 lg:px-16">
        <div class="md:w-full md:flex md:justify-between md:items-center">
            <HeadingH2 class="text-primary uppercase">Inspiración de proyectos</HeadingH2>
            <CarouselArrows @prev="carouselRef?.scrollLeft()" @next="carouselRef?.scrollRight()" />
        </div>

        <CarouselStatic v-if="inspiraciones.length"
            :slides-per-view="{ base: 1.4, sm: 1.8, tab: 2.4, md: 2.4, lg: 2.4, xl: 3.5, xxl: 3.5 }" :gap="16"
            :show-dots="{ base: true, lg: false }" :show-arrows="{ base: false, lg: true }">
            <InspiracionCard v-for="item in inspiraciones" :key="item.id" :inspiracion="item"
                :imagen-antes-url="getImageUrl(item.imagen_antes)"
                :imagen-despues-url="getImageUrl(item.imagen_despues)" />
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
const { inspiraciones, fetchInspiraciones, getImageUrl } = useInspiracion()

onMounted(() => {
    fetchInspiraciones()
})
</script>
