<template>
    <DefaultSection class="bg-primary py-6 md:p-8 lg:p-16">
        <div class="md:w-full md:flex md:justify-between md:items-center">
            <div class="flex flex-col md:flex-row items-center md:gap-2">
                <HeadingH2 class="text-white uppercase">Nuestro Blog</HeadingH2>
                <!-- <ButtonTerciary to="#" class="bg-transparent text-terciary underline">
                    Ver todos los artículos
                </ButtonTerciary> -->
            </div>
            <CarouselArrows @prev="carouselRef?.scrollLeft()" @next="carouselRef?.scrollRight()" />
        </div>

        <CarouselStatic v-if="posts.length" ref="carouselRef"
            :slides-per-view="{ base: 1.4, sm: 1.6, tab: 1.8, md: 1.8, lg: 1.8, xl: 2.2, xxl: 2.4 }" :gap="16"
            :show-dots="{ base: true, lg: false }" :show-arrows="{ base: false, lg: true }">
            <BlogCard v-for="post in posts" :key="post.id" :post="post"
                :imagen-url="getImageUrl(post.imagen_principal)" />
        </CarouselStatic>
    </DefaultSection>
</template>

<script setup>
const carouselRef = ref(null)
const { posts, fetchPosts, getImageUrl } = useBlog()

onMounted(() => {
    fetchPosts()
})
</script>
