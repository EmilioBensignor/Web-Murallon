<template>
    <DefaultMain>
        <BlogHeroListado />

        <div v-if="loading" class="flex justify-center py-12">
            <Icon name="material-symbols:progress-activity" class="w-8 h-8 text-primary animate-spin" />
        </div>

        <template v-else-if="posts.length">
            <BlogUltimas :posts="ultimas" :get-image-url="getImageUrl" />
            <BlogTodas v-if="resto.length" :posts="resto" :get-image-url="getImageUrl" />
        </template>

        <DefaultSection v-else class="px-4 md:px-8 lg:px-16" inner-class="items-center gap-3 md:gap-4 py-12 md:py-16 lg:py-24 text-center">
            <Icon name="material-symbols:edit-note-rounded" size="64" class="text-primary" />
            <HeadingH2 class="text-primary uppercase">Próximamente nuevas notas</HeadingH2>
            <p class="max-w-xl lg:text-lg text-dark font-medium">
                Estamos preparando contenido para vos. Volvé pronto para descubrir novedades, consejos y guías de Murallón.
            </p>
        </DefaultSection>
    </DefaultMain>
</template>

<script setup>
const { posts, loading, fetchPosts, getImageUrl } = useBlog()

const ultimas = computed(() => posts.value.slice(0, 3))
const resto = computed(() => posts.value.slice(3))

onMounted(() => {
    fetchPosts()
})

useSeoMeta({
    title: 'Blog',
    description: 'Notas, consejos y novedades de Murallón sobre pintura, revestimientos y soluciones para tu hogar.',
})
</script>
