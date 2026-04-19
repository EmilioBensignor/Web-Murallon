<template>
    <DefaultMain>
        <div v-if="loading" class="flex justify-center py-24">
            <Icon name="material-symbols:progress-activity" class="w-8 h-8 text-primary animate-spin" />
        </div>

        <template v-else-if="producto">
            <ProductHero :producto="producto" :get-image-url="getImageUrl" />
            <ProductSobre :producto="producto" />
            <ProductBlog />
        </template>

        <div v-else-if="error" class="flex flex-col items-center gap-4 py-24 px-4 text-center">
            <p class="text-xl text-secondary font-bold">Producto no encontrado</p>
            <ButtonPrimary :to="ROUTE_NAMES.PRODUCTOS">Ver todos los productos</ButtonPrimary>
        </div>
    </DefaultMain>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'

const route = useRoute()
const { producto, loading, error, fetchProductoBySlug, getImageUrl } = useProducto()

onMounted(() => {
    fetchProductoBySlug(route.params.nombre)
})
</script>
