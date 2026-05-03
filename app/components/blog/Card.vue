<template>
    <div class="h-86 md:h-90 lg:h-114 flex flex-col rounded-3xl overflow-hidden">
        <NuxtImg :src="imagenUrl" :alt="post.titulo" class="w-full h-25 md:h-32 lg:h-50 object-cover" />

        <div class="flex flex-col items-center md:items-start justify-between md:gap-4 flex-1 bg-white p-4 md:p-6">
            <div class="flex flex-col gap-3 md:gap-4">
                <div class="flex flex-col gap-2">
                    <p class="text-xs lg:text-sm font-bold">{{ fechaFormateada }}</p>
                    <h3 class="text-sm md:text-base lg:text-xl font-bold uppercase">{{ post.titulo }}</h3>
                </div>
                <p class="text-xs lg:text-sm font-medium line-clamp-3">{{ extracto }}</p>
            </div>

            <div class="mt-auto">
                <ButtonPrimary :to="`/blog/${post.slug}`" class="px-12">
                    Leer más
                </ButtonPrimary>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    post: {
        type: Object,
        required: true
    },
    imagenUrl: {
        type: String,
        required: true
    }
})

const fechaFormateada = computed(() => {
    const date = new Date(props.post.fecha)
    const dia = date.getDate()
    const mes = date.toLocaleDateString('es-AR', { month: 'long' })
    const mesCapitalizado = mes.charAt(0).toUpperCase() + mes.slice(1)
    const anio = date.getFullYear()
    return `${dia} ${mesCapitalizado} ${anio}`
})

const extracto = computed(() => {
    return props.post.contenido?.replace(/<[^>]*>/g, '') || ''
})
</script>
