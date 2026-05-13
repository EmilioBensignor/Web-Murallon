<template>
    <DefaultSection v-if="posts.length" class="px-4 md:px-8 lg:px-16" inner-class="gap-4 md:gap-6 lg:gap-8">
        <HeadingH2 class="text-center text-primary uppercase">Últimas notas</HeadingH2>

        <div class="w-full hidden lg:grid lg:grid-cols-3 gap-4 lg:gap-6">
            <BlogCard v-for="post in posts" :key="post.id" :post="post"
                :imagen-url="getImageUrl(post.imagen_principal)" />
        </div>

        <div class="w-full lg:hidden">
            <CarouselStatic :slides-per-view="{ base: 1.1, sm: 1.4, tab: 1.6, md: 2 }" :gap="16"
                :show-dots="true" :show-arrows="false">
                <BlogCard v-for="post in posts" :key="post.id" :post="post"
                    :imagen-url="getImageUrl(post.imagen_principal)" />
            </CarouselStatic>
        </div>
    </DefaultSection>
</template>

<script setup>
defineProps({
    posts: { type: Array, required: true },
    getImageUrl: { type: Function, required: true },
})
</script>
