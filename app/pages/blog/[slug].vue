<template>
    <DefaultMain>
        <div v-if="loading" class="flex justify-center py-24">
            <Icon name="material-symbols:progress-activity" class="w-8 h-8 text-primary animate-spin" />
        </div>

        <template v-else-if="blog">
            <BlogHero :blog="blog" :imagen-url="getBlogImageUrl(blog.imagen_principal)" />
            <BlogContenido :blog="blog" />
            <BlogRecomendados :productos="productosRecomendados" :get-producto-image-url="getProductoImageUrl" />
        </template>

        <div v-else-if="error" class="flex flex-col items-center gap-4 py-24 px-4 text-center">
            <p class="text-xl text-secondary font-bold">Artículo no encontrado</p>
            <ButtonPrimary :to="ROUTE_NAMES.HOME">Volver al inicio</ButtonPrimary>
        </div>
        <HomeBlog />
    </DefaultMain>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'

const route = useRoute()
const {
    blog,
    productosRecomendados,
    loading,
    error,
    fetchBlogConProductos,
    getBlogImageUrl,
    getProductoImageUrl,
} = useMurallonBlog()

onMounted(() => {
    fetchBlogConProductos(route.params.slug)
})

watchEffect(() => {
    if (blog.value) {
        useSeoMeta({
            title: blog.value.titulo,
            description:
                blog.value.subtitulo ||
                blog.value.contenido?.replace(/<[^>]*>/g, '').slice(0, 160),
            ogTitle: blog.value.titulo,
            ogImage: blog.value.imagen_principal
                ? getBlogImageUrl(blog.value.imagen_principal)
                : undefined,
        })
    }
})
</script>
