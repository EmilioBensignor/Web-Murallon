<template>
    <NuxtLayout>
        <main
            class="flex flex-col gap-6 md:gap-8 lg:gap-12 xxl:gap-16 bg-linear-to-b from-secondary/30 from-0% to-transparent to-66% py-6 md:py-8 lg:py-12 xxl:py-16">
            <DefaultSection class="px-4 md:px-8 lg:px-16" inner-class="items-center gap-3 md:gap-4 lg:gap-6 text-center">
                <HeadingH1 class="text-primary uppercase">
                    Lo sentimos,<br class="md:hidden" /> no encontramos<br /> la página que buscas
                </HeadingH1>
                <p class="max-w-90 lg:max-w-150 xxl:max-w-full lg:text-[1.75rem] text-dark font-medium">
                    Te invitamos a explorar nuestras soluciones para renovar tus espacios o productos similares
                </p>
            </DefaultSection>

            <DefaultSection class="px-4 md:px-8 lg:px-16">
                <div class="w-full flex flex-col sm:flex-row sm:justify-center sm:flex-wrap gap-2 lg:gap-4">
                    <NuxtLink v-for="card in soluciones" :key="card.titulo" :to="card.to"
                        class="sm:w-57.5 lg:w-76 xxl:w-106 h-40 md:h-35 lg:h-50 xxl:h-60 relative rounded-3xl overflow-hidden group">
                        <NuxtImg :src="card.imagen" :alt="card.titulo" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-dark/40 group-hover:bg-dark/50 transition-colors" />
                        <div class="flex items-center justify-center absolute inset-0">
                            <p class="max-w-40 lg:max-w-50 text-center text-white lg:text-[1.75rem] xxl:text-2xl font-bold uppercase">
                                {{ card.titulo }}
                            </p>
                        </div>
                    </NuxtLink>
                </div>
            </DefaultSection>
        </main>
    </NuxtLayout>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES'

defineProps({
    error: { type: Object, default: () => ({}) },
})

const soluciones = [
    {
        titulo: 'Prepará la superficie',
        imagen: '/images/home/soluciones/murallon_soluciones_preparar_1376.webp',
        to: { path: ROUTE_NAMES.PRODUCTOS, query: { solucion: 'prepara' } },
    },
    {
        titulo: 'Renová tus espacios',
        imagen: '/images/home/soluciones/murallon_soluciones_renovar_1376.webp',
        to: { path: ROUTE_NAMES.PRODUCTOS, query: { solucion: 'renova' } },
    },
    {
        titulo: 'Protegé de la humedad',
        imagen: '/images/home/soluciones/murallon_soluciones_proteger_1376.webp',
        to: { path: ROUTE_NAMES.PRODUCTOS, query: { solucion: 'protege' } },
    },
]

useSeoMeta({
    title: 'Página no encontrada',
    description: 'No encontramos la página que buscás. Explorá nuestras soluciones.',
})
</script>
