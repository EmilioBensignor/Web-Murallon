<template>
    <DefaultSection class="px-4 md:px-8 lg:px-16">
        <p class="md:w-full text-secondary text-sm lg:text-xl font-bold uppercase">
            {{ fechaFormateada }}<span v-if="autor"> — Por {{ autor }}</span>
        </p>

        <div class="blog-contenido flex flex-col gap-4 lg:gap-6 xxl:gap-8 text-dark text-sm lg:text-xl font-medium" v-html="blog.contenido" />
    </DefaultSection>
</template>

<script setup>
const props = defineProps({
    blog: { type: Object, required: true },
})

const autor = computed(() => props.blog.autor || '')

const fechaFormateada = computed(() => {
    if (!props.blog.fecha) return ''
    const date = new Date(props.blog.fecha)
    const dia = date.getDate()
    const mes = date.toLocaleDateString('es-AR', { month: 'long' })
    const anio = date.getFullYear()
    return `${dia} de ${mes} ${anio}`
})
</script>

<style scoped>
.blog-contenido :deep(p) {
    margin-bottom: 1rem;
}

.blog-contenido :deep(h2),
.blog-contenido :deep(h3) {
    color: var(--color-secondary);
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    line-height: 1.2;
}

.blog-contenido :deep(h2) {
    font-size: 1.125rem;
}

.blog-contenido :deep(h3) {
    font-size: 1rem;
}

.blog-contenido :deep(strong) {
    font-weight: 700;
}

.blog-contenido :deep(em) {
    font-style: italic;
}

.blog-contenido :deep(a) {
    color: var(--color-primary);
    text-decoration: underline;
}

.blog-contenido :deep(ul),
.blog-contenido :deep(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
}

.blog-contenido :deep(ul) {
    list-style: disc;
}

.blog-contenido :deep(ol) {
    list-style: decimal;
}

.blog-contenido :deep(li) {
    margin-bottom: 0.5rem;
}

.blog-contenido :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
    margin: 1.5rem 0;
}

.blog-contenido :deep(blockquote) {
    border-left: 4px solid var(--color-primary);
    padding-left: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
    color: var(--color-secondary);
}

@media (min-width: 1080px) {
    .blog-contenido :deep(h2) {
        font-size: 1.75rem;
    }

    .blog-contenido :deep(h3) {
        font-size: 1.5rem;
    }
}
</style>
