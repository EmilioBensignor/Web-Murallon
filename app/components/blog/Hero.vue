<template>
    <DefaultSection innerClass="!max-w-full md:relative d:rounded-3xl md:overflow-hidden">
        <div
            class="w-full h-52 sm:h-80 md:h-90 lg:h-125 xxl:h-128 relative overflow-hidden md:rounded-none rounded-b-none">
            <NuxtImg v-if="imagenUrl" :src="imagenUrl" :alt="blog.titulo" class="w-full h-full object-cover" />
            <div class="hidden md:block absolute inset-0 bg-linear-to-t from-secondary to-transparent" />
        </div>
        <div
            class="w-full xxl:max-w-326 flex flex-col items-center md:items-start gap-3 md:gap-4 bg-primary md:bg-transparent md:absolute md:inset-x-0 md:bottom-0 text-center md:text-left py-6 px-4 md:px-8 md:py-12 lg:px-16 xxl:px-0 xxl:mx-auto">
            <span v-if="categoriaFinal"
                class="h-9 flex justify-center items-center bg-terciary rounded-full text-sm lg:text-base text-primary font-bold uppercase py-2 px-4">
                {{ categoriaFinal }}
            </span>
            <HeadingH1 class="text-white uppercase">
                {{ blog.titulo }}
            </HeadingH1>
            <p v-if="blog.subtitulo || extracto" class="lg:text-lg text-white font-medium">
                {{ blog.subtitulo || extracto }}
            </p>
        </div>
    </DefaultSection>
</template>

<script setup>
const props = defineProps({
    blog: { type: Object, required: true },
    imagenUrl: { type: String, default: '' },
    categoria: { type: String, default: '' },
})

const categoriaFinal = computed(() => props.categoria || props.blog.categoria || props.blog.tag || '')

const extracto = computed(() => {
    const texto = props.blog.contenido?.replace(/<[^>]*>/g, '') || ''
    if (texto.length <= 140) return texto
    return texto.slice(0, 140).trim() + '…'
})
</script>
