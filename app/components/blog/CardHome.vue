<template>
    <div class="h-76 md:h-92 lg:h-104 flex flex-col rounded-3xl overflow-hidden">
        <NuxtImg :src="imagenUrl" :alt="post.titulo" class="w-full h-25 md:h-32 lg:h-44 object-cover shrink-0" />

        <div class="flex flex-col items-start gap-3 md:gap-4 flex-1 bg-white p-4 md:p-5 md:pb-6">
            <div class="flex flex-col gap-1.5 md:gap-2">
                <p class="text-xs lg:text-sm font-bold">{{ fechaFormateada }}</p>
                <h3 class="text-sm md:text-base font-bold uppercase line-clamp-2">{{ post.titulo }}</h3>
            </div>
            <p class="text-xs lg:text-sm font-medium line-clamp-2">{{ extracto }}</p>

            <ButtonPrimary :to="`/blog/${post.slug}`" class="mt-auto px-10">
                Leer más
            </ButtonPrimary>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    post: { type: Object, required: true },
    imagenUrl: { type: String, required: true },
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
