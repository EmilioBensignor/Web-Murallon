<template>
    <DefaultSection class="md:px-8 lg:px-16">
        <div class="md:w-full md:flex md:justify-between md:items-center">
            <HeadingH2 class="text-primary">PRODUCTOS DESTACADOS</HeadingH2>
            <CarouselArrows @prev="carouselRef?.scrollLeft()" @next="carouselRef?.scrollRight()" />
        </div>

        <CarouselStatic v-if="productos.length" ref="carouselRef"
            :slides-per-view="{ base: 1.4, sm: 2.4, tab: 2.8, md: 3.5, lg: 3.8, xl: 5, xxl: 5 }" :gap="16"
            :show-dots="{ base: true, lg: false }" :show-arrows="false">
            <ProductCard v-for="producto in productos" :key="producto.id" :producto="producto"
                :imagen-url="getImageUrl(producto.imagen_principal)" />
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
const carouselRef = ref(null)
const { productos, fetchDestacados, getImageUrl } = useProductos()

onMounted(() => {
    fetchDestacados()
})
</script>
