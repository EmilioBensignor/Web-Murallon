<template>
    <DefaultSection v-if="productos.length" class="md:px-8 lg:px-16">
        <div class="md:w-full md:flex md:justify-between md:items-center px-4 md:px-0">
            <HeadingH2 class="text-center text-secondary uppercase">Recomendados en base a esta nota</HeadingH2>
            <CarouselArrows @prev="carouselRef?.scrollLeft()" @next="carouselRef?.scrollRight()" />
        </div>

        <CarouselStatic ref="carouselRef"
            :slides-per-view="{ base: 1.4, sm: 2.4, tab: 2.8, md: 3.5, lg: 3.8, xl: 5, xxl: 5 }" :gap="16"
            :show-dots="{ base: true, lg: false }" :show-arrows="false">
            <ProductCard v-for="producto in productos" :key="producto.id" :producto="producto"
                :imagen-url="getProductoImageUrl(producto.imagen_principal)" />
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
defineProps({
    productos: { type: Array, default: () => [] },
    getProductoImageUrl: { type: Function, required: true },
})

const carouselRef = ref(null)
</script>
