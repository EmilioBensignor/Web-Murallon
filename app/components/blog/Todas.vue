<template>
    <DefaultSection v-if="posts.length" class="px-4 md:px-8 lg:px-16" inner-class="gap-4 md:gap-6 lg:gap-8">
        <HeadingH2 class="text-center text-primary uppercase">Todas las notas</HeadingH2>

        <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <BlogCard v-for="post in postsVisibles" :key="post.id" :post="post"
                :imagen-url="getImageUrl(post.imagen_principal)" />
        </div>

        <ButtonPrimary v-if="hayMas" @click="cargarMas">
            Cargar más notas
        </ButtonPrimary>
    </DefaultSection>
</template>

<script setup>
const props = defineProps({
    posts: { type: Array, required: true },
    getImageUrl: { type: Function, required: true },
    pageSize: { type: Number, default: 6 },
})

const visibles = ref(props.pageSize)

const postsVisibles = computed(() => props.posts.slice(0, visibles.value))
const hayMas = computed(() => visibles.value < props.posts.length)

const cargarMas = () => {
    visibles.value = props.posts.length
}

watch(
    () => props.posts.length,
    () => {
        visibles.value = props.pageSize
    }
)
</script>
