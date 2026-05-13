<template>
    <DefaultSection v-if="posts.length" class="bg-primary py-6 md:p-8 lg:p-16">
        <div class="md:w-full md:flex md:justify-between md:items-center">
            <div class="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                <HeadingH2 class="text-white uppercase">Nuestro Blog</HeadingH2>
                <NuxtLink :to="ROUTE_NAMES.BLOG" class="text-terciary font-semibold underline">
                    Ver todos los artículos
                </NuxtLink>
            </div>
            <CarouselArrows @prev="carouselRef?.scrollLeft()" @next="carouselRef?.scrollRight()" />
        </div>

        <CarouselStatic ref="carouselRef"
            :slides-per-view="{ base: 1.2, sm: 1.6, tab: 1.8, md: 1.6, lg: 1.8, xl: 2.3, xxl: 2.4 }" :gap="16"
            :show-dots="{ base: true, lg: false }" :show-arrows="false">
            <BlogCardHome v-for="post in posts" :key="post.id" :post="post"
                :imagen-url="getImageUrl(post.imagen_principal)" />
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'

const carouselRef = ref(null)
const { posts, fetchPosts, getImageUrl } = useBlog()

onMounted(() => {
    fetchPosts()
})
</script>
